import fetch from '../fetch'
import {handleResponse} from "./userService";
import {API_ORDER, API_ORDERS, API_PRODUCT, API_PRODUCTCREATE} from "../api";
import {handleError} from "../utils";

export const addOrder = async (form) => {
    return await fetch(API_ORDER, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...form})
    }).then(handleResponse)
        .catch(handleError)
}

export const getProducts = async () => {
    return await fetch(API_PRODUCT, {
        headers: { "Content-Type": "application/json" },
        method: 'GET'
    }).then(handleResponse)
        .catch(handleError)
}
export const getOrders = async () => {
    return await fetch(API_ORDERS, {
        headers: { "Content-Type": "application/json" },
        method: 'GET'
    }).then(handleResponse)
        .catch(handleError)
}

export const putProducts = async (newProduct) => {
    return await fetch(API_PRODUCTCREATE, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...newProduct})
    }).then(handleResponse)
        .catch(handleError)
}