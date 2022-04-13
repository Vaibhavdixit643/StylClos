import { useEffect, useState } from "react";
import productService from "../../Services/product.service";

const Productlist = () => {

    let [products, setProducts] = useState([]);

    useEffect(() => {
        // ALL PRODUCTS DETAILS
        productService.getAll()
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => {
                console.log("Error while retreiving list of products : ", err);
            });
    }, [])

    // DELETES INAPROPRIATE PRODUCTS FROM LIST OF PRODUCTS
    let [status] = useState(false);
    let productId;
    async function deleteSellerProduct(productId) {
        productService.deleteProductById(productId)
            .then(response => {
                if (response.data) {
                    status = true;
                    console.log("Deleted Product successfully : " + status);
                }
                else {
                    status = false;
                    console.log(" Unsuccessful to delete product : " + status);
                }
            })
            .catch(err => {
                console.log("Error while deleting seller product : " + err);
            });

        return status;
    }

    const handleDeleteProduct = (productId) => {
        status = false;
        setProducts(product => {
            products.map((item) => {
                if (productId === item.id) {
                    status = deleteSellerProduct(item.id);
                    window.location.reload();
                }
                else
                    return item;
            })
        })
    }
    return (<>
        <div style={{ paddingLeft: "100px", paddingRight: "100px" }} className='d-flex align-items-center'>
            <div className='container-fluid nav_bg'>
                <table className="table table-hover" style={{ marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col" align="center">Size</th>
                            <th scope="col" align="center">Price</th>
                            <th scope="col" align="center">Quantity</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products ?
                                products.map(
                                    product =>
                                        <tr key={product.id}>
                                            <td>{product.title}</td>
                                            <td>
                                                <img src={`data:${product.imgType};base64,${product.imgData}`} alt={product.image} width="150px" height="150px" />
                                            </td>
                                            <td align="left">{product.size}</td>
                                            <td align="left">&#x20B9;&nbsp;{product.price}</td>
                                            <td align="left">{product.quantity}</td>
                                            <td>
                                                <div>
                                                    <button className="btn btn-primary" onClick={() => handleDeleteProduct(product.id)} style={{ backgroundColor: "red", marginBottom: "10px" }}>
                                                        <i className='far fa-trash-alt' style={{ fontSize: '18px', color: 'white' }} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                )
                                :
                                <tr>
                                    <td colSpan={5} align="center">NO PRODUCTS ADDED TO SELL.</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}

export default Productlist;