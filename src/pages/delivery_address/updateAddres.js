import React, { useState, useContext } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import addressStyle from './address.module.css'

import { AutContext } from "../../router";

const UpdateAddres = () => {
    const { state } = useContext(AutContext)
    const { id } = useParams()
    const [name, setName] = useState('')
    const [kelurahan, setKelurahan] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kabupaten, setKabupaten] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [detail, setDetail] = useState('')
    const navigate = useNavigate()

    const hendleUpdateAddress = (e) => {
        e.preventDefault()

        if (!name || !kelurahan || !kecamatan || !kabupaten || !provinsi || !detail) {
            alert("Please fill in all fields before updating the address.");
            return;
        }

        const dataUpdateAddress = { name, kelurahan, kecamatan, kabupaten, provinsi, detail }

        axios.put(`http://localhost:3000/address/${id}`, dataUpdateAddress, { headers: { Authorization: `Bearer ${state.token}` } })
            .then(() => {
                navigate('/address')
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <div className={addressStyle.container}>
            <h1 className={addressStyle.judul}>Delivery Address</h1>
            <Form onSubmit={hendleUpdateAddress} >
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name"
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Alamat Desa</Form.Label>
                        <Form.Control type="text" placeholder="Masukan Alamat Desa"
                            value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Kecamatan</Form.Label>
                        <Form.Control type="text" placeholder="Masukan Kecamatan"
                            value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Kabupaten</Form.Label>
                        <Form.Control type="text" placeholder="Masukan Kabupaten"
                            value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Provinsi</Form.Label>
                    <Form.Control type="text" placeholder="Masukan Provinsi"
                        value={provinsi} onChange={(e) => setProvinsi(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Alamat detail</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Masukan Alamat Detail"
                        value={detail} onChange={(e) => setDetail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </div>
    )
}

export default UpdateAddres