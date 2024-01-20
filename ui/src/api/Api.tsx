import React from "react";
import { Category, Product } from "../pages/Pantry";

export const getPantry = () => {
    return fetch("http://localhost:8000/getAll")
        .then((response) => response.json())
        .then((json) => {
            return json
        })
}

export const createCategory = (category: Category) => {
    alert("Added Category")
}

export const createProduct = (product: Product) => {
    alert("Added Product")
}

export const editCategory = () => {
    alert("Edited Category")
}

export const editProduct = () => {
    alert("Edited Product")
}

export const deleteCategory = () => {
    alert("Removed Category")
}

export const deleteProduct = () => {
    alert("Removed Product")
}