import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import customerService from "../../Services/customer.service";
import './navbar.css';
// import { Changelogin } from "./Changelogin";

const getLocalItems = () => {
    let list = sessionStorage.getItem('user');
    console.log("Changelogin : " + list);
    if (list)
        return JSON.parse(list);
    else
        return null;
}

let count = 0;

let activeStyle = {
    borderBottom: '1px solid #565387',
    textDecoration: "none",
    color: '#3498ab'
};

let inactiveStyle = {
    textDecoration: "none",
}

const user = getLocalItems();

const NavbarComp = () => {

    useEffect(() => {
        if (user)
            customerService.cartItemCount(user.id)
                .then(response => {
                    count = response.data;
                    console.log("count : " + count);
                })
                .catch(err => {
                    console.log("Error in Navbar while for cart items : " + err);
                })
    }, [])


    const [show, setShow] = useState(false);

    return (
        <>
            <section className="navbar-bg">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container ">
                        <a className="navbar-brand" href="#">StylClos</a>
                        <button
                            className="navbar-toggler"
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"
                            onClick={() => setShow(!show)} >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* <div style={{position: "relative"}}>
                            <form className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <input className="form-control1 me-2" type="search" style={{paddingLeft: "20px"}} placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline" type="submit">
                                    <i className="fas fa-search fa-1.5x"></i>
                                </button>
                            </form>
                        </div>
                         */}
                        <div className={`collapse navbar-collapse ${show ? "show" : ""}`} id="navbarSupportedContent">

                            {/* <Changelogin /> */}

                            {
                                (user == null) ? (<AnoynmousUser />)
                                    : (user.role == 'ADMIN') ? <AfterAdminLogin />
                                        : (user.role == 'SELLER') ? <AfterSellerLogin />
                                            : <AfterCustomerLogin />

                            }


                        </div>
                    </div>
                </nav>
            </section>
        </>

    );
}


const User = () => {

    return (<>
        <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to='/Home'>
            <li className="nav-item">
                <center><i className="fa fa-home" style={{ fontSize: "24px" }} /> </center>
                Home
            </li>
        </NavLink>

        <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to='/Womens'>
            <li className="nav-item">
                <center><i className="fa fa-female" style={{ fontSize: "24px" }} /></center>
                Womens
            </li>
        </NavLink>

        <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to='/Mens'>
            <li className="nav-item">
                <center><i className="fa fa-male" style={{ fontSize: "24px" }} /></center>
                Mens
            </li>
        </NavLink>

        <NavLink to={'/cart'} style={{ textDecoration: 'none' }}>
            <li className="nav-item">
                <span>
                    <center><i className="fas fa-shopping-cart" style={{ fontSize: "20px" }} /></center>
                    {/*
                        user ?
                            <>
                                {console.log("Count from navbar")}
                                <p className="cartNumber">{count}</p>
                            </>
                            :
                            null
                    */}
                    {/* <p className="cartNumber">{count}</p> */}
                    Cart
                </span>
            </li>
        </NavLink>

        <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to='/profile'>
                <span className="hidden-xs">
                    <center><i className="fa fa-user-circle" style={{ fontSize: "24px" }} /></center>
                    Profile
                </span>
            </Link>
        </li>
    </>);
}

const AnoynmousUser = () => {
    return (<>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <User />

            <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to={'/seller/login'}>
                <li className="nav-item">
                    <span>
                        <center><i className='fas fa-wallet' style={{ fontSize: '18px', paddingBottom: "0px" }} /></center>
                        Sell with us
                    </span>
                </li>
            </NavLink>
        </ul>
    </>);
}

const AfterCustomerLogin = () => {
    return (<>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <User />

            <li className="nav-item">
                <Link style={{ textDecoration: 'none' }} to='/logout'>
                    {/* <i className="fa fa-sign-out" style={{fontSize:"24px", color:"red"}} /><br /> */}
                    <span className="hidden-xs">
                        <center><i className="fa fa-power-off" /></center>
                        Logout
                    </span>
                </Link>
            </li>

        </ul>
    </>);
}

const AfterSellerLogin = () => {
    return (<>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to='/seller/Home'>
                <li className="nav-item">
                    <center><i className="fa fa-home" style={{ fontSize: "24px" }} /></center>
                    Home
                </li>
            </NavLink>
            <li>
                <Link style={{ textDecoration: 'none' }} to='/seller/profile'>
                    <i className="fa fa-user-circle" style={{ fontSize: "24px" }} /><br />
                    <span className="hidden-xs">Profile</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link style={{ textDecoration: 'none' }} to='/logout'>
                    <span className="hidden-xs">
                        <center><i className="fa fa-power-off" /></center>
                        Logout
                    </span>
                </Link>
            </li>
        </ul>
    </>);
}

const AfterAdminLogin = () => {
    return (<>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link style={{ textDecoration: 'none' }} to='/admin/home'>
                    <i className="fa fa-home" style={{ fontSize: "24px" }} /> <br />
                    <span className="hidden-xs">Home</span>
                </Link>
            </li>
            <li>
                <Link style={{ textDecoration: 'none' }} to='/admin/profile'>
                    <i className="fa fa-user-circle" style={{ fontSize: "24px" }} /><br />
                    <span className="hidden-xs">Profile</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link style={{ textDecoration: 'none' }} to='/logout'>
                    <span className="hidden-xs">
                        <center><i className="fa fa-power-off" /></center>
                        Logout
                    </span>
                </Link>
            </li>
        </ul>
    </>);
}

export default NavbarComp;