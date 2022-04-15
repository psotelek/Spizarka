import { Box, breadcrumbsClasses, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect } from 'react';
import { Actions, Category, PantryContext, Product } from '../pages/Pantry';
import { deleteProduct } from '../api/Api';
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

export const CategoryRow = (props: { row: Category }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [categoryOptionDialog, setCategoryOptionDialog] = React.useState(false);
    const [popperAnchor, setPopperAnchor] = React.useState<null | HTMLElement>(null);
    const actions = React.useContext(PantryContext);
    const actionMenu = { addProduct: "Dodaj produkt", editCategory: "Edytuj kategorię", removeCategory: "Usuń kategorię" }

    const openOptionDialog = (event: React.MouseEvent<HTMLElement>) => {
        setPopperAnchor(event.currentTarget);
        setCategoryOptionDialog((previousState) => !previousState);
    }

    const handleOptionClick = (option: string) => {
        switch (option) {
            case "addProduct":
                actions?.clientAdd({ id: -1, name: "", amount: 0, expiryDate: "", note: "" }, row);
                break;
            case "editCategory":
                actions?.edit(row);
                break;
            case "removeCategory":
                actions?.delete(row);
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
                                        <ProductRow row={product} category={row} />
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

export const ProductRow = (props: { row: Product; category: Category }) => {
    const { row } = props;
    const [edit, setEdit] = React.useState(false);
    const actions = React.useContext(PantryContext);
    useEffect(() => {
        if (row.id === -1) {
            setEdit(true);
        }
    }, [row])

    return <TableRow key={row.id}>
        <EditableTableCell isEdited={edit}>{row.name}</EditableTableCell>
        <EditableTableCell isEdited={edit}>{row.amount} {props.category.measure}</EditableTableCell>
        <EditableTableCell isEdited={edit}>{row.expiryDate}</EditableTableCell>
        <EditableTableCell isEdited={edit}>{row.note}</EditableTableCell>
        <TableCell>
            {edit ?
                <Grid container>
                    <Grid item xs={6}>
                        <IconButton aria-label="confirm" onClick={() => {
                            if (row.id !== -1) {
                                actions?.edit(row);
                            } else {
                                actions?.create(row);
                            }
                            setEdit(false);
                        }}>
                            <CheckIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton aria-label="cancel" onClick={e => {
                            if (row.id === -1) {
                                actions?.clientRemove(row, props.category);
                            }
                            setEdit(false);
                        }}>
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

export const StockTable = (props: { rows: Category[] }) => {

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
                    <CategoryRow row={row} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}