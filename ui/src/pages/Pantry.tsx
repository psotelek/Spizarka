import { Button, TextField, Select, MenuItem, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { createProductType, createProduct, editCategory, editProduct, getPantry } from "../api/Api"
import { CategoryDialog } from "../component/CategoryDialog"
import { StockTable } from "../component/StockTable"
import { ProductType, ProductInfo } from "domain/Product"
import { Category, Product } from "domain/ProductView"

export const PantryContext = React.createContext<Actions | undefined>(undefined);

export interface Actions {
  productCreate: (arg0: ProductInfo) => void,
  typeCreate: (arg0: ProductType) => void,
  clientAdd: (arg0: Product, arg1: Category) => void,
  clientRemove: (arg0: Product, arg1: Category) => void
}

export const Pantry = () => {
  const [rows, setRows] = useState<Category[]>([]);
  const [categoryDialog, setCategoryDialog] = useState(false);


  useEffect(() => {
    getPantry().then((result: Category[]) => setRows(result));
  }, []);

  const handleProductCreate = (product: ProductInfo) => {
    createProduct(product)
  }

  const handleTypeCreate = (productType: ProductType) => {
    createProductType(productType)
  }

  const handleLocalCreate = (created: Product, category: Category) => {
    let items = [...rows];
    let itemIndex = items.findIndex(item => item.id === category.id);
    let item = {...items[itemIndex]};
    if (item.products === undefined) {
      item.products = []
    }
    item.products.unshift(created);
    items[itemIndex] = item;
    setRows(items);
  }

  const handleLocalDelete = (deleted: Product, category: Category) => {
    let items = [...rows];
    let categoryIndex = items.findIndex(item => item.id === category.id);
    let item = {...items[categoryIndex]};
    let productIndex = item.products.findIndex(item => item.id === -1);
    item.products.splice(productIndex, 1);
    items[categoryIndex] = item;
    setRows(items);
  }

  const actions = { 
    productCreate: handleProductCreate, 
    typeCreate: handleTypeCreate,
    clientAdd: handleLocalCreate, 
    clientRemove: handleLocalDelete } as Actions;

  const closeCategoryDialog = () => {
    setCategoryDialog(false);
  }

  const openCategoryDialog = () => {
    setCategoryDialog(true);
  }

  return (
    <PantryContext.Provider value={actions}>
      <CategoryDialog handleSave={actions.typeCreate} handleClose={closeCategoryDialog} state={categoryDialog}/>
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
          <StockTable rows={rows} />
        </Grid>
      </Grid>
    </PantryContext.Provider>
  )
}

