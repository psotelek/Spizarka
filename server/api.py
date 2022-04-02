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
    name: str
    category: str
    measure: str


class Product(BaseModel):
    type: int
    name: str ##Optional[str]
    amount: int
    expiry_date: str ##Optional[str]
    note: str ##Optional[str]


@app.post("/addType")
def add_new_product_type(product_type: ProductType):
    product_type_dict = product_type.dict()
    return db.add_new_product_type(product_type_dict)


@app.post("/addProduct")
def add_new_product(product: Product):
    product_dict = product.dict()
    return db.add_new_product(product_dict)


@app.get("/getAll")
def read_id():
    return db.fetch_all_product_types_with_products()


@app.get("/")
def read_root():
    return {"message": "Welcome to your todo list."}


# A = ProductType(name="masło", category='Jedzenie', measure='szt')
# add_new_product_type(A)
#
# AA = ProductType(name="mydło", category='kosmetyki', measure='szt')
# add_new_product_type(AA)
#
# B = Product(type=2, amount=6, note='nie do jedzenia', name='', expiry_date='', )
# add_new_product(B)
#
# BB = Product(type=1, amount=2, note='83%!!!!!!!!!', name='', expiry_date='22.04.2021')
# add_new_product(BB)
#
# BBB = Product(type=1, amount=6, note='na ciasteczka', expiry_date='', name='')
# add_new_product(BBB)
# print(read_id())
