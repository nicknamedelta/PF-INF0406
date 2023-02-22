import { createContext, useContext, useEffect, useState } from "react";
import styles from "/styles/Home.module.css";
import { useRouter } from "next/router";
import Header from "../components/Header/Header";
import Routing from "../components/Routing/Routing";
import GlobalContextProvider, { GlobalContext } from "../contexts/GlobalContext";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("JWT_TOKEN");
        if (token == "" || token == "undefined" || !token || token == undefined) {
            return () => {
                router.push("/login");
            };
        } else {
            axios.defaults.headers.common = { Authorization: `bearer ${token}` };
        }
    }, []);

    return (
        <GlobalContextProvider>
            <div className={styles.background}>
                <Header />
                <Routing />
            </div>
        </GlobalContextProvider>
    );
};

export default Index;
