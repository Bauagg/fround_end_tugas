import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import login css
import login from './login.module.css'

import { AutContext } from "../../router";

const Login = () => {
    const { dispatch } = useContext(AutContext)
    const History = useNavigate()

    const initialState = {
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }
    const [data, setData] = useState(initialState)

    const hendelOnChangeEmail = (e) => {
        setData({
            ...data,
            email: e.target.value
        })
    }

    const hendelOnChangePassword = (e) => {
        setData({
            ...data,
            password: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!emailRegex.test(data.email)) {
            setData({ ...data, isSubmitting: false, errorMessage: 'Invalid Email format' })
            return
        }

        const requesBody = {
            email: data.email,
            password: data.password
        }

        axios.post('http://localhost:3000/login', requesBody)
            .then((respon) => {
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user: respon.data.datas.user,
                        token: respon.data.datas.token,
                        role: respon.data.datas.role
                    }
                });
                console.log(respon)

                History('/')
            })
            .catch((err) => {
                setData({ ...data, errorMessage: err.response.data.message })
            })
    }
    console.log(data.errorMessage)
    return (
        <div>
            <div className={login.form_section}>
                <form onSubmit={handleSubmit} className={login.form}>
                    <h2 className={login.form_title}>Sign in</h2>
                    {data.errorMessage && <p className={login.text}>{data.errorMessage}</p>}
                    <div className={login.form_group}>
                        <input type="email" className={login.form_input} value={data.email} onChange={hendelOnChangeEmail} />
                        <label className={login.form_label}>Email atau ponsel</label>
                    </div>
                    <div className={login.form_group}>
                        <input type="password" className={login.form_input} value={data.password} onChange={hendelOnChangePassword} />
                        <label className={login.form_label}>Password</label>
                    </div>
                    <button type="submit" className={login.form_button} disabled={data.isSubmitting}>Sign in</button>
                    <div className={login.link}>
                        <h4 className={login.akun}><Link className={login.akun1} to='/register'>Belum punya Akun?Daftar</Link></h4>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Login