import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import keranjang from './keranjang.module.css'

// import state global
import { AutContext } from "../../router";

const Kranjang = () => {
    const { state } = useContext(AutContext)
    const [getdata, setGetData] = useState([])

    const hendleIncremenQty = (index) => {
        const updatedData = [...getdata]
        if (updatedData[index] && updatedData[index].qty > 0) {
            updatedData[index].qty -= 1;
            setGetData(updatedData);
        }
    }

    const hendleDecrement = (index) => {
        const updatedData = [...getdata]
        updatedData[index].qty += 1
        setGetData(updatedData)
    }

    useEffect(() => {
        axios.get('http://localhost:3000/cart', { headers: { Authorization: `Bearer ${state.token}`, 'Cache-Control': 'no-cache' } })
            .then((respon) => {
                setGetData(respon.data.datas)
            })
            .catch((err) => {
                console.log('ge data error', err)
            })
    }, [])

    console.log(getdata)
    return (
        <div className={keranjang.container}>
            {
                getdata.length > 0 ? (
                    getdata.map((cartItem, index) => {
                        return (
                            <div key={index._id}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>@ Harga</th>
                                            <th>Qty</th>
                                            <th>Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><button className={keranjang.btn3}>X</button></td>
                                            <td><div className={keranjang.product}><img alt="gambar product" src={cartItem.product.image} className={keranjang.img} /><h3>{cartItem.name}</h3></div></td>
                                            <td><p className={keranjang.p}>IDR {cartItem.price}</p></td>
                                            <td>
                                                <button className={keranjang.btn1} onClick={() => hendleIncremenQty(index)}>-</button>
                                                <input type="number" placeholder={cartItem.qty} className={keranjang.input1} readOnly />
                                                <button className={keranjang.btn1} onClick={() => hendleDecrement(index)}>+</button>
                                            </td>
                                            <td><p className={keranjang.p}>IDR {cartItem.price}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })) : (<h1 className={keranjang.pesan}>Anda belum memiliki keranjang Product</h1>)
            }

            <div className={keranjang.container2}>
                <div className={keranjang.total}>
                    <h4 className={keranjang.h4}>TOTAl</h4>
                    <h4 className={keranjang.h4}>IDR 1000.000</h4>
                </div>
                <button className={keranjang.btn4}>Bayar Sekarang</button>
            </div>
        </div>
    )
}

export default Kranjang