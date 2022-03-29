from server.data_base_interface import PRODUCTS, PRODUCTS_ITEMS
import pytest
from copy import copy

@pytest.mark.parametrize(
    "item",
    # [pytest.TEST_ITEM_1,
    [pytest.TEST_ITEM_3])
     # pytest.TEST_ITEM_2,
     # pytest.TEST_ITEM_3])
def test_add_new_record_with_measure_szt(db_interface, item):
    products_table = []
    products_items_table = []
    products_full_info_table = []
    tmp = copy(item)

    [product, product_item] = db_interface._split_input_record(item)
    products_table.append(product)

    for i in range(item['amount']):
        product_item.update({"id": i+1})
        tmp.update({"id": i+1})
        products_items_table.append(copy(product_item))
        products_full_info_table.append(copy(tmp))

    db_interface.add_new_record(item)

    assert db_interface.fetch_all_records_from_table(PRODUCTS) == products_table
    assert db_interface.fetch_all_records_from_table(PRODUCTS_ITEMS) == products_items_table
    assert db_interface.fetch_all_records() == products_full_info_table

    print("----------------")
    print(products_table)
    print(products_items_table)
    print(db_interface.fetch_all_records())
    print("----------------")

# def test_add_new_record_with_measure_1szt(db_interface):
#     items = [pytest.TEST_ITEM_1, pytest.TEST_ITEM_2]
#     table1 = []
#     table2 = []
#
#     for item_id, item in enumerate(items):
#         print(item_id)
#         [t1, t2] = db_interface._split_input_record(item)
#         t1.update({"id": item_id+1})
#         t2.update({"id": item_id+1})
#         table1.append(t1)
#         table2.append(t2)
#         db_interface.add_new_record(item)
#
#         assert db_interface.fetch_all_records_from_table(STOCKS) == table1
#         assert db_interface.fetch_all_records_from_table(STOCK_ITEMS) == table2
#
#         print(db_interface.fetch_all_records_from_tables())
