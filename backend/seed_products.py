import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_products():
    mongo_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    
    try:
        client = AsyncIOMotorClient(mongo_url)
        db = client.nevo_db
        collection = db.products

        await collection.delete_many({})

        products = [
            {
                "id": "nevo-cyber-tee-001",
                "name": "NEVO CYBER TEE",
                "description": "Industrial grade cotton. Oversized fit. Premium heavyweight fabric.",
                "price": 45.00,
                "images": ["https://pub-8408.ready.jp/nevo/tee1.jpg"],
                "category": "APPAREL",
                "sizes": ["S", "M", "L", "XL", "XXL"],
                "stock": 50,
                "material": "100% Premium Cotton",
                "limited_edition": False
            },
            {
                "id": "nevo-shell-jacket-002",
                "name": "TECH SHELL JACKET",
                "description": "Waterproof technical outerwear. Minimalist design. All-weather protection.",
                "price": 120.00,
                "images": ["https://pub-8408.ready.jp/nevo/jacket1.jpg"],
                "category": "OUTERWEAR",
                "sizes": ["M", "L", "XL"],
                "stock": 20,
                "material": "Technical Nylon Blend",
                "limited_edition": True
            },
            {
                "id": "nevo-cargo-pant-003",
                "name": "UTILITY CARGO PANT",
                "description": "Multi-pocket design. Tapered fit. Durable ripstop fabric.",
                "price": 75.00,
                "images": ["https://pub-8408.ready.jp/nevo/pant1.jpg"],
                "category": "APPAREL",
                "sizes": ["28", "30", "32", "34", "36"],
                "stock": 35,
                "material": "Ripstop Cotton-Poly",
                "limited_edition": False
            }
        ]

        await collection.insert_many(products)
        print("✅ NEVO Database Seeded Successfully! 🚀")
        print(f"   → Added {len(products)} luxury products")
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(seed_products())