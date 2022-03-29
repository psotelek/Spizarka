import { ReactComponent } from "*.svg"
import React, { Component } from "react"
import { idText } from "typescript";

export class Api {
    pantry: {id: number, name: string; amount: string; measure: string; expiry_date: string; note: string; type: string; }[];
    
    constructor() {
        this.pantry = [{id: 1, name: "masło", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "food"},
        {id: 2, name: "laskolada", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "food"},
        {id: 3, name: "pistacje", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "food"},
        {id: 4, name: "mydło", amount: "1", measure: "count", expiry_date: "12-01-2023", note: "zamrazarka", type: "cleaning"},
        {id: 5, name: "proszek", amount: "1", measure: "kg", expiry_date: "12-01-2023", note: "zamrazarka", type: "cleaning"}]
    }

    getPantry() {
        return this.pantry;
    }

    addPantry(name: string, amount: string, measure: string, expiry_date: string, note: string, type: string) {
        this.pantry.push({id: this.pantry.length + 1, name: name, amount: amount, measure: measure, expiry_date: expiry_date, note: note, type: type})
    }

    removePantry(name: string) {
        const index = this.pantry.findIndex(data => data.name === name)
        this.pantry.splice(index, 1)
        let counter = 1
        this.pantry.forEach(row => {
            row.id = counter ++
        })
    }

    editPantry(row: {id: number, name: string, amount: string, measure: string, expiry_date: string, note: string, type: string}) {
        this.pantry[row.id-1] = row
    }
}