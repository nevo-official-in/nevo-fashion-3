from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"]  # Allow all methods
)

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.getenv("MONGODB_URL"))
    app.mongodb = app.mongodb_client.get_default_database()

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

async def get_all_products():
    products = []
    # Use the aggregate method to add a "id" field to each document
    async for product in app.mongodb.products.aggregate([{"$addFields": {"id": {"$toString": "$_id"}}}]):
        products.append(product)
    return products

@app.get("/")
def root():
    return {"status": "NEVO API is running 🔥"}

@app.get("/api/health")
def health():
    return {"status": "healthy"}

@app.get("/api/products")
async def list_products():
    return await get_all_products()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
