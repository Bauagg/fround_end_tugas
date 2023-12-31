import React, { useReducer, createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// import componen
import Navbar from "../componen/navbar/navbar";

// import pages
import Hompages from "../pages/hompages/hompages";
import Chekout from "../pages/chekout/chekout";
import Kranjang from "../pages/keranjang/keranjang";
import ProductDetail from "../pages/product-detail/product-detail";
import Product from "../pages/product/product";
import ProductUpdate from "../pages/product/update-Product";
import Tentang from "../pages/tentang/tentang";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import GetAddress from "../pages/delivery_address/getAddress";
import UpdateAddres from "../pages/delivery_address/updateAddres";

// Contact
export const AutContext = createContext()

// initalisasi state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    role: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', JSON.stringify(action.payload.token))
            localStorage.setItem('role', JSON.stringify(action.payload.role))

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            }

        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        case "SET_ADDRESSES":
            return {
                ...state,
                addresses: action.payload,
            };

        default: return state
    }
}


const RouterIndex = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const isAuthenticated = () => {
        return state.isAuthenticated;
    };

    const PrivateRoute = ({ element, path }) => {
        if (isAuthenticated()) {
            return element;
        } else {
            return <Navigate to="/login" />;
        }
    };

    return (
        <div>
            <AutContext.Provider value={{ state, dispatch }}>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Hompages />} />
                    <Route exact path="/product_detail/:id" element={<ProductDetail />} />
                    <Route exact path="/product_update/:id" element={<ProductUpdate />} />
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/tentang" element={<Tentang />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/updateAddress/:id" element={<UpdateAddres />} />
                    <Route exact path="/getAddress" element={<GetAddress />} />

                    {/* private Router */}
                    <Route path="/kranjang" element={<PrivateRoute element={<Kranjang />} path="/kranjang" />} />
                    <Route path="/chekout" element={<PrivateRoute element={<Chekout />} path="/chekout" />} />
                    <Route path="/address" element={<PrivateRoute element={<GetAddress />} path="address" />} />
                </Routes>
            </AutContext.Provider>
        </div>
    )
}

export default RouterIndex

