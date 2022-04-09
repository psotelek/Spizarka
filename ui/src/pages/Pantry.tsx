import { Category } from "@mui/icons-material"
import { Button, TextField, Select, MenuItem, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { createCategory, createProduct, editCategory, editProduct, getPantry, getPantryOnline } from "../api/Api"
import { CategoryDialog } from "../component/Dialog"
import { StockTable } from "../component/StockTable"

export interface Category {
  id?: number
  name: string
  amount: number
  measure: string
  expiryDate: string
  type: string
  products: Array<Product>
}

export interface Product {
  id?: number
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
  const [categoryDialog, setCategoryDialog] = useState(false)


  useEffect(() => {
    setRows(getPantry())
  }, [])

  // getPantryOnline().then((data) => {
  //   setRows(data)
  // })

  const handleCreate = (created: Category | Product) => {
    if (isCategory(created)) {
      createCategory()
    } else {
      createProduct()
    }
  }

  const handleEdit = (edited: Category | Product) => {
    if (isCategory(edited)) {
      editCategory()
    } else {
      editProduct()
    }
  }

  const handleDelete = (deleted: Category | Product) => {

  }

  const closeCategoryDialog = () => {
    setCategoryDialog(false)
  }

  const openCategoryDialog = () => {
    setCategoryDialog(true)
  }

  return (
    <div>
      <CategoryDialog handleSave={handleCreate} handleClose={closeCategoryDialog} state={categoryDialog}/>
      <Grid
        container
        spacing={2}
        padding={2}
      >
        <Grid item xs={6}>
          <Grid container spacing={2}>
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
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row-reverse" height="100%" >
            <Button variant="contained" onClick={openCategoryDialog}>NOWA KATEGORIA</Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <StockTable rows={rows} onEdit={handleEdit} />
        </Grid>
      </Grid>
    </div>
  )
}

