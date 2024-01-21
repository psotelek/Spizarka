import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material"
import React from "react"
import { ProductType } from "domain/Product";

export const CategoryDialog = (props: { handleSave: (productType: ProductType) => void; handleClose: () => void; state: boolean }) => {
  const { handleSave, handleClose, state } = props
  const [measure, setMeasure] = React.useState("")
  const [type, setType] = React.useState("")
  const [name, setName] = React.useState("")

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
          label="Name"
          type="name"
          fullWidth
          variant="standard"
          onChange={e => setName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Category"
          type="category"
          fullWidth
          variant="standard"
          onChange={e => setType(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="measure"
          label="Measure"
          type="measure"
          fullWidth
          variant="standard"
          onChange={e => setMeasure(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={e => {
          handleSave({
            'name': name,
            'category': type,
            'measure': measure
          })
          handleClose()
        }}>Stwórz kategorię</Button>
        <Button onClick={handleClose}>Anuluj</Button>
      </DialogActions>
    </Dialog>
  )
}