import { Box, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { Category, Product } from '../pages/Pantry';
import { removeProduct } from '../api/Api';


interface CellProps {
    isEdited?: boolean
}

export const EditableTableCell = (props: React.PropsWithChildren<CellProps>) => {
    return <TableCell>{props.children}</TableCell>
}

export const CollapsibleRow = (props: { row: Category; onEdit: Function }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow key={row.id}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <EditableTableCell>{row.name}</EditableTableCell>
                <EditableTableCell>{row.amount} {row.measure}</EditableTableCell>
                <EditableTableCell>{row.expiryDate}</EditableTableCell>
                <TableCell>
                    <Grid container>
                        <Grid item xs={6}>
                            <IconButton aria-label="edit" onClick={() => props.onEdit(row)}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {row.name}
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Expiry Date</TableCell>
                                        <TableCell>Note</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((product) => (
                                        <ProductRow row={product} measure={row.measure} onEdit={props.onEdit} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export const ProductRow = (props: { row: Product; measure: string; onEdit: Function}) => {
    const { row } = props;
    const [edit, setEdit] = React.useState(false);

    return <TableRow key={row.id}>
        <TableCell />
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.amount} {props.measure}</TableCell>
        <TableCell>{row.expiryDate}</TableCell>
        <TableCell>{row.note}</TableCell>
        <TableCell>
            <Grid container>
                <Grid item xs={6}>
                    <IconButton aria-label="edit" onClick={() => {
                            setEdit(true)
                            props.onEdit(row)
                        }}>
                        <EditIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
                    <IconButton aria-label="delete" onClick={e => removeProduct()}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </TableCell>
    </TableRow>
}

export const StockTable = (props: { rows: Category[]; onEdit: Function}) => {
    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.rows.map((row: Category) => (
                    <CollapsibleRow row={row} onEdit={props.onEdit}/>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}