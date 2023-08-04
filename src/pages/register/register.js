import React, { useState } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import register-module.css
import register from './register.module.css'

const Register = () => {
    const [full_name, setFull_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [role, setRole] = useState('')
    const [errorRole, setErrorRole] = useState('')
    const [errorRegister, setErrorRegister] = useState('')
    const navigate = useNavigate()

    const hendlerFullName = (e) => {
        setFull_name(e.target.value)
    }

    const hendlerEmail = (e) => {
        setEmail(e.target.value)
    }

    const hendelPassword = (e) => {
        setPassword(e.target.value)
    }

    const hendleRoleChange = (e) => {
        setRole(e.target.value)
    }

    const hendleSubmit = (e) => {
        e.preventDefault()

        if (full_name.trim() === '') {
            setErrorName('name tidak boleh kosong, name harus di isi')
        } else {
            setErrorName('')
        }

        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (email.trim() === '') {
            setErrorEmail('Email tidak boleh kosong, Email hasus di isi')
        } else if (!emailRegex.test(email)) {
            setErrorEmail('Email tidak Valid, harus email yang valid')
        } else {
            setErrorEmail('')
        }

        if (password.length < 3) {
            setErrorPassword('Password harus memiliki minimal 3 karakter')
        } else {
            setErrorPassword('')
        }

        if (!role) {
            setErrorRole('Please select a role')
        } else {
            setErrorRole('')
        }

        if (!errorEmail && !errorName && !errorPassword && !errorRole) {
            const userData = {
                full_name: full_name,
                email: email,
                password: password,
                role: role
            }

            axios.post('http://localhost:3000/register', userData)
                .then((respon) => {
                    console.log('Registration success: ', respon)

                    navigate('/login')
                })
                .catch((err) => {
                    setErrorRegister(err.response.data.error)
                })
        }
    }

    return (
        <div className={register.container}>
            <h1>REGISTER</h1>
            <div className={register.container2}>
                {errorRegister && <p className={register.text2}>{errorRegister}</p>}
                <Form onSubmit={hendleSubmit}>
                    <Form.Group as={Row} controlId="formHorizontalEmail" >
                        <Form.Label column sm={2}>
                            Full Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control className={register.mb3} type="text" placeholder="Masukan Nama"
                                value={full_name} onChange={hendlerFullName} />
                        </Col>
                        {errorName && <p className={register.text}>{errorName}</p>}
                    </Form.Group>

                    <Form.Group as={Row} className={register.mb2} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email Address
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control className={register.mb3} type="email" placeholder="Email"
                                value={email} onChange={hendlerEmail} />
                        </Col>
                        {errorEmail && <p className={register.text}>{errorEmail}</p>}
                    </Form.Group>

                    <Form.Group as={Row} className={register.mb2} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control className={register.mb3} type="password" placeholder="Password"
                                value={password} onChange={hendelPassword} />
                        </Col>
                        {errorPassword && <p className={register.text}>{errorPassword}</p>}
                    </Form.Group>
                    <fieldset className={register.mb4}>
                        <Form.Group as={Row} >
                            <Form.Label as="legend" column sm={2}>
                                Role
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="user"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    value='user'
                                    checked={role === 'user'}
                                    onChange={hendleRoleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="admin"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    value='admin'
                                    checked={role === 'admin'}
                                    onChange={hendleRoleChange}
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
                    {errorRole && <p className={register.text}>{errorRole}</p>}
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button className={register.btn} type="submit" variant="primary">Register</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            <div className={register.login}>
                <h4><Link className={register.akun} to='/login'>Sudah punya Akun ? Login</Link></h4>
            </div>
        </div>
    )
}

export default Register
