from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from typing import List, Optional

from models import Product, CartItem, ShippingAddress, OrderCreate, OrderResponse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGODB_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'nevo_db')]

app = FastAPI(title="NEVO API", version="1.0")
api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get('FRONTEND_URL', 'http://localhost:5173')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api_router.get("/")
async def health():
    return {"status": "🔥 NEVO API is live", "brand": "NEVO"}

@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None):
    query = {}
    if category:
        query = {"category": {"$regex": category.upper(), "$options": "i"}}
    products = await db.products.find(query, {"_id": 0}).to_list(100)
    return products

@api_router.get("/products/<product_id>", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found 😔")
    return product

@api_router.post("/cart/add")
async def add_to_cart(item: CartItem):
    return {"success": True, "message": f"Added {item.quantity}x to cart 🛒"}

@api_router.post("/checkout", response_model=OrderResponse)
async def checkout(order: OrderCreate):
    try:
        for item in order.items:
            product = await db.products.find_one({"id": item.product_id})
            if not product:
                return OrderResponse(success=False, message=f"Product {item.product_id} not found")
            if product["stock"] < item.quantity:
                return OrderResponse(success=False, message=f"Only {product['stock']} left in stock")

        for item in order.items:
            await db.products.update_one(
                {"id": item.product_id},
                {"$inc": {"stock": -item.quantity}}
            )

        order_doc = {
            "items": [item.dict() for item in order.items],
            "customer_email": order.customer_email,
            "shipping_address": order.shipping_address.dict(),
            "created_at": "2026-02-26"
        }
        result = await db.orders.insert_one(order_doc)

        return OrderResponse(success=True, message="Order placed successfully! 🎉", order_id=str(result.inserted_id))
        
    except Exception as e:
        return OrderResponse(success=False, message=f"Checkout failed: {str(e)}")

app.include_router(api_router)