import React from "react";
import { Route, Routes } from "react-router-dom";

// import componen
import Navbar from "../componen/navbar/navbar";

// import pages
import Hompages from "../pages/hompages/hompages";
import Chekout from "../pages/chekout/chekout";
import Kranjang from "../pages/keranjang/keranjang";
import ProductDetail from "../pages/product-detail/product-detail";
import Product from "../pages/product/product";
import Tentang from "../pages/tentang/tentang";
import Transaksi from "../pages/transaksi/transaksi";
import Login from "../pages/login/login";
import Register from "../pages/register/register";

const RouterIndex = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" exact Component={Hompages} />
                <Route path="/chekout" Component={Chekout} />
                <Route path="/kranjang" Component={Kranjang} />
                <Route path="/product_detail" Component={ProductDetail} />
                <Route path="/product" Component={Product} />
                <Route path="/tentang" Component={Tentang} />
                <Route path="/transaksi" Component={Transaksi} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
            </Routes>
        </div>
    )
}

export default RouterIndex