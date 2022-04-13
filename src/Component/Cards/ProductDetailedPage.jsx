import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./productpage.css";
import customerService from '../../Services/customer.service';
import productService from '../../Services/product.service';
import { useParams } from 'react-router-dom';

function getLocalItems() {
    let list = JSON.parse(sessionStorage.getItem('user'));

    if (list)
        return list;
    else
        return null;
}

const ProductDetailedPage = () => {

    let [user] = useState(getLocalItems());

    let { id } = useParams();
    let [product, setProduct] = useState([]);
    let [addItem] = useState();

    let [userId] = useState((user) ? user.id : null);

    let [proId] = useState(id);

    let [checkCart, setCheckCart] = useState(false);

    let nav = useNavigate();

    useEffect(() => {
        console.log("product id : " + id);
        productService.getProductById(id)
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
                console.log("product details : " + product);
            })
            .catch(err => {
                console.log("in err : " + err);
            });

            customerService.checkItemInCart(id, user.id)
                .then(response => {
                    if (response.data)
                        setCheckCart(true);
                })
                .catch(error => {
                    console.log("Error while checking items in cart : " + error);
                })
    }, [])

    let [size] = useState(product.size);

    let [qty] = useState(1);


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
    
    return (<>
        <div className='productpage'>
            <div className="ppcontainer py-4 my-4 mx-auto d-flex flex-column">
                <div className="header">
                    <div className="row r1">
                        <div className="col-md-9 abc">
                            <h1>{(product) ? product.title : "INVALID PRODUCT PAGE"}</h1>
                        </div>
                    </div>
                </div>
                <div className="container-body mt-4">
                    <div className="row r3">
                        <div className="col-md-5 p-0 klo">
                            <ul>
                                <li className='ppli'>100% Quality</li>
                                <li className='ppli'>Free Shipping</li>
                                <li className='ppli'>Easy Returns</li>
                                <li className='ppli'>Normal Delivery : 4-5 Days</li>
                                <li className='ppli'>Express Delivery : 2-3 Days</li>
                                <li className='ppli'>COD Available (All Over India)</li>
                                <li className='ppli'>Size : {product.size}</li>
                            </ul>
                        </div>
                        <div className="col-md-7">
                            <img src={`data:image/jpg;base64,${product.imgData}`} alt={product.name} width="65%" height="75%" /> </div>
                    </div>
                </div>
                <div className="footer d-flex flex-column mt-5">
                    <div className="row r4">
                        <div className="col-md-2 myt des"><a href="#">Description</a></div>
                        <div className="col-md-2 mio offset-md-4">
                        {
                            checkCart ?
                                <Link to={'/cart'}>
                                    <p className='btn btn-outline-warning'> <i className="fas fa-shopping-cart" /> &nbsp; GO TO CART </p>
                                    {/* <button className="card_cart_btn"><i className="fas fa-shopping-cart" /> GO TO CART </button> */}
                                </Link>
                                :
                                    <button className="btn btn-outline-warning" onClick={() => AddToCart(product.id)}>
                                    <i className="fas fa-cart-plus" /> ADD CART </button>
                        }
                        </div>
                        <div className="col-md-2 myt "><button type="button" className="btn btn-outline-warning">
                            <a href="#"><i className='fas fa-money-bill-wave-alt' /> &nbsp; BUY NOW</a>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);

}

export default ProductDetailedPage;