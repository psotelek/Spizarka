import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import React from 'react';


interface CellProps {
    
}

export const CustomTableCell = (props: React.PropsWithChildren<CellProps>) => {
    return <TableCell>{props.children}</TableCell>
}

export const StockTable = (props: {rows: object[]}) => {
    return <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Measure</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row: any) => (
              <TableRow key={row.name}>
                <CustomTableCell>{row.name}</CustomTableCell>
                <CustomTableCell>{row.amount}</CustomTableCell>
                <CustomTableCell>{row.measure}</CustomTableCell>
                <CustomTableCell>{row.type}</CustomTableCell>
                <CustomTableCell>{row.expiry_date}</CustomTableCell>
                <CustomTableCell>
                        <Grid container>
                            <Grid item xs={6}>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <IconButton aria-label="delete">
                                    <Delete/>
                                </IconButton>
                            </Grid>
                        </Grid>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  }