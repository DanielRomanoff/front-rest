import React, {useEffect, useState} from "react";
import "./styless.css";
import {getAmount, getDishes} from "../../services/dishesService";

const Admin = () => {
    const [dishes, setDishes] = useState();
    const [amount, setAmount] = useState(0);
    useEffect(()=>{
        getAmount().then(amount => {setAmount(amount)})
        getDishes().then(dishes => {setDishes(dishes)})
    },[]);

    const filterIn = (dish) => {return dish.menu };
    const filterOut = (dish) => {return !dish.menu };

    const toggleClick = (id) => {
        let filterDishes = dishes.map(el => {
            if (el.id === id) return {...el,menu:!el.menu};
            return el;
        })
        setDishes(filterDishes);
    };
    console.log(dishes?.filter(filterIn))
    return (
        <div className={"adminContainer"}>
            <label className="inMenu">В меню</label>
            <label className="notInMenu">Не в меню</label>
            <label className="money">Выручка: <a>
                {amount}
                ₽</a></label>
            <div className={'inMenuContainer'}>
                {dishes?.filter(filterIn).map(dish => {
                    console.log(dish)
                 return(   <div className={'dish'} key={dish.id} onClick={() => toggleClick(dish.id)}>
                        <label>{dish.name}</label>
                        <a>
                            {dish?.products?.map(product => (<b key={product.id}>{product.name} </b>))}
                        </a>
                    </div>)
                })}
            </div>
            <div className={'notMenuContainer'}>
                {dishes?.filter(filterOut).map(dish => (
                    <div className={'dish'} key={dish.id} onClick={() => toggleClick(dish.id)}>
                        <label>{dish.name}</label>
                        <a >
                            {dish?.products?.map(product => (<b key={product.id}>{product.name} </b>))}
                        </a>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default Admin;