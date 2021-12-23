import React, {useEffect, useState} from "react";
import {getDishes} from "../../services/dishesService";
import "./styless.css";
import {addOrder} from "../../services/orderService";
import {Routes} from "../../App";
import {useHistory} from "react-router-dom";

const WaiterOrders = () => {
    const history = useHistory();
    const [dishes, setDishes] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getDishes().then((resp) => setDishes(resp));
    }, []);

    const clearOrder = () => {
        setOrder([]);
    }
    const removeDish = (dishId) => {
        const filtered = order.filter(item => (item.id !== dishId));
        setOrder(filtered);
    }
    const addDishToOrder = (dish) => setOrder([...order, dish]);
    const getCost = () => {
        let cost = 0;
        order.forEach(item => {
            cost += Number.parseInt(item.cost);
        });
        return cost;
    }
    return (
        <body className="waiterBody">
            <div className={'plus'}>
                <img
                    style={{margin: '10px 10px 0 0', cursor: "pointer"}}
                    src={"img/add.png"}
                    onClick={() => {
                        history.push(Routes.ORDERS);
                    }}
                />
            </div>
            <div className={'waiterContainer'}>
                <div className="menuDish">
                    {dishes.map(dish => (
                        <div className="waiterDish" key={dish.id}>
                            <label>{dish.name}</label>
                            <button className="waiterAddButton" onClick={() => {
                                addDishToOrder(dish)
                            }}>Добавить
                            </button>
                            <a>
                                {dish.products.map(product => (
                                    <b key={product.name}>{`${product.name}`}<b> / </b></b>
                                ))}
                            </a>
                            <label className="coast">{`${dish.cost}₽`}</label>
                        </div>
                    ))}
                </div>
                <div className="orderDish">
                    <div className={'waiterOrderHeader'}>
                        <label>Заказ</label>
                        <button className={'deleteAll'} onClick={clearOrder}><img src={"img/delete.png"}/></button>
                    </div>
                    {order.map(item => (
                        <div className={'waiterOrder'} key={item.id}>
                            <div className={'waiterOrderDishInfo'}>
                                <label>{item.name}</label>
                                <div style={{color: "white"}}>_______</div>
                                <input type="number" min="1" value="1" onChange={() => {
                                }}/>
                                <a>шт.</a>
                            </div>
                            <button className="removeButton" onClick={() => removeDish(item.id)}><img
                                src={'img/remove.png'}/></button>
                            <label className="coast">{`${item.cost}₽`}</label>
                        </div>
                    ))}
                    <div className={'waiterOrderCostWrapper'}>
                        <div className={'waiterOrderCost'}>
                            <div>Всего:</div>
                            <div>{`${getCost()}₽`}</div>
                        </div>
                        <button
                            className="waiterAddOrderButton"
                            onClick={() => {
                                addOrder({dish: order, amount: getCost()}).then(() => {
                                    alert('Добавлен')
                                });
                            }}>
                            Отправить
                        </button>
                    </div>

                </div>

            </div>
        </body>

    )
}

export default WaiterOrders;