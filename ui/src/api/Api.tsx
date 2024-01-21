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

export const editCategory = () => {
    alert("Edited Category")
}

export const editProduct = () => {
    alert("Edited Product")
}

export const deleteCategory = (id: number) => {
    fetch('http://localhost:8000/removeCategory', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: {id}})
    })
}

export const deleteProduct = (id: number) => {
    fetch('http://localhost:8000/removeProduct', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: {id}})
    })
}