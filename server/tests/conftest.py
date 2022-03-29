import pytest
from server.data_base_interface import DataBaseInterface
from server.data_base_interface import PRODUCTS, PRODUCTS_ITEMS
import sqlite3 as sl, MySQLdb

def pytest_configure():
    pytest.TEST_ITEM_1 = {'name': 'Pasta do zębów', 'type': 'Środki czystości', 'measure': 'szt', 'amount': 1,
                          'expiry_date': '10.02.2023', 'notes': ''}
    pytest.TEST_ITEM_2 = {'name': 'Płyn do soczewek', 'type': 'Środki czystości', 'measure': 'szt', 'amount': 5,
                          'expiry_date': '', 'notes': ''}
    pytest.TEST_ITEM_3 = {'name': 'Kukurydza', 'type': 'Jedzenie', 'measure': 'szt', 'amount': 0,
                          'expiry_date': '', 'notes': ''}
    pytest.TEST_ITEM_4 = {'name': 'Mrożone truskawki', 'type': 'Jedzenie', 'measure': 'kg', 'amount': 3,
                          'expiry_date': '', 'notes': 'Zapakowane 10.06.2022'}

@pytest.fixture
def db_interface():
    db = MockedDataBase()
    yield db


class MockedDataBase(DataBaseInterface):
    def __init__(self):
        super().__init__()
        try:
            self.cursor.execute(f"DROP TABLE {PRODUCTS}")
            self.cursor.execute(f"DROP TABLE {PRODUCTS_ITEMS}")
        except MySQLdb._exceptions.OperationalError as e:
            pass

        # Create data base if doesn't exist already
        try:
            self.create_initial_tables()
        except MySQLdb._exceptions.OperationalError as e:
            pass

    #     # self.db_interface = sl.connect('my_data_base.db')
    #     # self.db_interface = sl.connect(':memory:')
    #     # self.cursor = self.db_interface.cursor()
    #     # Create data base if doesn't exist already
    #     try:
    #         self.create_initial_tables()
    #     except sl.OperationalError as e:
    #         pass

    def create_initial_tables(self):
        self.cursor.execute(f"CREATE TABLE {PRODUCTS} "
                            f"(id INTEGER PRIMARY KEY AUTO_INCREMENT, name text, type text, measure text, amount integer)")
        self.cursor.execute(f"CREATE TABLE {PRODUCTS_ITEMS} "
                            f"(id INTEGER PRIMARY KEY AUTO_INCREMENT, name text, expiry_date text, notes text)")


    def add_initial_items(self):
        new_items = [pytest.TEST_ITEM_1, pytest.TEST_ITEM_2]
        for item in new_items:
            self.add_new_record(**item)

