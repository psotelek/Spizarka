from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_base_interface import DataBaseInterface, STOCK_ITEMS, STOCKS

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

@app.get("/")
def read_root():
    return {"message": "Welcome to your todo list."}

@app.get("/api")
def read_id():
    return db.fetch_all_records_from_table(STOCKS)


@app.post("/kot/main")
def create_main():
    return {
        "status": "OK"
    }