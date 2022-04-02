import pytest
from server.data_base_interface import DataBaseInterface
from server.data_base_interface import PRODUCT_TYPES, PRODUCTS
import sqlite3 as sl
import MySQLdb

def pytest_configure():
    pytest.TEST_ITEM_1 = {'product_type': {'name': 'Pasta do zębów', 'category': 'Środki czystości', 'measure': 'szt'},
                          'products':
                              [{'amount': 3, 'exp_date': '', 'note': ''},
                               {'amount': 1, 'exp_date': '', 'note': ''},
                               {'amount': 5, 'exp_date': '', 'note': 'w pudełku pod łóżkiem'}]}
    pytest.TEST_ITEM_2 = {'product_type': {'name': 'Pasta do zębów', 'category': 'Środki czystości', 'measure': 'szt'},
                          'products':
                              [{'amount': 1, 'exp_date': '10.02.2023', 'note': ''},
                               {'amount': 6, 'exp_date': '22.12.2028', 'note': ''},
                               {'amount': 5, 'exp_date': '05.05.2022', 'note': 'w pudełku pod łóżkiem'}]}



@pytest.fixture
def db_interface():
    db = MockedDataBase()
    yield db


class MockedDataBase(DataBaseInterface):
    def __init__(self):
        super().__init__()
        try:
            self.create_initial_tables()
        except MySQLdb._exceptions.OperationalError as e:
            pass

    # def __del__(self):
    #     try:
    #         self.cursor.execute(f"DROP TABLE {PRODUCT_TYPES}")
    #         self.cursor.execute(f"DROP TABLE {PRODUCTS}")
    #         self.db_interface.commit()
    #     except MySQLdb._exceptions.OperationalError as e:
    #         pass

    def __del__(self):
        try:
            self.cursor.execute(f"TRUNCATE TABLE {PRODUCT_TYPES}")
            self.cursor.execute(f"TRUNCATE TABLE {PRODUCTS}")
            self.db_interface.commit()
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
        self.cursor.execute(f"CREATE TABLE {PRODUCT_TYPES} "
                            f"(type_id INTEGER PRIMARY KEY AUTO_INCREMENT, name text, category text, measure text)")
        self.cursor.execute(f"CREATE TABLE {PRODUCTS} "
                            f"(product_id INTEGER PRIMARY KEY AUTO_INCREMENT, type_id integer, name text, amount integer,"
                            f"exp_date text, note text)")


    def add_initial_items(self):
        new_items = [pytest.TEST_ITEM_1, pytest.TEST_ITEM_2]
        for item in new_items:
            self.add_new_record(**item)

