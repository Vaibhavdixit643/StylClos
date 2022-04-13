import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import customerService from "../../Services/customer.service";
import './cart.css';


function getLocalItems() {
    let list = JSON.parse(sessionStorage.getItem('user'));

    if (list)
        return list;
    else
        return null;
}

const Cart = () => {

    let nav = useNavigate();
    let [user] = useState(getLocalItems());
    let [cartItems, setCartItems] = useState([]);
    let [total, setTotal] = useState(0);
    let id = 0;
    let value = 0;
    let status = false;
    let data = { id, value };

    useEffect(() => {
        if (user == null)
            nav('/login');
        customerService.getCartItems((user) ? user.id : null)
            .then(response => {
                setCartItems(response.data);
            })
            .catch(err => {
                console.log("Error while cart data fetch : " + err);
            })
    }, []);

    async function storeUpdatedCart() {
        customerService.updateCartQuantity(data)
            .then(response => {
                status = response.data;
                if (status)
                    console.log("cart item updated successfully");
                else
                    console.log("cart uanble to update");
            })
            .catch(err => {
                console.log("Error while increment cart item : " + err);
            })

        return status;
    }

    async function deleteCart(id) {
        customerService.deleteItemOfCart(id)
            .then(response => {
                status = response.data;
                if (status)
                    console.log("Item deleted from cart " + status);
                else
                    console.log("unable to delete item from cart");
            })
            .catch(err => {
                console.log("Err while deleting Item from cart : " + err);
            })

        return status;
    }

    const handleDelete = (id) => {
        status = false;
        cartItems.map((item) => {
            if (id === item.id) {
                status = deleteCart(id);
                window.location.reload();
            }
        })

    }

    const handleIncrement = (id) => {
        status = false;
        setCartItems(cart =>
            cart.map((item) => {
                if (id === item.id) {
                    if (item.quantity < 10) {
                        data.id = id;
                        data.value = 1;
                        console.log(data);
                        status = storeUpdatedCart();
                        if (status) {
                            console.log("status increment : " + status);
                            return { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) }
                        }
                        else
                            return item;
                    }
                    else
                        return item;
                }
                else
                    return item;
            })
        )
    }

    const handleDecrement = (id) => {
        status = false;
        setCartItems(cart =>
            cart.map((item) => {
                if (id === item.id) {
                    if (item.quantity > 1) {
                        data.id = id;
                        data.value = -1;
                        console.log(data);
                        status = storeUpdatedCart(data);
                        if (status) {
                            console.log("Status in decrement : " + status);
                            return { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
                        }
                        else
                            return item;
                    }
                    else
                        return item;
                }
                else
                    return item;
            })
        )
    }

    return (<>
        <div className='profilepage'>
            <div className="card">
                <div className="row">
                    <div className="col-md-8 cart" style={{ height: "30rem" }}>
                        <div className="title">
                            <div className="row">
                                <div className="col">
                                    <h4><b>Shopping Cart</b></h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">{cartItems.length} items</div>
                            </div>
                        </div>
                        <Scrollbars style={{ width: "500px", height: "250px" }}>
                            {
                                cartItems ?
                                    cartItems.map(
                                        (cart) => {
                                            total += cart.quantity * cart.price;
                                            return (

                                                <div className="row border-top border-bottom" key={cart.id}>

                                                    <div className="row main align-items-center">
                                                        <div className="col-2">
                                                            <img className="cartimg" src={`data:${cart.imgType};base64,${cart.imgData}`} alt={cart.image} />
                                                        </div>
                                                        <div className="col">
                                                            <div className="row text-muted">{cart.type.typeName}</div>
                                                            <div className="row">{cart.title}</div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row text-muted">Size</div>
                                                            <div className="row">{cart.size}</div>
                                                        </div>
                                                        <div className="col">
                                                            <div className='input-group'>
                                                                <button className='cartA' onClick={() => handleDecrement(cart.id)} >-</button>
                                                                <span className='cartA'>{cart.quantity}</span>
                                                                <button className='cartA' onClick={() => handleIncrement(cart.id)} >+</button>
                                                            </div>
                                                        </div>
                                                        <div className="col" style={{ fontWeight: 700 }}>
                                                            &#x20B9; {cart.price * cart.quantity} &nbsp;
                                                            <button className="cartA" onClick={() => handleDelete(cart.id)}>&#10005;</button>
                                                        </div>
                                                    </div>
                                                </div>


                                            );
                                        })
                                    :
                                    <div className="row border-top border-bottom">
                                        <div className="row main align-items-center">
                                            <div className="col-4">
                                                <center><span>NO ITEMS IN CART</span></center>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </Scrollbars>
                        <div className="back-to-shop">
                            <a className='cartA' href="/home" style={{ textDecoration: "none" }}>
                                &#8592; &nbsp;<span className="text-muted">Back to shop</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 summary">
                        <div>
                            <h5><b>Summary</b></h5>
                        </div>

                        <div className="row">
                            <div className="col" style={{ paddingLeft: "0" }}>ITEMS :- {cartItems.length}</div>
                        </div>
                        <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right" style={{ fontWeight: 700 }}>&#x20B9; {total}</div>
                        </div> <button className="checkoutbtn">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Cart;