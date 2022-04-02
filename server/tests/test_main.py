from server.data_base_interface import PRODUCT_TYPES, PRODUCTS
import pytest
from copy import copy


def test_add_1st_product_type_and_its_product_without_exp_date(db_interface):
    item = pytest.TEST_ITEM_1
    prod_type_data = item['product_type']
    db_interface.add_new_product_type(prod_type_data)
    expected_output = prod_type_data
    expected_output.update({'type_id': 1, 'amount': 0, 'exp_date': '', 'product_list': []})
    assert db_interface.fetch_all_product_types_with_products() == [expected_output]

    expected_products = []
    for i, product in enumerate(item['products']):
        prod_data = product
        prod_data.update({'type_id': 1})
        db_interface.add_new_product(prod_data)
        del prod_data['type_id']
        prod_data.update({'product_id': 1+i})
        expected_products.append(prod_data)
        expected_output.update({'product_list': expected_products})

    expected_output.update({'amount': 9})
    assert db_interface.fetch_all_product_types_with_products() == [expected_output]


def test_add_1st_product_type_and_its_product_with_exp_date(db_interface):
    item = pytest.TEST_ITEM_2
    prod_type_data = item['product_type']
    db_interface.add_new_product_type(prod_type_data)
    expected_output = prod_type_data
    expected_output.update({'type_id': 1, 'amount': 12, 'exp_date': item['products'][2]['exp_date'], 'product_list': []})

    expected_products = []
    for i, product in enumerate(item['products']):
        prod_data = product
        prod_data.update({'type_id': 1})
        db_interface.add_new_product(prod_data)
        del prod_data['type_id']
        prod_data.update({'product_id': 1+i})
        expected_products.append(prod_data)
        expected_output.update({'product_list': expected_products})

    assert db_interface.fetch_all_product_types_with_products() == [expected_output]

# @pytest.mark.parametrize(
#     "item",
#     # [pytest.TEST_ITEM_1,
#     [pytest.TEST_ITEM_3])
#      # pytest.TEST_ITEM_2,
#      # pytest.TEST_ITEM_3])
# def test_add_new_record_with_measure_szt(db_interface, item):
#     products_table = []
#     products_items_table = []
#     products_full_info_table = []
#     tmp = copy(item)
#
#     [product, product_item] = db_interface._split_input_record(item)
#     products_table.append(product)
#
#     for i in range(item['amount']):
#         product_item.update({"id": i+1})
#         tmp.update({"id": i+1})
#         products_items_table.append(copy(product_item))
#         products_full_info_table.append(copy(tmp))
#
#     db_interface.add_new_record(item)
#
#     assert db_interface.fetch_all_records_from_table(PRODUCT_TYPES) == products_table
#     assert db_interface.fetch_all_records_from_table(PRODUCTS) == products_items_table
#     assert db_interface.fetch_all_records() == products_full_info_table
#
#     print("----------------")
#     print(products_table)
#     print(products_items_table)
#     print(db_interface.fetch_all_records())
#     print("----------------")