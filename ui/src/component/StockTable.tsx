import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import { Cancel, Check, Delete } from '@mui/icons-material';

interface CellProps {
    children?: React.ReactNode
    isEditable?: boolean
    onChange?: any
}

export const CustomTableCell = (props: React.PropsWithChildren<CellProps>) => {
    return props.isEditable ?
        <TableCell>
            <TextField defaultValue={props.children} id="standard-basic" variant="standard" onChange={props.onChange} />
        </TableCell> : 
        <TableCell>{props.children}</TableCell>
}

export const StockTable = (props: {rows: object[]; editedRow: number; onEdit: any; api: any; update: any; refresh: any; setRefresh: any}) => {
    const emptyRow = {id: 0, name: "", amount: "", measure: "", type: "", expirty_date: "", note: ""}
    const isEdited = props.editedRow != -1
    const [editedRow, setRow] = useState(emptyRow)
    return <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Measure</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row: any) => (
              <TableRow key={row.name}>
                <CustomTableCell isEditable={(row.id - 1) === props.editedRow} onChange={(e: any) => setRow({...row, name: e.target.value })}>{row.name}</CustomTableCell>
                <CustomTableCell isEditable={(row.id - 1) === props.editedRow} onChange={(e: any) => setRow({...row, amount: e.target.value})}>{row.amount}</CustomTableCell>
                <CustomTableCell isEditable={(row.id - 1) === props.editedRow} onChange={(e: any) => setRow({...row, measure: e.target.value})}>{row.measure}</CustomTableCell>
                <CustomTableCell isEditable={(row.id - 1) === props.editedRow} onChange={(e: any) => setRow({...row, type: e.target.value})}>{row.type}</CustomTableCell>
                <CustomTableCell isEditable={(row.id - 1) === props.editedRow} onChange={(e: any) => setRow({...row, expiry_date: e.target.value})}>{row.expiry_date}</CustomTableCell>
                <CustomTableCell isEditable={(row.id - 1) === props.editedRow} onChange={(e: any) => setRow({...row, note: e.target.value})}>{row.note}</CustomTableCell>
                <CustomTableCell>{isEdited ? 
                        <Grid container>
                            <Grid item xs={6}>
                                <IconButton aria-label="check" onClick={e => {
                                    props.onEdit(-1)
                                    props.api.editPantry(editedRow)
                                    props.update(props.api.getPantry())
                                }}>
                                    <Check />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <IconButton aria-label="edit" onClick={e => props.onEdit(-1)}>
                                    <Cancel />
                                </IconButton>
                            </Grid>
                        </Grid> : 
                        <Grid container>
                            <Grid item xs={6}>
                                <IconButton aria-label="edit" onClick={e => props.onEdit(row.id - 1)}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <IconButton aria-label="delete" onClick={e => {
                                    props.api.removePantry(row.name)
                                    props.update(props.api.getPantry())
                                    props.setRefresh(!props.refresh.valueOf())
                                }}>
                                    <Delete/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    }
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  }