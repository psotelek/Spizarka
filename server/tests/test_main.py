from server.data_base_interface import STOCKS, STOCK_ITEMS
import pytest


def test_add_new_record(db_interface):
    item = pytest.TEST_ITEM_1

    db_interface.add_new_record(**pytest.TEST_ITEM_1)

    assert db_interface.fetch_all_records_from_table(STOCKS) == [(item['name'], item['category'], item['count_type'])]
    assert db_interface.fetch_all_records_from_table(STOCK_ITEMS) == [(item['name'], item['expiry_date'], item['notes'])]


def test_remove_record(db_interface):
    db_interface.add_initial_items()
    item_removed = pytest.TEST_ITEM_2
    item_left = pytest.TEST_ITEM_1
    db_interface.remove_record(item_removed['name'])

    assert db_interface.fetch_all_records_from_table(STOCKS) == [(item_left['name'], item_left['category'], item_left['count_type'])]
    assert db_interface.fetch_all_records_from_table(STOCK_ITEMS) == [(item_left['name'], item_left['expiry_date'], item_left['notes'])]


