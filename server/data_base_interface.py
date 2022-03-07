import MySQLdb

STOCKS = 'STOCKS'
STOCK_ITEMS = 'STOCKS ITEMS'


class DataBaseInterface:
    def __init__(self):
        self.db_interface = MySQLdb.connect(host="sql210.epizy.com", port=3306, user="epiz_31224000", password="EgO3BMDJFY", database="epiz_31224000_stocksathome")
        self.cursor = self.db_interface.cursor()

    def fetch_all_records_from_table(self, table):
        rows = []
        for row in self.cursor.execute(f"SELECT * FROM '{table}' ORDER BY name"):
            rows.append(row)
        return rows

    def add_new_record(self, **kwargs):
        self.add_new_record_to_table(STOCKS, kwargs['name'], kwargs['category'], kwargs['count_type'])
        self.add_new_record_to_table(STOCK_ITEMS, kwargs['name'], kwargs['expiry_date'], kwargs['notes'])

    def add_new_record_to_table(self, table, *args):
        values = '\"' + '\",\"'.join(args) + '\"'
        self.cursor.execute(f"INSERT INTO '{table}' VALUES ({values})")
        self.db_interface.commit()

    def remove_record(self, name):
        self.remove_record_from_table(STOCKS, name)
        self.remove_record_from_table(STOCK_ITEMS, name)

    def remove_record_from_table(self, table, name):
        self.cursor.execute(f"DELETE FROM '{table}' WHERE name = '{name}'")
        self.db_interface.commit()


    # def remove_record(self):
    #     self.cursor.execute(