import React, { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { GlobalContext } from "../../contexts/GlobalContext";
import Link from "../Link";
const Header = () => {
    const { module, setModule, userType, setUserType, userId, setUserId } = useContext(GlobalContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOptionClick = (module) => {
        setModule(module);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        setUserType(localStorage.getItem("USER_TYPE"));
        setUserId(localStorage.getItem("USER_ID"));
    }, []);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    Chamado
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <div>
                    {userType == "admin" && (
                        <Button color="inherit" onClick={handleClick}>
                            Opções
                        </Button>
                    )}

                    <Link href="/login">
                        <Button sx={{ color: "white" }}>Logout</Button>
                    </Link>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => handleOptionClick("SERVICE_CALL")}>Chamado</MenuItem>
                        <MenuItem onClick={() => handleOptionClick("USER")}>Usuários</MenuItem>
                        <MenuItem onClick={() => handleOptionClick("ORGANIZATION")}>Organizações</MenuItem>
                        <MenuItem onClick={() => handleOptionClick("DEPARTMENT")}>Departamentos</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
