from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_base_interface import DataBaseInterface, PRODUCTS, PRODUCT_TYPES
from typing import Optional
from pydantic import BaseModel

app = FastAPI()
db = DataBaseInterface()

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"]
)


class ProductType(BaseModel):
    type: str
    category: str
    measure: str

class Product(BaseModel):
    type_id: int
    name: Optional[str]
    amount: int
    exp_date: Optional[str]
    note: Optional[str]

@app.post("/xxx")
def add_new_product_type(product_type: ProductType):
    product_type_dict = product_type.dict()
    return db.add_new_product_type(product_type_dict)

@app.post("/xxx")
def add_new_product(product: Product):
    product_dict = product.dict()
    return db.add_new_product(product_dict)

@app.get("/api")
def read_id():
    return db.fetch_all_product_types_with_products()


@app.get("/")
def read_root():
    return {"message": "Welcome to your todo list."}




@app.post("/kot/main")
def create_main():
    return {
        "status": "OK"
    }


A = ProductType(type="masło", category='Jedzenie', measure='szt')
add_new_product_type(A)

AA = ProductType(type="mydło", category='kosmetyki', measure='szt')
add_new_product_type(AA)

B = Product(type_id=1, amount=6)
add_new_product(B)

BB = Product(type_id=2, amount=2)
add_new_product(BB)

BBB = Product(type_id=2, amount=6, note='na ciasteczka')
add_new_product(BBB)
read_id()
