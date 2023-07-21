import React from 'react';
import Container from "@mui/material/Container";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistList} from "features/todolistsList/todolist-list";
import {Login} from "features/auth/login";

export const Routing = () => {
    return (
        <>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </>
    );
};