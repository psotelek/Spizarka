import pytest
from server.data_base_interface import DataBaseInterface
from server.data_base_interface import STOCKS, STOCK_ITEMS
import sqlite3 as sl

def pytest_configure():
    pytest.TEST_ITEM_1 = {'name': 'Pasta do zębów Biorepair', 'category': 'kosmetyki', 'count_type': 'szt',
                          'expiry_date': '10.02.2023', 'notes': ''}
    pytest.TEST_ITEM_2 = {'name': 'Pasta do zębów Elmex', 'category': 'kosmetyki', 'count_type': 'szt',
                          'expiry_date': '10.05.2023', 'notes': ''}

@pytest.fixture
def db_interface():
    db = MockedDataBase()
    yield db


class MockedDataBase(DataBaseInterface):
    def __init__(self):
        # self.data_base = sl.connect('my_data_base.db')
        self.db_interface = sl.connect(':memory:')
        self.cursor = self.db_interface.cursor()
        self.create_initial_table()
    #     # Create data base if doesn't exist already
    #     # try:
    #     #     self.cursor.execute(f"CREATE TABLE '{STOCKS}' "
    #     #                         f"(name text, type text, count_type text)")
    #     # except sl.OperationalError as e:
    #     #     pass  ##

    def create_initial_table(self):
        self.cursor.execute(f"CREATE TABLE '{STOCKS}' "
                            f"(name text, type text, count_type text)")
        self.cursor.execute(f"CREATE TABLE '{STOCK_ITEMS}' "
                            f"(name text, expiry_date text, notes text)")


    def add_initial_items(self):
        new_items = [pytest.TEST_ITEM_1, pytest.TEST_ITEM_2]
        for item in new_items:
            self.add_new_record(**item)

