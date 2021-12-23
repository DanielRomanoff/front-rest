import React, {useState} from "react";
import {addUser} from "../../services/userService";
import {setCookie} from "../../utils";

const Register = () => {
    const [firstname, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [password, setPassword] = useState();
    const submit = (e) => {
        e.preventDefault();
        addUser({
            "id": null,
            "login": login,
            "firstName": firstname,
            "lastName": lastName,
            "email": email,
            "password": password,
            "roles": [
                JSON.parse(role)
            ]
        })
            .then((resp) => {
                alert('Пользователь создан!')
            })
    }
    return (
        <div className={'bodyRegister'}>
            <div className={"formLogin"}>
                <form onSubmit={submit}>
                    <label htmlFor={"firstname"}>Имя</label>
                    <input type="text" placeholder="Введите Имя" name="firstname" required onChange={e => {
                        setFirstName(e.target.value)
                    }}/>
                    <label>Фамилия</label>
                    <input type="text" placeholder="Введите Фамилию" name="lastname" required onChange={e => {
                        setLastName(e.target.value)
                    }}/>
                    <label>Email</label>
                    <input type="email" placeholder="Введите email" name="email" required onChange={e => {
                        setEmail(e.target.value)
                    }}/>
                    <label>Роль</label>
                    <select onChange={e => {
                        setRole(e.target.value)
                    }}>
                        <option id="waiter" value={'{"id": 1, "name": "WAITER"}'}>Официант</option>
                        <option id="cook" value={'{"id": 2, "name": "ADMIN"}'}>Администратор</option>
                        <option id="admin" value={'{"id": 3, "name": "COOK"}'}>Повар</option>
                    </select>
                    <label>Login</label>
                    <input type="text" placeholder="Введите Login" name="login" required onChange={e => {
                        setLogin(e.target.value)
                    }}/>
                    <label>Пароль</label>
                    <input type="password" placeholder="Введите пароль" name="password" required onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                    <button type="submit">Зарегистрироваться</button>
                    <p>У вас уже есть аккаунт? - <a href="/"
                                                    className="exit"
                                                    onClick={e => setCookie('destination', 'LOGIN')}>Авторизируйтесь</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;