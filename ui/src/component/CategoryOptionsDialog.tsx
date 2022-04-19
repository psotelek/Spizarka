import { List, ListItem, ListItemText, Paper, Popper } from "@mui/material";

import React from "react";
import { CategoryActions } from "./StockTable";

interface OptionPopperProps {
    actionList: CategoryActions;
    handleOptionClick: (arg0: string) => void;
    popperAnchor: null | HTMLElement;
    open: boolean
}

export const OptionPopper = ({actionList, handleOptionClick, popperAnchor, open}: OptionPopperProps) => {
    return (
        <Popper open={open} placement="left-start" anchorEl={popperAnchor}>
            <Paper>
                <List sx={{ pt: 0 }}>
                    {Object.entries(actionList).map(([key, value], index) => (
                        <ListItem button onClick={() => handleOptionClick(key)} key={key}>
                            <ListItemText primary={value} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Popper >
    );
}