import { ProductType, ProductInfo } from "domain/Product";

export const getPantry = () => {
    return fetch("http://localhost:8000/getAll")
        .then((response) => response.json())
        .then((json) => {
            return json
        })
}

export const createProductType = (productType: ProductType) => {
    fetch('http://localhost:8000/addCategory', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productType)
    })
}

export const createProduct = (product: ProductInfo) => {
    fetch('http://localhost:8000/addProduct', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
}

export const editCategory = (category: ProductType, id: number) => {
    fetch('http://localhost:8000/editCategory?' + new URLSearchParams({
        'category_id':id.toString()
    }), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category)
    })
}

export const editProduct = (product: ProductInfo, id: number) => {
    fetch('http://localhost:8000/editProduct?' + new URLSearchParams({
        'product_id':id.toString()
    }), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
}

export const deleteCategory = (id: number) => {
    fetch('http://localhost:8000/removeCategory?' + new URLSearchParams({
        'category_id':id.toString()
    }), {
        method: 'DELETE'
    })
}

export const deleteProduct = (id: number) => {
    fetch('http://localhost:8000/removeProduct?' + new URLSearchParams({
        'product_id':id.toString()
    }), {
        method: 'DELETE'
    })
}