import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customerService from "../../Services/customer.service";
// import ProductDetailedPage from './ProductDetailedPage';
import './cards.css';

function getLocalItems() {
    let list = JSON.parse(sessionStorage.getItem('user'));

    if (list)
        return list;
    else
        return null;
}

const Card = (props) => {

    let [user] = useState(getLocalItems());

    let [addItem] = useState();

    let [size] = useState(props.size);

    let [qty] = useState(1);

    let [userId] = useState((user) ? user.id : null);

    let [proId] = useState(props.id);

    let [checkCart, setCheckCart] = useState(false);

    let nav = useNavigate();

    useEffect(() => {

        if (user) {
            customerService.checkItemInCart(props.id, user.id)
                .then(response => {
                    if (response.data)
                        setCheckCart(true);
                })
                .catch(error => {
                    console.log("Error while checking items in cart : " + error);
                })
        }

    }, [])

    function AddToCart(id) {
        console.log("Cards user details : " + (user == null));
        if (user == null)
            nav("/login");

        else {
            addItem = { size, qty, userId, proId };
            console.log("addItem : " + addItem);
            customerService.addCartItems(addItem)
                .then(response => {
                    if (response.data)
                        console.log("Product added to cart");
                    else
                        console.log("Unable to add to cart");
                })
                .catch(error => {
                    console.log("Error while adding to cart : " + error);
                })

            setCheckCart(true);
        }
    }

    return (
        <>

            <div className="cards">
                <Link style={{textDecoration: "none"}} to={'/ProductDetailedPage/' + props.id}>
                    <div className="card_image">
                        <img src={`data:${props.imgType};base64,${props.imgsrc}`} height={400} width={200} alt="loading failed" />
                    </div>
                    <div className="card_title">
                        <span className="card_category">{props.title}</span>
                    </div>
                </Link>
                <div className="card_info">
                    <h3 className="card_name">{props.sname}</h3>
                    <Link to={'/checkout'}>
                        <button className="card_btn"><i className="fas fa-money-bill-wave-alt" /> BUY NOW </button>
                    </Link>
                    {
                        checkCart ?
                            <Link to={'/cart'}>
                                <button className="card_cart_btn"><i className="fas fa-shopping-cart" /> GO TO CART </button>
                            </Link>
                            :
                            <button className="card_cart_btn" onClick={() => AddToCart(props.id)}><i className="fas fa-cart-plus" /> ADD CART </button>
                    }
                </div>
            </div>

        </>
    );
}

export default Card;