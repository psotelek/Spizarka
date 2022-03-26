from server.data_base_interface import STOCKS, STOCK_ITEMS
import pytest


def test_add_new_record(db_interface):
    items = [pytest.TEST_ITEM_1, pytest.TEST_ITEM_2]
    table1 = []
    table2 = []

    for item_id, item in enumerate(items):
        print(item_id)
        [t1, t2] = db_interface._split_input_record(item)
        t1.update({"id": item_id+1})
        t2.update({"id": item_id+1})
        table1.append(t1)
        table2.append(t2)
        db_interface.add_new_record(item)

        assert db_interface.fetch_all_records_from_table(STOCKS) == table1
        assert db_interface.fetch_all_records_from_table(STOCK_ITEMS) == table2

        print(db_interface.fetch_all_records_from_tables())

# def test_remove_record(db_interface):
#     db_interface.add_initial_items()
#     item_removed = pytest.TEST_ITEM_2
#     item_left = pytest.TEST_ITEM_1
#     db_interface.remove_record(item_removed['name'])
#
#     assert db_interface.fetch_all_records_from_table(STOCKS) == [(item_left['name'], item_left['type'], item_left['measure'])]
#     assert db_interface.fetch_all_records_from_table(STOCK_ITEMS) == [(item_left['name'], item_left['expiry_date'], item_left['notes'])]
#
#
