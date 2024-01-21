from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_base_interface import DataBaseInterface, PRODUCT, CATEGORY
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
    name: str
    category: str
    measure: str


class Product(BaseModel):
    category: int
    name: str ##Optional[str]
    amount: int
    expiry_date: str ##Optional[str]
    note: str ##Optional[str]


@app.post("/addCategory")
def add_category(product_type: ProductType):
    product_type_dict = product_type.dict()
    return db.add_category(product_type_dict)


@app.post("/addProduct")
def add_product(product: Product):
    product_dict = product.dict()
    return db.add_product(product_dict)

@app.delete("/removeProduct/")
def remove_product(product_id: int):
    return db.remove_product(product_id)

@app.delete("/removeCategory")
def remove_category(category_id: int):
    return db.remove_category(category_id)


@app.post("/editProduct")
def edit_product(product: Product):
    product_dict = product.dict()
    return db.edit_product(product_dict)


@app.post("/editCategory")
def edit_category(product_type: ProductType):
    product_type_dict = product_type.dict()
    return db.edit_category(product_type_dict)


@app.get("/getAll")
def read_id():
    return db.fetch_all_categories_with_products()


@app.get("/")
def read_root():
    return {"message": "Welcome to your todo list."}

# add_category(ProductType(name="Masło", category='Jedzenie', measure='szt'))
# add_category(ProductType(name="Mydło w kostce", category='Kosmetyki', measure='szt'))
# add_category(ProductType(name="Mydło w płynie", category='Kosmetyki', measure='ml'))
#
# add_product(Product(category=2, amount=1, note='Lawendowe', name='Cztery Szpaki', expiry_date='10.10.2028'))
# add_product(Product(category=2, amount=2, note='Malinowe', name='Cztery Szpaki', expiry_date='10.10.2027'))
# add_product(Product(category=3, amount=3500, note='gruszkowe', name='W płynie Swonco', expiry_date='22.04.2021'))
# add_product(Product(category=1, amount=18, note='', name='', expiry_date='01.01.2025'))
# print(read_id())

# remove_product([{'id': 1}])
# remove_category([{'id':1}])