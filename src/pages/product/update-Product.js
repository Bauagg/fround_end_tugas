import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import css product create
import createStyle from './product-create.module.css'

// import state global
import { AutContext } from '../../router';

const ProductUpdate = () => {
    const { state } = useContext(AutContext)
    const { id } = useParams()
    const [nameProduct, setNameProduct] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [status, setStatus] = useState(false)
    const [image, setImage] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const hendleTags = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTags) => selectedTags !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const hendleUpdateProduct = (e) => {
        e.preventDefault()

        const datas = {
            name: nameProduct,
            descriptions: description,
            stock: parseInt(state),
            price: parseInt(price),
            status: status,
            image: image,
            category: category,
            tag: [...selectedTags]
        }

        axios.put(`http://localhost:3000/product/${id}`, datas, { headers: { Authorization: `Bearer ${state.token}` } })
            .then(() => {
                console.log("Product update successful:");

                navigate('/')
            })
            .catch((err) => {
                console.log("Product update error:", err);
            })
    }

    return (
        <div className={createStyle.container}>
            <div >
                <h1 className={createStyle.judul}>POSTING PRODUCT</h1>
                <div className={createStyle.container2}>
                    <Form onSubmit={hendleUpdateProduct}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name Product</Form.Label>
                                <Form.Control type="text" placeholder="Nama Product"
                                    value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description"
                                    value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Stock Product</Form.Label>
                                <Form.Control type="number" placeholder="Stock Product"
                                    value={stock} onChange={(e) => setStock(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Price Product</Form.Label>
                                <Form.Control type="number" placeholder="Stock Product"
                                    value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Images Product</Form.Label>
                            <Form.Control type="text" placeholder="Url Images"
                                value={image} onChange={(e) => setImage(e.target.value)} />
                        </Form.Group>

                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Tags :</Form.Label>
                                {['digital', 'smartphone', 'laptop', 'jas', 'spatu', 'kemeja', 'roti', 'nasi', 'daging'].map((tag) => (
                                    <Form.Check
                                        inline
                                        key={tag}
                                        label={tag}
                                        type='checkbox'
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => hendleTags(tag)}
                                    />
                                ))}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value='Elektronik'>Elektronik</option>
                                    <option value='Fesion'>Fesion</option>
                                    <option value='Food'>Food</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <fieldset className={createStyle.radios}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={2}>
                                    Radios
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="product ready"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        checked={status === true}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Product is out"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        checked={status === false}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>

                        <Button variant="primary" type="submit">
                            Create Product
                        </Button>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default ProductUpdate