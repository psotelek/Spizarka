export async function GetPantry() {
    const data = await (await fetch('http://localhost:8000/api')).json()
    const pantry = [{id: 1, name: "masło", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "food"},
    {id: 2, name: "laskolada", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "food"},
    {id: 3, name: "pistacje", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "food"},
    {id: 4, name: "mydło", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "cleaning"},
    {id: 5, name: "proszek", amount: "1", measure: "kg", expiry_date: "12-01-2023", note: "zamrazarka", type: "cleaning"}]
    return data
}
