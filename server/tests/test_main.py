from server.data_base_interface import CATEGORY, PRODUCT
import pytest
from copy import copy


def test_add_1st_category_and_its_product_without_exp_date(connection):
    item = pytest.TEST_ITEM_1
    category_data = item['category']
    connection.add_category(category_data)
    expected_output = category_data
    expected_output.update({'id': 1, 'amount': 0, 'expiry_date': '', 'products': []})
    assert connection.fetch_all_categories_with_products() == [expected_output]

    expected_products = []
    for i, product in enumerate(item['products']):
        prod_data = product
        prod_data.update({'category': 1})
        connection.add_product(prod_data)
        del prod_data['category']
        prod_data.update({'id': 1+i})
        expected_products.append(prod_data)
        expected_output.update({'products': expected_products})

    expected_output.update({'amount': 9})
    assert connection.fetch_all_categories_with_products() == [expected_output]


def test_add_1st_category_and_its_product_with_exp_date(connection):
    item = pytest.TEST_ITEM_2
    category_data = item['category']
    connection.add_category(category_data)
    expected_output = category_data
    expected_output.update({'id': 1, 'amount': 12, 'expiry_date': item['products'][2]['expiry_date'], 'products': []})

    expected_products = []
    for i, product in enumerate(item['products']):
        prod_data = product
        prod_data.update({'category': 1})
        connection.add_product(prod_data)
        del prod_data['category']
        prod_data.update({'id': 1+i})
        expected_products.append(prod_data)
        expected_output.update({'products': expected_products})

    assert connection.fetch_all_categories_with_products() == [expected_output]

# @pytest.mark.parametrize(
#     "item",
#     # [pytest.TEST_ITEM_1,
#     [pytest.TEST_ITEM_3])
#      # pytest.TEST_ITEM_2,
#      # pytest.TEST_ITEM_3])
# def test_add_new_record_with_measure_szt(connection, item):
#     products_table = []
#     products_items_table = []
#     products_full_info_table = []
#     tmp = copy(item)
#
#     [product, product_item] = connection._split_input_record(item)
#     products_table.append(product)
#
#     for i in range(item['amount']):
#         product_item.update({"id": i+1})
#         tmp.update({"id": i+1})
#         products_items_table.append(copy(product_item))
#         products_full_info_table.append(copy(tmp))
#
#     connection.add_new_record(item)
#
#     assert connection.fetch_all_records_from_table(PRODUCT_TYPES) == products_table
#     assert connection.fetch_all_records_from_table(PRODUCTS) == products_items_table
#     assert connection.fetch_all_records() == products_full_info_table
#
#     print("----------------")
#     print(products_table)
#     print(products_items_table)
#     print(connection.fetch_all_records())
#     print("----------------")