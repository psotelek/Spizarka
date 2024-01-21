import pytest
from server.data_base_interface import DataBaseInterface
from server.data_base_interface import CATEGORY, PRODUCT
import sqlite3 as sl
import MySQLdb


def pytest_configure():
    pytest.TEST_ITEM_1 = {'category': {'name': 'Masło', 'category': 'Jedzenie', 'measure': 'szt'},
                          'products':
                              [{'amount': 3, 'expiry_date': '', 'name': '', 'note': ''},
                               {'amount': 1, 'expiry_date': '', 'name': '', 'note': ''},
                               {'amount': 5, 'expiry_date': '', 'name': '', 'note': 'większe opakowanie, 300g'}]}
    pytest.TEST_ITEM_2 = {'category': {'name': 'Pasta do zębów', 'category': 'Środki czystości', 'measure': 'szt'},
                          'products':
                              [{'amount': 1, 'expiry_date': '10.02.2023', 'name': 'Elmex', 'note': ''},
                               {'amount': 6, 'expiry_date': '22.12.2028', 'name': 'Biorepair', 'note': ''},
                               {'amount': 5, 'expiry_date': '05.05.2022', 'name': 'Shaushka',
                                'note': 'w pudełku pod łóżkiem'}]}


@pytest.fixture
def connection():
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
    #         self.connection.commit()
    #     except MySQLdb._exceptions.OperationalError as e:
    #         pass

    def __del__(self):
        try:
            self.cursor.execute(f"TRUNCATE TABLE {CATEGORY}")
            self.cursor.execute(f"TRUNCATE TABLE {PRODUCT}")
            self.connection.commit()
        except MySQLdb._exceptions.OperationalError as e:
            pass

    #     # self.connection = sl.connect('my_data_base.db')
    #     # self.connection = sl.connect(':memory:')
    #     # self.cursor = self.connection.cursor()
    #     # Create data base if doesn't exist already
    #     try:
    #         self.create_initial_tables()
    #     except sl.OperationalError as e:
    #         pass

    def create_initial_tables(self):
        self.cursor.execute(f"CREATE TABLE {CATEGORY} "
                            f"(id INTEGER PRIMARY KEY AUTO_INCREMENT, name text, category text, measure text,"
                            f" UNIQUE KEY(name(100), category(100)))")
        self.connection.commit()
        self.cursor.execute(f"CREATE TABLE {PRODUCT} "
                            f"(id INTEGER PRIMARY KEY AUTO_INCREMENT, category integer, name text, amount integer,"
                            f"expiry_date text, note text)")
        self.connection.commit()

    # def add_initial_items(self):
    #     new_items = [pytest.TEST_ITEM_1, pytest.TEST_ITEM_2]
    #     for item in new_items:
    #         self.add_new_record(**item)

