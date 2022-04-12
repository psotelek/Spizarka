import { Box, breadcrumbsClasses, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect } from 'react';
import { Actions, Category, Product } from '../pages/Pantry';
import { createProduct, editCategory, deleteCategory, deleteProduct } from '../api/Api';
import { OptionPopper } from './CategoryOptionsDialog';


interface CellProps {
    isEdited?: boolean
}

export interface CategoryActions {
    addProduct: string;
    editCategory: string;
    removeCategory: string;
}

export const EditableTableCell = (props: React.PropsWithChildren<CellProps>) => {
    return props.isEdited ?
        <TableCell><TextField value={props.children} variant="standard" /></TableCell> :
        <TableCell>{props.children}</TableCell>
}

export const CategoryRow = (props: { row: Category; actions: Actions }) => {
    const { row, actions } = props;
    const [open, setOpen] = React.useState(false);
    const [categoryOptionDialog, setCategoryOptionDialog] = React.useState(false);
    const [popperAnchor, setPopperAnchor] = React.useState<null | HTMLElement>(null);

    const actionMenu = { addProduct: "Dodaj produkt", editCategory: "Edytuj kategorię", removeCategory: "Usuń kategorię" }

    const openOptionDialog = (event: React.MouseEvent<HTMLElement>) => {
        setPopperAnchor(event.currentTarget);
        setCategoryOptionDialog((previousState) => !previousState);
    }

    const handleOptionClick = (option: string) => {
        switch (option) {
            case "addProduct":
                row.products.push({name: "", amount: 0, expiryDate: "", note: ""})
                break;
            case "editCategory":
                actions.edit(row);
                break;
            case "removeCategory":
                actions.delete(row);
                break;
            default:
                console.log("Error!");
        }
    }

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
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.amount} {row.measure}</TableCell>
                <TableCell>{row.expiryDate}</TableCell>
                <TableCell><IconButton aria-label="confirm" onClick={openOptionDialog}>
                    <MoreVertIcon />
                    <OptionPopper
                        actionList={actionMenu}
                        handleOptionClick={handleOptionClick}
                        popperAnchor={popperAnchor}
                        open={categoryOptionDialog}
                    />
                </IconButton>
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
                                <colgroup>
                                    <col width="20%" />
                                    <col width="20%" />
                                    <col width="20%" />
                                    <col width="30%" />
                                    <col width="30%" />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Expiry Date</TableCell>
                                        <TableCell>Note</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((product) => (
                                        <ProductRow row={product} measure={row.measure} onEdit={props.actions.edit} />
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

export const ProductRow = (props: { row: Product; measure: string; onEdit: Function }) => {
    const { row } = props;
    const [edit, setEdit] = React.useState(false);
    console.log(row.id)
    useEffect(() => {
        if (row.id === undefined) {
            setEdit(true)
            row.id = -1
        }
    }, [])

    return <TableRow key={row.id}>
        <EditableTableCell isEdited={edit}>{row.name}</EditableTableCell>
        <EditableTableCell isEdited={edit}>{row.amount} {props.measure}</EditableTableCell>
        <EditableTableCell isEdited={edit}>{row.expiryDate}</EditableTableCell>
        <EditableTableCell isEdited={edit}>{row.note}</EditableTableCell>
        <TableCell>
            {edit ?
                <Grid container>
                    <Grid item xs={6}>
                        <IconButton aria-label="confirm" onClick={() => {
                            props.onEdit(row)
                            setEdit(false)
                        }}>
                            <CheckIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton aria-label="cancel" onClick={e => setEdit(false)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Grid>
                </Grid> :
                <Grid container>
                    <Grid item xs={6}>
                        <IconButton aria-label="edit" onClick={() => {
                            setEdit(true)
                        }}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton aria-label="delete" onClick={e => deleteProduct()}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            }
        </TableCell>
    </TableRow>
}

export const StockTable = (props: { rows: Category[]; actions: Actions }) => {

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
                    <CategoryRow row={row} actions={props.actions} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}