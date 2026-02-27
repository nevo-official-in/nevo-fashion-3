from pydantic import BaseModel, EmailStr
from typing import List, Optional

# ============ PRODUCT ============
class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    images: List[str]
    category: str
    sizes: List[str]
    stock: int = 0
    in_stock: bool = True
    material: Optional[str] = "Premium Quality"
    limited_edition: bool = False

    def __init__(self, **data):
        super().__init__(**data)
        self.in_stock = self.stock > 0

# ============ CART ============
class CartItem(BaseModel):
    product_id: str
    quantity: int = 1
    size: str

# ============ SHIPPING ============
class ShippingAddress(BaseModel):
    firstName: str
    lastName: str
    address: str
    city: str
    state: str
    zipCode: str
    country: str

# ============ ORDER ============
class OrderCreate(BaseModel):
    items: List[CartItem]
    customer_email: EmailStr
    shipping_address: ShippingAddress
    origin_url: Optional[str] = "https://nevo.store"

class OrderResponse(BaseModel):
    success: bool
    message: str
    order_id: Optional[str] = None