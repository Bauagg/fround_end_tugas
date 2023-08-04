import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import componen address
import DeliveryAddress from "./adreess";

import addressStyle from './address.module.css'

import { AutContext } from "../../router";

const GetAddress = () => {
    const { state } = useContext(AutContext)
    const [address, setAddress] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/address', { headers: { Authorization: `Bearer ${state.token}` } })
            .then((resoult) => {
                setAddress(resoult.data.datas)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [])

    if (address.length === 0) {
        return <DeliveryAddress />
    }

    return (
        <div className={addressStyle.container}>
            {
                address.map((addressData, index) => {
                    return (
                        <div key={index.id}>
                            <h1 className={addressStyle.judul2}>Address</h1>
                            <div className={addressStyle.container2}>
                                <table className={addressStyle.tabel2}>
                                    <tbody>
                                        <tr>
                                            <td className={addressStyle.tabel}><h5>Name</h5></td>
                                            <td>: {addressData.name}</td>
                                        </tr>
                                        <tr>
                                            <td className={addressStyle.tabel}><h5>Alamat Desa</h5></td>
                                            <td>: {addressData.kelurahan}</td>
                                        </tr>
                                        <tr>
                                            <td className={addressStyle.tabel}><h5>Kecamatan</h5></td>
                                            <td>: {addressData.kecamatan}</td>
                                        </tr>
                                        <tr>
                                            <td className={addressStyle.tabel}><h5>Kabupaten</h5></td>
                                            <td>: {addressData.kabupaten}</td>
                                        </tr>
                                        <tr>
                                            <td className={addressStyle.tabel}><h5>Provinsi</h5></td>
                                            <td>: {addressData.provinsi}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={addressStyle.container3}>
                                <h5>Alamat Detail</h5>
                                <p className={addressStyle.p}>{addressData.detail}</p>
                            </div>
                            <Link to={`/updateAddress/${addressData._id}`} className={addressStyle.link} >Update Address</Link>
                        </div>
                    )
                })}
        </div >
    )
}

export default GetAddress