import React, {useCallback, useEffect, useState} from "react";
import "./styless.css";
import {setProducts, getProducts, putProducts} from "../../services/orderService";
import {createDishes, getAmount, getDishes} from "../../services/dishesService";
import {useHistory} from "react-router-dom";
import {Routes} from "../../App";

const Cook = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState();
    const [dishProducts, setDishProducts] = useState([]);
    const [pushProduct, setPushProduct] = useState();
    const [newDish, setNewDish] = useState();

    const refresh = () => getProducts().then((products) => setProducts(products));

    useEffect(refresh, []);

    const addProduct = () => {
        setDishProducts([...dishProducts, {...pushProduct, count: document.body.querySelector('#weight').value}]);
    }

    const addDish = useCallback(() => {
        createDishes({...newDish, products: dishProducts, menu: true}).then(r => alert('Блюдо создано!'))
    }, [newDish, dishProducts])

    return (
        <>
            <div className={'plus'}>
                <img
                    style={{margin: '10px 10px 0 0', cursor: "pointer"}}
                    src={"img/add.png"}
                    onClick={()=> {
                        history.push(Routes.COOKORDERS);
                    }}
                />
            </div>
            <div className="bodyCook">


                <div className={"newDishContainer"} id="newDishContainer">
                    <label className={"labelTitle"}>Блюдо</label>
                    <input type="text" placeholder="Наименование блюда" onChange={(e) => {
                        setNewDish({...newDish, name: e.target.value})
                    }}/>
                    <input type="text" placeholder="Стоимость" onChange={(e) => {
                        setNewDish({...newDish, cost: e.target.value})
                    }}/>
                    <div className="newProductInDish" onChange={(e) => {
                        const prd = products.find(product => (String(product.id) === e.target.value))
                        setPushProduct({...pushProduct, ...prd});
                    }}>
                        <select>
                            {products?.map((product) =>
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>)}
                        </select>
                        <input
                            id={"weight"}
                            key={"weight"}
                            type="number"
                            min="1"
                            placeholder="Введите вес в граммах"
                            onChange={(e) => {
                                const prd = {...pushProduct, count: e.target.value};
                                setPushProduct(prd)
                            }}
                        />
                        <label style={{cursor: "pointer"}} onClick={addProduct}>+ Добавить продукт</label>
                    </div>
                    {dishProducts.length > 0 &&
                    dishProducts?.map((product, idx) => (
                        <div
                            className="selectedDish"
                            id={product.id} key={idx}
                            onClick={(e) => {
                                const filteredProducts = dishProducts.filter(product => (String(product.id) !== e.target.id))
                                setDishProducts(filteredProducts)
                            }}>
                            <label>{`${product.name} ${product.count}gr`}</label>
                        </div>

                    ))}
                    <button onClick={addDish}>Добавить блюдо</button>
                </div>

                <form className="newProductContainer" id="form">
                    <label className="labelTitle">Продукты</label>
                    <input type="text" placeholder="Наименование продукта" name="nameProduct" onChange={(e) => {
                        setNewProduct({...newProduct, name: e.target.value})
                    }}/>
                    <input type="text" placeholder="Вес" name="countProduct" onChange={(e) => {
                        setNewProduct({...newProduct, count: e.target.value})
                    }}/>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        putProducts(newProduct).then(r => {
                            alert('Продукт добавлен');
                            refresh();
                        });
                    }}>Добавить продукт
                    </button>
                </form>
            </div>
        </>

    )
}

export default Cook;