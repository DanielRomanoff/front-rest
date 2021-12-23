import React, {useState} from "react";
import {login} from "../../services/userService";
import {setCookie} from "../../utils";

const LoginPage = ({setToken}) => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const submit = (e) => {
        e.preventDefault();
        login(userName, password)
            .then(token => {
                setCookie('token', JSON.stringify(token));
                setToken(token);
            })
    }

    return (
        <div className={'bodyCook'}>
            <form className="formLogin" onSubmit={submit}>
                <label>Логин</label>
                <input type="username" placeholder="Введите логин" name="login" onChange={e => setUserName(e.target.value)} />
                <label>Пароль</label>
                <input type="password" placeholder="Введите пароль" name="password" onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Войти</button>
                <p>У вас нет аккаунта? - <a href="/register" className="exit" onClick={e => setCookie('destination', 'REGISTER')}>Зарегистрируйтесь</a></p>
            </form>
        </div>
    )
}
export default LoginPage;