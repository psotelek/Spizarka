export const getPantry = () => {
    return [{id: 1, name: "masło", amount: 3, measure: "szt", expiry_date: "12-01-2023", type: "food", products: [
        {id: 1, name: "mlekovita", amount: 1, expiry_date: "12-01-2023", note: "zamrazarka"},
        {id: 2, name: "mlekovita", amount: 1, expiry_date: "12-01-2023", note: "zamrazarka"},
        {id: 3, name: "mlekovita", amount: 1, expiry_date: "12-01-2023", note: "zamrazarka"}
    ]},
    {id: 2, name: "laskolada", amount: 1, measure: "count", expiry_date: "12-01-2023", type: "food", products: []},
    {id: 3, name: "pistacje", amount: 1, measure: "count", expiry_date: "12-01-2023", type: "food", products: []},
    {id: 4, name: "mydło", amount: 1, measure: "count", expiry_date: "12-01-2023", type: "cleaning", products: []},
    {id: 5, name: "proszek", amount: 1, measure: "kg", expiry_date: "12-01-2023", type: "cleaning", products: []}]
}

 export const getPantryOnline = () => {
    return fetch("http://localhost:8000/getAll")
        .then((response) => response.json())
        .then((json) => {
            return json
        })
}