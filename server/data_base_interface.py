import sqlite3 as sl
import MySQLdb

STOCKS = 'STOCKS'
STOCK_ITEMS = 'STOCK_ITEMS'


class DataBaseInterface:
    def __init__(self):
        self.db_interface = MySQLdb.connect(host="localhost", port=3306, user="Paulina", password="Mysql55!", database="zapasy")
        self.cursor = self.db_interface.cursor(MySQLdb.cursors.DictCursor)

    def _split_input_record(self, input_dict):
        table1 = {'name': input_dict['name'], 'type': input_dict['type'], 'measure': input_dict['measure'],
                  'amount': input_dict['amount']}
        table2 = {'name': input_dict['name'], 'expiry_date': input_dict['expiry_date'], 'notes': input_dict['notes']}
        return [table1, table2]

    def fetch_all_records_from_table(self, table):
        rows = []
        statement = f"SELECT * FROM {table} ORDER BY name"
        self.cursor.execute(statement)

        for row in self.cursor.fetchall():
            rows.append(row)
        return rows;

    def count_number_of_product_entry(self, name):
        statement = f"SELECT COUNT(*) FROM {STOCK_ITEMS} WHERE name = '{name}'"
        return self.cursor.execute(statement)


    def fetch_all_records_from_tables(self):
        rows = []
        statement = f"SELECT * FROM {STOCK_ITEMS} JOIN {STOCKS} ON {STOCK_ITEMS}.name = {STOCKS}.name ORDER BY {STOCK_ITEMS}.name"
        self.cursor.execute(statement)
        for row in self.cursor.fetchall():
            rows.append(row)
        return rows

    def add_new_record(self, input):
        [input_stocks, input_stock_items] = self._split_input_record(input)
        self.add_new_record_to_table(STOCKS, input_stocks)
        self.add_new_record_to_table(STOCK_ITEMS, input_stock_items)

    def add_new_record_to_table(self, table, input):
        attributes = ','.join([f" {k}" for k in input.keys()])
        values = ','.join([f"'{k}'" for k in input.values()])
        self.cursor.execute(f"INSERT INTO {table} ({attributes}) VALUES ({values})")

    def remove_record(self, name):
        self.remove_record_from_table(STOCKS, name)
        self.remove_record_from_table(STOCK_ITEMS, name)

    def remove_record_from_table(self, table, name):
        self.cursor.execute(f"DELETE FROM {table} WHERE name = {name}")
        self.db_interface.commit()

    def add_new_product(self, input_data):
        if input_data['measure'] == 'szt':
            input_data['amount'] = 1
        self.add_new_record_to_table(STOCKS, input_data)
