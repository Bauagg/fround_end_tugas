import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Form, Row, Button, InputGroup } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// import hompage.css
import hompages from './hompage.module.css'

// import api
import { GetDataProduct } from "./api";

// import state global
import { AutContext } from "../../router";

const Hompages = () => {
    const { state } = useContext(AutContext)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [tag, setTag] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        GetDataProduct()
            .then((respon) => setData(respon))
    }, [])

    const hendleDeleteProduct = (productId) => {
        axios.delete(`http://localhost:3000/product/${productId}`, { headers: { Authorization: `Bearer ${state.token}` } })
            .then(() => {
                console.log("Product deleted successfully!")

                GetDataProduct().then((respon) => setData(respon))
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            })
    }

    const hendleSearch = async () => {
        setData(await GetDataProduct(search, tag, category))
    }

    const hendleSearchTags = async () => {
        setData(await GetDataProduct(search, tag, category))
    }

    const tombolElektronik = async () => {
        const data = 'Elektronik'

        setCategory(data)

        setData(await GetDataProduct(search, tag, category))
    }

    const tombolFesion = async () => {
        const data = 'Fesion'

        setCategory(data)

        setData(await GetDataProduct(search, tag, category))
    }

    const tombolFood = async () => {
        const data = 'Food'

        setCategory(data)

        setData(await GetDataProduct(search, tag, category))
    }

    return (
        <div className={hompages.container}>
            <div>
                <div className={hompages.input}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="search"
                            placeholder="Mencari Product"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button className={hompages.btn_1} id="button-addon2" onClick={hendleSearch}>
                            Cari
                        </Button>
                    </InputGroup>
                </div>
                <div>
                    <Row className="g-2">
                        <Col md>
                            <form>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="search"
                                        placeholder="Mencari berdasarkan tags"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                    />
                                    <Button className={hompages.btn_1} id="button-addon2" onClick={hendleSearchTags}>
                                        Tags
                                    </Button>
                                </InputGroup>
                            </form>
                        </Col>
                        <Col md>
                            <Button className={hompages.btn_1} id="button-addon2" onClick={tombolElektronik}> Elektonik </Button>
                            <Button className={hompages.btn_1} id="button-addon2" onClick={tombolFesion}> Fesion </Button>
                            <Button className={hompages.btn_1} id="button-addon2" onClick={tombolFood}> Food </Button>
                        </Col>
                    </Row>

                </div>
            </div>
            <div className={hompages.container2}>
                {
                    data.map((index) => {
                        return (
                            <div key={index._id} className={hompages.product}>
                                < div >
                                    <img alt="iamge product" src={index.image} className={hompages.img} />
                                </div >
                                <div>
                                    <h3>{index.name}</h3>
                                    <p className={hompages.p}>{index.price}</p>
                                    <Link to={`/product_detail/${index._id}`} className={hompages.beli}>BELI</Link>
                                </div>
                                {state.role === 'admin' &&
                                    (
                                        <div className={hompages.btn5}><Link className={hompages.delete} onClick={() => hendleDeleteProduct(index._id)}>DELETE</Link></div>
                                    )
                                }
                                {
                                    state.role === 'admin' &&
                                    (
                                        <div className={hompages.btn5}><Link className={hompages.update} to={`/product_update/${index._id}`}>UPDATE</Link></div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Hompages

