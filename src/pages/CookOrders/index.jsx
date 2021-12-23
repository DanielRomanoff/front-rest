import React, {useEffect, useState} from "react";
import {getOrders} from "../../services/orderService";
import {Routes} from "../../App";
import "./styles.css"
import {useHistory} from "react-router-dom";

const CookOrders = () => {
    const history = useHistory();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then((resp) => {
            setOrders(resp)
        });
    }, []);

    return (
        <body className="bodyOrderCook">
            <div className={'plus'}>
                <img
                    style={{margin: '10px 10px 0 0', cursor: "pointer"}}
                    src={"img/add.png"}
                    onClick={()=> {
                        history.push(Routes.COOK);
                    }}
                />
            </div>
            <div className="ordersCook">
                {orders.map(order => (
                    <div className="waiterOrdersDish" key={order.id}>
                        <label>№{order.id}</label>
                        <a>
                            {order.dish.map(dish => (
                                <b>{dish.name}<b> / </b></b>
                            ))}
                        </a>
                        <select
                            className="statusLabel">
                            <option>Создан</option>
                            <option>Готовится</option>
                            <option>Готов</option>
                        </select>
                        <label className="coast">{order.amount}₽</label>
                    </div>
                ))}
            </div>
        </body>

    )
}

export default CookOrders;