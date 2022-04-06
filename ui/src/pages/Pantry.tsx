import { Button, TextField, Select, MenuItem, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { editCategory, editProduct, getPantry, getPantryOnline } from "../api/Api"
import { StockTable } from "../component/StockTable"

export interface Category {
  id: number
  name: string
  amount: number
  measure: string
  expiryDate: string
  type: string
  products: Array<Product>
}

export interface Product {
  id: number
  name: string
  amount: number
  expiryDate: string
  note: string
}

const isCategory = (item: Category | Product): item is Category => {
  return (item as Category).measure !== undefined;
}

export const Pantry = () => {
  const [rows, setRows] = useState<Category[]>([])


  useEffect(() => {
    setRows(getPantry())
  }, [])

  // getPantryOnline().then((data) => {
  //   setRows(data)
  // })

  const handleEdit = (edited: Category | Product) => {
    if(isCategory(edited)) {
      editCategory()
    } else {
      editProduct()
    }
  }

  const handleDelete = (deleted: Category | Product) => {

  }

  const handleCreate = (added: Category | Product) => {
    
  }

  return <Grid
    container
    spacing={2}
    justifyContent="center"
    alignItems="center"
    padding={2}
  >
    <Grid item height="100%">
      <Button variant="outlined">Add</Button>
    </Grid>
    <Grid item>
      <TextField
        id="outlined-basic"
        variant="outlined"
      />
    </Grid>
    <Grid item>
      <Select
        value="all"
        label="Age">
        <MenuItem value="all">Wszystkie</MenuItem>
        <MenuItem value="food">Jedzenie</MenuItem>
        <MenuItem value="cleaning">Środki czystości</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={12}>
      <StockTable rows={rows} onEdit={handleEdit}/>
    </Grid>
  </Grid>
}