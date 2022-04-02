import { Button, TextField, Select, MenuItem, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getPantry, getPantryOnline } from "../api/Api"
import { StockTable } from "../component/StockTable"

export interface Category {
  id: number
  name: string
  amount: number
  measure: string
  expiry_date: string
  type: string
  products: Array<Product>
}

interface Product {
  id: number
  name: string
  amount: number
  expiry_date: string
  note: string
}

export const Pantry = () => {
    const [rows, setRows] = useState<Category[]>([])


//     useEffect(() => {
//       setRows(getPantry())
//     }, [])


    getPantryOnline().then((data) => {
      setRows(data)
    })



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
        <StockTable rows={rows}/>
      </Grid>
    </Grid>
  }