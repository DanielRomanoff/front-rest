import fetch from '../fetch'
import {handleResponse} from "./userService";
import {API_AMOUNT, API_DISHES} from "../api";
import {handleError} from "../utils";

export const getDishes = async () => {
    return await fetch(API_DISHES, {
        headers: { "Content-Type": "application/json" },
        method: 'GET'
    }).then(handleResponse)
        .catch(handleError)
}

export const createDishes = async (dish) => {
    return await fetch(`${API_DISHES}/create`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(dish)
    }).then(handleResponse)
        .catch(handleError)
}

export const getAmount = async () => {
    return await fetch(API_AMOUNT, {
        headers: { "Content-Type": "application/json" },
        method: 'GET'
    }).then(handleResponse)
        .catch(handleError)
}