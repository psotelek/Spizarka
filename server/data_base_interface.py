import sqlite3 as sl
import MySQLdb
import logging
from datetime import datetime

PRODUCT_TYPES = 'PRODUCT_TYPES'
PRODUCTS = 'PRODUCTS'


class DataBaseInterface:
    def __init__(self):
        self.db_interface = self.init_db()
        # self.db_interface.autocommit(True)
        self.cursor = self.db_interface.cursor(MySQLdb.cursors.DictCursor)

    def init_db(self):
        return MySQLdb.connect(host="localhost", port=3306, user="Paulina",
                               password="Mysql55!", database="zapasy")

    def get_cursor(self):
        try:
            self.db_interface.ping()
        except MySQLdb._exceptions.OperationalError as err:
            self.db_interface = self.init_db()
        return self.db_interface.cursor(MySQLdb.cursors.DictCursor)

    def check_connection_to_db(action_on_db):
        def _fn(self, *args, **kwargs):
            self.get_cursor()
            return action_on_db(self, *args, **kwargs)
        return _fn

    def add_new_product_type(self, new_product_type):
        self.add_new_record_to_table(PRODUCT_TYPES, new_product_type)
        #todo   return sth?

    def add_new_product(self, new_product):
        self.add_new_record_to_table(PRODUCTS, new_product)
        #todo   return sth?

    @check_connection_to_db
    def add_new_record_to_table(self, table, input):
        attributes = ','.join([f" {k}" for k in input.keys()])
        values = ','.join([f"'{k}'" for k in input.values()])
        statement = f"INSERT INTO {table} ({attributes}) VALUES ({values})"

        self.cursor.execute(statement)
        self.db_interface.commit()

        #todo   check response?

    @check_connection_to_db
    def fetch_all_product_types_with_products(self):
        product_types = self.fetch_all_records_from_table(PRODUCT_TYPES)
        columns_from_products = 'id, amount, expiry_date, note'
        for product_type in product_types:
            statement = f"SELECT {columns_from_products} FROM {PRODUCTS} WHERE type = {product_type['id']}"
            self.cursor.execute(statement)

            rows = []
            for row in self.cursor.fetchall():
                rows.append(row)
            product_type.update({'products': rows})

            expiry_date = ''
            rows_with_expiry_date_not_empty = [x for x in rows if not '' and x['expiry_date'] != '']
            if rows_with_expiry_date_not_empty:
                a = min([datetime.strptime(product['expiry_date'], '%d.%m.%Y') for product in rows_with_expiry_date_not_empty])
                expiry_date = a.strftime("%d.%m.%Y")
            product_type.update({'expiry_date': expiry_date})

            amount = sum([int(x['amount']) for x in rows])
            product_type.update({'amount': amount})

        return product_types







    # def _split_input_record(self, input_dict):
    #     table1 = {'name': input_dict['name'], 'type': input_dict['type'], 'measure': input_dict['measure']}
    #     table2 = {'amount': input_dict['amount'], 'expiry_date': input_dict['expiry_date'], 'notes': input_dict['notes']}
    #     return [table1, table2]


    def fetch_all_records_from_table(self, table):
        rows = []
        statement = f"SELECT * FROM {table}"
        self.cursor.execute(statement)

        for row in self.cursor.fetchall():
            rows.append(row)
        return rows;

    def fetch_all_records(self):
        rows = []
        # statement = f"SELECT * FROM {PRODUCTS_ITEMS} JOIN {PRODUCTS} ON {PRODUCTS_ITEMS}.name = {PRODUCTS}.name ORDER BY {PRODUCTS_ITEMS}.name"
        statement = f"SELECT * FROM {PRODUCTS} pi LEFT JOIN {PRODUCT_TYPES} p using(name) ORDER BY pi.name"
        self.cursor.execute(statement)
        for row in self.cursor.fetchall():
            rows.append(row)
        return rows

    def count_number_of_product_entry(self, name):
        statement = f"SELECT COUNT(*) FROM {PRODUCTS} WHERE name = '{name}'"
        return self.cursor.execute(statement)

    def add_new_record(self, input):
        [input_stocks, input_stock_items] = self._split_input_record(input)
        self.add_new_record_to_table(PRODUCT_TYPES, input_stocks)

        if input['measure'] == 'szt':
            for _ in range(input['amount']):
                self.add_new_record_to_table(PRODUCTS, input_stock_items)
        else:
            self.add_new_record_to_table(PRODUCTS, input_stock_items)



    # def remove_record(self, name):
    #     self.remove_record_from_table(STOCKS, name)
    #     self.remove_record_from_table(STOCK_ITEMS, name)
    #
    # def remove_record_from_table(self, table, name):
    #     self.cursor.execute(f"DELETE FROM {table} WHERE name = {name}")
    #     self.db_interface.commit()
