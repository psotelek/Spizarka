import sqlite3 as sl
# import pymysql as MySQLdb
import logging
import MySQLdb
from datetime import datetime
import logging
import pprint

CATEGORY = 'CATEGORY'
PRODUCT = 'PRODUCT'

DATABASE = 'ZAPASY'
HOST = 'localhost'
PORT = 3306
USER = "Paulina"
PASSWORD = "Mysql55!"


class DataBaseInterface:
    def __init__(self):
        logging.basicConfig(format='%(asctime)s - %(levelname)s- %(message)s', datefmt='[%d-%m-%Y %H:%M:%S]',
                            filename='data_base_interface.log', level='INFO')
        self.connection = self.init_db()
        self.cursor = self.connection.cursor(MySQLdb.cursors.DictCursor)
        self.connection.autocommit(True)
        self.create_initial_tables()

    # @staticmethod
    def init_db(self):
        logging.debug(f"=" * 100)
        logging.debug(f"Logging to mySql server")
        try:
            self.connection = MySQLdb.connect(host=HOST, port=PORT, user=USER, password=PASSWORD)
        except Exception as e:
            logging.error(f"Logging failed: {e}")
        self.cursor = self.connection.cursor(MySQLdb.cursors.DictCursor)

        statement = f"CREATE DATABASE IF NOT EXISTS {DATABASE} "
        try:
            self.try_to_execute_statement(statement)
        except Exception as e:
            logging.error(f"Database {DATABASE} creation failed: {e}")
        connection = MySQLdb.connect(host=HOST, port=PORT, user=USER, password=PASSWORD, database=DATABASE, autocommit=True)
        return connection

    def create_initial_tables(self):
        statement = f"CREATE TABLE IF NOT EXISTS {CATEGORY} " \
                    f"(id INTEGER PRIMARY KEY AUTO_INCREMENT, name text, category text, measure text, " \
                    f"UNIQUE KEY(name(100), category(100)))"
        self.try_to_execute_statement(statement)

        statement = f"CREATE TABLE IF NOT EXISTS {PRODUCT} " \
                    f"(id INTEGER PRIMARY KEY AUTO_INCREMENT, category integer, name text, amount integer, " \
                    f"expiry_date text, note text)"
        self.try_to_execute_statement(statement)

    def get_cursor(self):
        try:
            self.connection.ping()
        except Exception as e:
            logging.debug(f"{e}, Try to restore connection to mySql database: '{DATABASE}'...")
            try:
                self.connection = MySQLdb.connect(host=HOST, port=PORT, user=USER, password=PASSWORD, database=DATABASE)
            except Exception as e:
                logging.error(f"Logging failed: {e}")
            self.cursor = self.connection.cursor(MySQLdb.cursors.DictCursor)

    def log_request(request, *args, **kwargs):
        def _fn(self, *args, **kwargs):
            logging.info(f"Request from GUI: {request}, {args}, {kwargs}")
            result = request(self, *args, **kwargs)
            request(self, *args, **kwargs)
            return result
        return _fn

    def check_connection_to_db(action_on_db):
        def _fn(self, *args, **kwargs):
            self.get_cursor()
            result = action_on_db(self, *args, **kwargs)
            self.connection.close()
            return result
        return _fn

    def try_to_execute_statement(self, statement):
        try:
            self.cursor.execute(statement)
            self.connection.commit()
            logging.debug(f"[PASSED] Execution of statement in DB: '{statement}'")
            return True
        except Exception as e:
            logging.error(f"[FAILED] Execution of statement in DB: '{statement}',\n {e}")

    @log_request
    def add_category(self, new_category):
        self.add_new_record_to_table(CATEGORY, new_category)
        # todo   return sth?

    @log_request
    def add_product(self, new_product):
        self.add_new_record_to_table(PRODUCT, new_product)
        # todo   return sth?

    @check_connection_to_db
    def add_new_record_to_table(self, table, record):
        attributes = ','.join([f"{k}" for k in record.keys()])
        values = ','.join([f"'{v}'" for v in record.values()])
        statement = f"INSERT INTO {table} ({attributes}) VALUES ({values})"
        self.try_to_execute_statement(statement)
        # todo   check response?

    @log_request
    @check_connection_to_db
    def remove_category(self, category_id):
        category_id = str(category_id)
        statement = f"DELETE FROM {CATEGORY} WHERE id = {category_id}"
        self.try_to_execute_statement(statement)
        statement = f"DELETE FROM {PRODUCT} WHERE category = {category_id}"
        self.try_to_execute_statement(statement)

    @log_request
    @check_connection_to_db
    def remove_product(self, product_id):
        product_id = str(product_id)
        statement = f"DELETE FROM {PRODUCT} WHERE id = {product_id}"
        self.try_to_execute_statement(statement)

    @log_request
    @check_connection_to_db
    def edit_product(self, product_id, product):
        self.edit_record(PRODUCT, product_id, product)

    @check_connection_to_db
    def edit_category(self, category_id, category):
        self.edit_record(CATEGORY, category_id, category)

    @check_connection_to_db
    def edit_record(self, table, record_id, record):
        # attributes = ','.join([f"{k}" for k in record.keys()])
        # values = ','.join([f"'{v}'" for v in record.values()])
        k_v = ', '.join([f"{k}='{v}'" for k, v in record.items()])
        statement = f"UPDATE {table} SET {k_v} WHERE id = {record_id}"
        self.try_to_execute_statement(statement)


    @check_connection_to_db
    @log_request
    def fetch_all_categories_with_products(self):
        all_category = self._fetch_all_records_from_table(CATEGORY)
        columns_from_products = 'id, amount, expiry_date, note, name'
        for category in all_category:
            statement = f"SELECT {columns_from_products} FROM {PRODUCT} WHERE category = {category['id']}"
            self.try_to_execute_statement(statement)
            rows = []
            for row in self.cursor.fetchall():
                rows.append(row)
            category.update({'products': rows})

            expiry_date = ''
            rows_with_expiry_date_not_empty = [x for x in rows if not '' and x['expiry_date'] != '']
            if rows_with_expiry_date_not_empty:
                a = min([datetime.strptime(product['expiry_date'], '%d.%m.%Y') for product in
                         rows_with_expiry_date_not_empty])
                expiry_date = a.strftime("%d.%m.%Y")
            category.update({'expiry_date': expiry_date})

            amount = sum([int(x['amount']) for x in rows])
            category.update({'amount': amount})

        logging.debug(f"Return to GUI: {pprint.pformat(all_category)}")
        return all_category

    def _fetch_all_records_from_table(self, table):
        rows = []
        statement = f"SELECT * FROM {table}"
        self.try_to_execute_statement(statement)

        for row in self.cursor.fetchall():
            rows.append(row)
        return rows

    # def count_number_of_product_entry(self, name):
    #     statement = f"SELECT COUNT(*) FROM {PRODUCTS} WHERE name = '{name}'"
    #     return self.cursor.execute(statement)


# if __name__ == "__main__":
#     db = DataBaseInterface()
    # print(pprint.pformat(db.fetch_all_categories_with_products()))
    # db.add_category({'name': 'Kukurydza', 'category': 'Jedzenie', 'measure': 'szt'})
    # print(pprint.pformat(db.fetch_all_categories_with_products()))
    # db.add_product({'category': '1', 'amount': '1', 'note': '340g', 'name': '', 'expiry_date': '01.01.2022'})
    # db.edit_product(7, {'category': '1', 'amount': '1', 'note': '350g', 'name': '', 'expiry_date': '01.01.2022'})
    # db.remove_category('14')
    # db.remove_product('29')
