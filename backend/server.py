
# ============ IMPORTS ============
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from dotenv import load_dotenv

# ============ APP SETUP ============
load_dotenv()

app = FastAPI(
    title="NEVO API", 
    version="1.0.1",
    description="API for a futuristic clothing store"
)

# ============ CORS MIDDLEWARE ============
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

# ============ DATABASE CONNECTION ============
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.getenv("MONGODB_URL"))
    app.mongodb = app.mongodb_client[os.getenv("DB_NAME", "nevo")]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# ============ PYDANTIC MODELS ============
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, field):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

class Product(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)
    name: str
    description: str
    price: float
    originalPrice: Optional[float] = None
    discount: Optional[int] = None
    images: List[str]
    category: str
    sizes: List[str]
    stock: int = 0
    material: Optional[str] = "Premium Quality"
    limited_edition: bool = False

    class Config:
        json_encoders = {
            ObjectId: str
        }

class CartItem(BaseModel):
    product_id: str
    quantity: int = 1
    size: str

class ShippingAddress(BaseModel):
    firstName: str
    lastName: str
    address: str
    city: str
    state: str
    zipCode: str
    country: str

class OrderCreate(BaseModel):
    items: List[CartItem]
    customer_email: EmailStr
    shipping_address: ShippingAddress
    origin_url: Optional[str] = "https://nevo.store"

class OrderResponse(BaseModel):
    success: bool
    message: str
    order_id: Optional[str] = None

# ============ API ENDPOINTS ============

@app.get("/")
def read_root():
    return {"status": "NEVO API is running 🔥", "version": app.version}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/products", response_model=List[Product])
async def list_products(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category.upper()
    
    products = await app.mongodb.products.find(query).to_list(100)
    return products

@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID format")

    product = await app.mongodb.products.find_one({"_id": ObjectId(product_id)})
    if product is None:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
    return product

@app.post("/api/orders", response_model=OrderResponse)
async def create_order(order: OrderCreate):
    # This is a simplified example. In a real app, you would:
    # 1. Validate product IDs and stock levels.
    # 2. Calculate total price on the backend.
    # 3. Process payment with a payment gateway (e.g., Stripe, PayPal).
    # 4. Create an order record in the database.
    # 5. Send a confirmation email to the customer.
    
    print(f"Received order from {order.customer_email}")

    # For now, just simulate success
    return OrderResponse(
        success=True,
        message="Order placed successfully! (Demo Mode)",
        order_id=f"NEVO-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )

# ============ DATABASE SEEDING ============
async def seed_database():
    print("Checking if database needs seeding...")
    count = await app.mongodb.products.count_documents({})
    if count == 0:
        print("Database is empty. Seeding with initial products...")
        PRODUCTS_TO_SEED = [
            {
                "name": "Cybernilism Hoodie",
                "description": "Premium heavyweight hoodie with cyberpunk aesthetics.",
                "price": 2499,
                "originalPrice": 3999,
                "images": [
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
                    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800",
                ],
                "category": "APPAREL",
                "sizes": ["S", "M", "L", "XL"],
                "stock": 50,
                "discount": 38
            },
            {
                "name": "Tech Shell Jacket",
                "description": "Technical shell jacket with waterproof membrane.",
                "price": 4999,
                "originalPrice": 7999,
                "images": [
                    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
                ],
                "category": "OUTERWEAR",
                "sizes": ["M", "L", "XL"],
                "stock": 20,
                "discount": 38
            },
            {
                "name": "Utility Cargo Pant",
                "description": "Multi-pocket cargo pants with adjustable cuffs.",
                "price": 3499,
                "originalPrice": 5499,
                "images": [
                    "https://images.unsplash.com/photo-1624378439575-d8705ad7d960?q=80&w=800",
                    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800",
                ],
                "category": "APPAREL",
                "sizes": ["28", "30", "32", "34"],
                "stock": 35,
                "discount": 36
            },
            {
                "name": "System Cap",
                "description": "Minimalist cap with embroidered logo.",
                "price": 1299,
                "originalPrice": 1999,
                "images": [
                    "https://images.unsplash.com/photo-1588850567047-147953b47759?q=80&w=800",
                    "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800",
                ],
                "category": "ACCESSORIES",
                "sizes": ["FREE"],
                "stock": 50,
                "discount": 35
            },
        ]
        await app.mongodb.products.insert_many(PRODUCTS_TO_SEED)
        print(f"Seeded {len(PRODUCTS_TO_SEED)} products.")
    else:
        print("Database already contains products. Skipping seed.")

@app.on_event("startup")
async def on_startup():
    await seed_database()

# ============ MAIN ============
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
