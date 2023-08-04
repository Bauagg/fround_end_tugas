import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import keranjang from './keranjang.module.css'

// import state global
import { AutContext } from "../../router";
import { useNavigate } from "react-router-dom";

const Kranjang = () => {
    const { state } = useContext(AutContext)
    const [getdata, setGetData] = useState([])
    const [getAddress, setGetAddress] = useState([])
    const navigate = useNavigate()

    const hendleIncremenQty = (index) => {
        const updatedData = [...getdata]
        if (updatedData[index] && updatedData[index].qty > 0) {
            updatedData[index].qty -= 1;
            setGetData(updatedData)
            updateQtyInCart(updatedData[index]._id, updatedData[index].qty)

        }
    }

    const hendleDecrement = (index) => {
        const updatedData = [...getdata]
        updatedData[index].qty += 1
        setGetData(updatedData)
        updateQtyInCart(updatedData[index]._id, updatedData[index].qty)
    }

    const updateQtyInCart = (id, qty) => {
        axios.put(`http://localhost:3000/cart/${id}`, { qty }, { headers: { Authorization: `Bearer ${state.token}` } })
            .then((respon) => {
                console.log("Quantity updated successfully:", respon.data);
            })
            .catch((err) => {
                console.log('Failed to update quantity:', err.message);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:3000/cart', { headers: { Authorization: `Bearer ${state.token}`, 'Cache-Control': 'no-cache' } })
            .then((respon) => {
                setGetData(respon.data.datas)
            })
            .catch((err) => {
                console.log('ge data error', err)
            })

        axios.get('http://localhost:3000/address', { headers: { Authorization: `Bearer ${state.token}` } })
            .then((resoult) => {
                setGetAddress(resoult.data.datas)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [])

    const hendleDeleteCart = (id) => {
        axios.delete(`http://localhost:3000/cart/${id}`, { headers: { Authorization: `Bearer ${state.token}` } })
            .then(() => {
                const updatedData = getdata.filter((item) => item._id !== id);
                setGetData(updatedData);
            })
            .catch((err) => {
                console.log('delete data error', err.message)
            })
    }

    const hendleCreateInvoice = (cartId) => {

        const items = {
            cartId: cartId,
            addressId: getAddress[0]._id
        }

        axios.post('http://localhost:3000/invoice', items, { headers: { Authorization: `Bearer ${state.token}` } })
            .then((resoult) => {
                console.log('create data invoice success', resoult.data)

                navigate('/chekout')
            })
            .catch((err) => {
                console.log('create invalid', err.message)
            })
    }

    return (
        <div className={keranjang.container}>
            {
                getdata.length > 0 ? (
                    getdata.map((cartItem, index) => {
                        const product = cartItem.product[0] || {}

                        return (
                            <div key={cartItem._id}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>@ Harga</th>
                                            <th>Qty</th>
                                            <th>Jumlah</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><button className={keranjang.btn3} onClick={() => hendleDeleteCart(cartItem._id)}>X</button></td>
                                            <td><div className={keranjang.product}><img alt="gambar product" src={product.image} className={keranjang.img} /><h3>{product.name}</h3></div></td>
                                            <td><p className={keranjang.p}>IDR {product.price}</p></td>
                                            <td>
                                                <button className={keranjang.btn1} onClick={() => hendleIncremenQty(index)}>-</button>
                                                <input type="number" placeholder={cartItem.qty} className={keranjang.input1} readOnly />
                                                <button className={keranjang.btn1} onClick={() => hendleDecrement(index)}>+</button>
                                            </td>
                                            <td><p className={keranjang.p}>IDR {product.price}</p></td>
                                            <td><button onClick={() => hendleCreateInvoice(cartItem._id)}>Buy</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        )
                    })) : (<h1 className={keranjang.pesan}>Anda belum memiliki keranjang Product</h1>)
            }
        </div>
    )
}

export default Kranjang