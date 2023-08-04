import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import chekoutStyle from './chekout.module.css'

import { AutContext } from "../../router";

const Chekout = () => {
    const { state } = useContext(AutContext)
    const [getDatas, setGetData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/invoice', { headers: { Authorization: `Bearer ${state.token}` } })
            .then((resoult) => {
                setGetData(resoult.data.datas)
                console.log('get data invoice Success');
            })
            .catch((err) => {
                console.log('error get data invoice', err.message)
            })
    }, [])

    return (
        <div className={chekoutStyle.container}>
            <h1>Invoice</h1>
            {
                getDatas.length === 0 ? (<p>Anda belum memiliki pesanan</p>) : (
                    getDatas.map((index) => {
                        const product = index.products[0] || {}

                        return (
                            <div key={index._id}>
                                <div className={chekoutStyle.container2}>
                                    <table>
                                        <thead>
                                            <tr className={chekoutStyle.tr}>
                                                <th className={chekoutStyle.th}>No Resi</th>
                                                <th className={chekoutStyle.th}>Product</th>
                                                <th className={chekoutStyle.th}>Quantity</th>
                                                <th className={chekoutStyle.th}>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className={chekoutStyle.tr}>
                                                <td className={chekoutStyle.td}>{index.invoiceNumber}</td>
                                                <td className={chekoutStyle.td}>
                                                    {/* <img alt="image product" /> */}
                                                    <h4>{product.name}</h4>
                                                    <h6>Description</h6>
                                                    <p>{product.description}</p>
                                                </td>
                                                <td>{index.carts.qty}</td>
                                                <td>RP {product.price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={chekoutStyle.container3}>
                                    <h4>Address</h4>
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className={chekoutStyle.th2}>Alamat Desa</th>
                                                    <th className={chekoutStyle.th2}>Kecamatan</th>
                                                    <th className={chekoutStyle.th2}>Kabupaten</th>
                                                    <th className={chekoutStyle.th2}>Provinsi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className={chekoutStyle.tr}>
                                                    <td className={chekoutStyle.td}>{index.address.kelurahan}</td>
                                                    <td className={chekoutStyle.td}>{index.address.kecamatan}</td>
                                                    <td className={chekoutStyle.td}>{index.address.kabupaten}</td>
                                                    <td className={chekoutStyle.td}>{index.address.provinsi}</td>
                                                </tr >
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <h6>Address Detail</h6>
                                        <p>Name {index.address.name} </p>
                                        <p>{index.address.detail}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }

        </div>
    )
}

export default Chekout