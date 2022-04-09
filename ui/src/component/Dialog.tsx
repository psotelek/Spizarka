import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material"
import React from "react"
import { Category } from "../pages/Pantry";

export const CategoryDialog = (props: {handleSave: (category: Category) => void; handleClose: () => void; state: boolean}) => {
    const {handleSave, handleClose, state} = props
    
    return (
        <Dialog open={state} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new category.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={e => {
              handleSave({name: "", amount: 0, measure: "", expiryDate: "", type: "", products: []})
              handleClose()
            }}>Stwórz produkt</Button>
        </DialogActions>
      </Dialog>
    )
}