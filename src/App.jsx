import './App.css';
import React, {useEffect, useState} from "react";
import { Route, useHistory} from "react-router-dom";
import LoginPage from "./pages/Login";
import {getCookie} from "./utils";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Cook from "./pages/Cook";
import WaiterOrders from "./pages/Waiter";
import Orders from "./pages/Orders";
import CookOrders from "./pages/CookOrders";

export const Routes = {
    REGISTER: "/register",
    ADMIN: "/admin",
    LOGIN: "/",
    COOK: "/cook",
    WAITER: "/waiter",
    ORDERS: "/orders",
    COOKORDERS: "/cookorders"
}

function App() {
    const history = useHistory();
    const link = document.location.pathname;
    const [token, setToken] = useState(getCookie('token') ? JSON.parse(getCookie('token')): undefined);

    useEffect(() => {
        if (token && (link === Routes.LOGIN || link === Routes.REGISTER)) {
            const name = token.roles[0].name
            history.push(Routes[name]);
            document.location.pathname = Routes[name];
        } else if (link === Routes.LOGIN) {
            history.push(Routes.LOGIN);
        }  if (link === Routes.REGISTER) {
            history.push(Routes.REGISTER);
        } /*else {
            history.push(Routes.LOGIN);
        }*/
    }, [token]);

    if (!token && link === Routes.LOGIN) return (<LoginPage setToken={setToken}/>);
    if (!token && link === Routes.REGISTER) return (<Register />);

    return (
        <>
            <Route path={Routes.ADMIN}>
                <Admin/>
            </Route>
            <Route path={Routes.COOK}>
                <Cook/>
            </Route>
            <Route path={Routes.WAITER}>
                <WaiterOrders />
            </Route>
            <Route path={Routes.ORDERS}>
                <Orders />
            </Route>
            <Route path={Routes.COOKORDERS}>
                <CookOrders />
            </Route>
        </>


    );
}

export default App;
