import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import hompage.css
import hompages from './hompage.module.css'

// import api
import { GetDataProduct } from "./api";

// import state global
import { AutContext } from "../../router";

const Hompages = () => {
    const { state } = useContext(AutContext)
    const [data, setData] = useState([])

    useEffect(() => {
        GetDataProduct()
            .then((respon) => setData(respon))
    }, [])

    const hendleDeleteProduct = (productId) => {
        axios.delete(`http://localhost:3000/product/${productId}`, { headers: { Authorization: `Bearer ${state.token}` } })
            .then((rsepon) => {
                console.log("Product deleted successfully!")

                GetDataProduct().then((respon) => setData(respon))
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            })
    }

    return (
        <div className={hompages.container}>
            <div>
                <form>
                    <input type="search" placeholder="Cari Product" className={hompages.input} />
                    <button className={hompages.btn_1}>cari</button>
                </form>
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
                                {state.role === 'admin' && (<div className={hompages.btn5}><Link className={hompages.delete} onClick={() => hendleDeleteProduct(index._id)}>DELETE</Link></div>)}
                                <div className={hompages.btn5}><Link className={hompages.update}>UPDATE</Link></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Hompages

