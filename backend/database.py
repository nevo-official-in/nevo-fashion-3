from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.nevo_db

# Collections define kar dete hain
products_collection = db.get_collection("products")
orders_collection = db.get_collection("orders")