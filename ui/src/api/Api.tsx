export const getPantry = () => {
    return [{
        id: 1, name: "masło", amount: 3, measure: "szt", expiryDate: "12-01-2023", type: "food", products: [
            { id: 1, name: "mlekovita", amount: 1, expiryDate: "12-01-2023", note: "zamrazarka" },
            { id: 2, name: "mlekovita", amount: 1, expiryDate: "12-01-2023", note: "zamrazarka" },
            { id: 3, name: "mlekovita", amount: 1, expiryDate: "12-01-2023", note: "zamrazarka" }
        ]
    },
    { id: 2, name: "laskolada", amount: 1, measure: "count", expiryDate: "12-01-2023", type: "food", products: [] },
    { id: 3, name: "pistacje", amount: 1, measure: "count", expiryDate: "12-01-2023", type: "food", products: [] },
    { id: 4, name: "mydło", amount: 1, measure: "count", expiryDate: "12-01-2023", type: "cleaning", products: [] },
    { id: 5, name: "proszek", amount: 1, measure: "kg", expiryDate: "12-01-2023", type: "cleaning", products: [] }]
}

export const getPantryOnline = () => {
    return fetch("http://localhost:8000/getAll")
        .then((response) => response.json())
        .then((json) => {
            return json
        })
}

export const addCategory = () => {
    alert("Added Category")
}

export const addProduct = () => {
    alert("Added Product")
}

export const editCategory = () => {
    alert("Edited Category")
}

export const editProduct = () => {
    alert("Edited Product")
}

export const removeCategory = () => {
    alert("Removed Category")
}

export const removeProduct = () => {
    alert("Removed Product")
}