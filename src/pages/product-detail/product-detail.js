import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

// import hompage.css
import productDetail from './product-detail.module.css'

// import state global
import { AutContext } from "../../router";

const ProductDetail = () => {
    const { id } = useParams()
    const { state } = useContext(AutContext)
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const getProductById = async () => {
            try {
                const resoult = await axios.get(`http://localhost:3000/product/${id}`)
                setProduct(resoult.data)
            } catch (error) {
                console.log(error)
            }
        }

        getProductById()
    }, [id])
    console.log(id)
    console.log(product)

    if (product === null) {
        return <div><Spinner animation="border" variant="primary" /></div>;
    }

    const hendelDEcrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }
    const hendleIngcremen = () => {
        setQuantity(quantity + 1)
    }

    const hendleAddToCart = () => {
        const cartItem = {
            product: {
                id: product._id
            },
            qty: quantity
        }

        const putDataCart = {
            items: [cartItem]
        }

        axios.put('http://localhost:3000/cart', putDataCart, { headers: { Authorization: `Bearer ${state.token}` } })

            .then(() => {

                navigate('/kranjang')
            })
            .catch((err) => {
                console.log("Gagal menambahkan produk ke keranjang:", err)
            })
    }

    return (
        <div className={productDetail.container}>
            <div>
                <div>
                    <div className={productDetail.detail}>
                        <img alt="image product" src={product.image} className={productDetail.img} />
                    </div>
                    <div>
                        <div className={productDetail.container2}>
                            <h2>{product.name}</h2>
                            <h3 className={productDetail.h3}>{product.price}</h3>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Category</td>
                                            <td className={productDetail.td}>{product.category.name}</td>
                                        </tr >
                                        <tr>
                                            <td>Description</td>
                                            <td className={productDetail.td}>{product.descriptions}</td>
                                        </tr>
                                    </tbody >
                                </table >
                            </div >
                            <div className={productDetail.btn_group}>
                                <div>
                                    <button className={productDetail.btn1} onClick={hendelDEcrement}>-</button>
                                    <input type="number" placeholder="0" className={productDetail.input1} value={quantity} readOnly />
                                    <button className={productDetail.btn1} onClick={hendleIngcremen}>+</button>
                                </div>
                                <div>
                                    <button className={productDetail.btn2} onClick={hendleAddToCart}>
                                        <AiOutlineShoppingCart className={productDetail.icons} /> Tambah ke keranjang</button>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
                <div className={productDetail.text}>
                    <h3>Product Invormation</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,</p>
                </div>
            </div >
        </div >
    )
}

export default ProductDetail
