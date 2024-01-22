import { Box, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { PantryContext } from 'pages/Pantry';
import { Category, Product } from 'domain/ProductView'
import { deleteCategory, deleteProduct, editCategory, editProduct } from '../api/Api';
import { OptionPopper } from './CategoryOptionsDialog';
import { ProductInfo, ProductType } from 'domain/Product';


interface CellProps {
    property: string,
    isEdited?: boolean,
    props?: TableCellProps,
    onChange: Dispatch<SetStateAction<any>>
}

export interface CategoryActions {
    addProduct: string;
    editCategory: string;
    removeCategory: string;
}

export const EditableTableCell = (props: React.PropsWithChildren<CellProps>) => {
    const [value, setValue] = useState(props.children)

    return props.isEdited ?
        <TableCell><TextField value={value} variant="standard" onChange={e => {
            setValue(e.target.value)
            props.onChange((prevChange: ProductInfo | ProductType): ProductInfo | ProductType => {
                return { ...prevChange, [props.property]: e.target.value }
            })
        }}/></TableCell> :
        <TableCell>{value}</TableCell>
}

export const EditableNumberCell = (props: React.PropsWithChildren<CellProps>) => {
    const [value, setValue] = useState(props.children)

    return props.isEdited ?
        <TableCell><TextField
        type="number"
        value={value} 
        variant="standard" 
        onChange={e => {
            setValue(e.target.value)
            props.onChange((prevChange: ProductInfo | ProductType): ProductInfo | ProductType => {
                return { ...prevChange, [props.property]: e.target.value }
            })
        }}/></TableCell> :
        <TableCell>{value}</TableCell>
}

export const CategoryRow = (props: { row: Category }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [categoryOptionDialog, setCategoryOptionDialog] = React.useState(false);
    const [popperAnchor, setPopperAnchor] = React.useState<null | HTMLElement>(null);
    const [edit, setEdit] = useState(false);
    const [newType, setNewType] = useState({
        category: row.category,
        name: row.name,
        measure: row.measure
    })
    const actions = React.useContext(PantryContext);
    const actionMenu = { addProduct: "Dodaj produkt", editCategory: "Edytuj kategorię", removeCategory: "Usuń kategorię" }

    const openOptionDialog = (event: React.MouseEvent<HTMLElement>) => {
        setPopperAnchor(event.currentTarget);
        setCategoryOptionDialog((previousState) => !previousState);
    }

    const handleOptionClick = (option: string) => {
        switch (option) {
            case "addProduct":
                actions?.clientAdd({ id: -1, name: "", amount: 0, expiry_date: "", note: "" }, row);
                break;
            case "editCategory":
                setEdit(true)
                break;
            case "removeCategory":
                deleteCategory(row.id)
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
                <EditableTableCell property='name' onChange={setNewType} isEdited={edit}>{row.name}</EditableTableCell>
                <TableCell>
                    <TableCell>{row.amount}</TableCell> 
                    <EditableTableCell property='measure' onChange={setNewType} isEdited={edit}>{row.measure}</EditableTableCell>
                    </TableCell>
                <TableCell>{row.expiry_date}</TableCell>
                <EditableTableCell property='category' onChange={setNewType} isEdited={edit}>{row.category}</EditableTableCell>
                <TableCell>
                    {edit ?
                    <Grid container>
                        <Grid item xs={6}>
                            <IconButton aria-label="confirm" onClick={() => {
                                editCategory({
                                    category: newType.category,
                                    measure: newType.measure,
                                    name: newType.name,
                                }, row.id);
                                setEdit(false);
                            }}>
                                <CheckIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton aria-label="cancel" onClick={e => {
                                setEdit(false);
                            }}>
                                <HighlightOffIcon />
                            </IconButton>
                        </Grid>
                    </Grid> :
                        <IconButton aria-label="confirm" onClick={openOptionDialog}>
                        <MoreVertIcon />
                        <OptionPopper
                            actionList={actionMenu}
                            handleOptionClick={handleOptionClick}
                            popperAnchor={popperAnchor}
                            open={categoryOptionDialog}
                        />
                    </IconButton>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" style={{paddingLeft: '15%', background: 'lightgray'}}>
                                {row.name}
                            </Typography>
                            <Table>
                                <colgroup>
                                    <col width="10%" />
                                    <col width="15%" />
                                    <col width="15%" />
                                    <col width="15%" />
                                    <col width="35%" />
                                    <col width="10%" />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
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
    const { row, category } = props;
    const [edit, setEdit] = useState(false);
    const [newProduct, setNewProduct] = useState({
        category: category.id,
        amount: row.amount,
        note: row.note,
        name: row.name,
        expiry_date: row.expiry_date
    })
    const actions = useContext(PantryContext);
    useEffect(() => {
        if (row.id === -1) {
            setEdit(true);
        }
    }, [row])

    return <TableRow key={row.id}>
        <TableCell/>
        <EditableTableCell property={"name"} onChange={setNewProduct} isEdited={edit}>{row.name}</EditableTableCell>
        <TableCell>
            <EditableNumberCell property={"amount"} onChange={setNewProduct} isEdited={edit}>{row.amount}</EditableNumberCell>
            <TableCell sx={{border: 'none'}}>{props.category.measure}</TableCell>
        </TableCell>
        <EditableTableCell property={"expiry_date"} onChange={setNewProduct} isEdited={edit}>{row.expiry_date}</EditableTableCell>
        <EditableTableCell property={"note"} onChange={setNewProduct} isEdited={edit}>{row.note}</EditableTableCell>
        <TableCell>
            {edit ?
                <Grid container>
                    <Grid item xs={6}>
                        <IconButton aria-label="confirm" onClick={() => {
                            if (row.id !== -1) {
                                editProduct({
                                    category: newProduct.category,
                                    amount: newProduct.amount,
                                    note: newProduct.note,
                                    name: newProduct.name,
                                    expiry_date: newProduct.expiry_date
                                }, row.id);
                            } else {
                                actions?.productCreate({
                                    category: newProduct.category,
                                    amount: newProduct.amount,
                                    note: newProduct.note,
                                    name: newProduct.name,
                                    expiry_date: newProduct.expiry_date
                                });
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
                        <IconButton aria-label="delete" onClick={e => deleteProduct(row.id)}>
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
            <colgroup>
                <col width="10%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="35%" />
                <col width="10%" />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Action</TableCell>
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