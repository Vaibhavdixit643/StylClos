import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import productService from '../../Services/product.service';
import sellerService from "../../Services/seller.service";

function getLocalItems() {
    let list = JSON.parse(sessionStorage.getItem('user'));

    if (list)
        return list;
    else
        return null;
}

const Editproduct = () => {

    let { id } = useParams();

    let [ product, setProduct ] = useState([]);

    let [user] = useState(getLocalItems());
    let nav = useNavigate();

    let formData = new FormData();

    let [title, setTitle] = useState(null);
    let [category, setCategory] = useState(null);
    let [type, setType] = useState(null);
    let [size, setSize] = useState(null);
    let [qty, setQty] = useState(null);
    let [price, setPrice] = useState(null);
    let [email] = useState((user) ? user.email : null);
    let [allCategories, setAllCategories] = useState(null);
    let [allType, setAllType] = useState(null);
    // let [ proDtls ] = useState(getProductDetails()); 
    let [ imagePrev, setImagePrev ] = useState(null);

    useEffect(() => {
        productService.getProductById(id)
            .then(response => {
                product = (response.data);
                console.log(product.quantity);
                imagePrev = (product.imgData);
                setTitle(product.title);
                setCategory(product.category.id);
                setType(product.type.id);
                setQty(product.quantity);
                setPrice(product.price);
                setSize(product.size);
            })
            .catch(err => {
                console.log("error while edit product in seller : " + err);
            });

            productService.getAllCategories()
            .then(response => {
                console.log(response.data);
                setAllCategories(response.data);
            })
            .catch(err => {
                console.log(err);
            });

        
    }, [])

    const toHome = () => {
        nav('/seller/home');
    }
 
    const onSubmitProduct = (e) => {
        e.preventDefault();
        let updateProduct = { id, title, category, type, size, qty, price };

        console.log("Stringify details of product : " + JSON.stringify(updateProduct));
        formData.append('updateProduct', JSON.stringify(updateProduct));

        console.log("productData : " + formData);

        sellerService.updateProductDetails(formData)
            .then(response => {
                console.log("onsubmit : " + response.data);
                if(response.data == false) {
                    alert("PRODUCT FAILED TO ADD");
                    window.location.reload();
                }
                if(response.data) {
                    nav("/seller/home");
                }
            })
            .catch(err => {
                console.log("Error while add new product : ",err);
            });

        }

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        
        if (e.target && e.target.files[0]) {
            formData.append('imageData', e.target.files[0]);

            
        }
    }

    const getAllTypeInCat = (e) => {
        if (e == null)
            return null;
        console.log("in getAllTypeInCat : " + e);

        setCategory(e);

        productService.getAllTypesinCategory(e)
            .then(response => {
                console.log(response.data);
                setAllType(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const Category = (data) => {
        return (<>
            {data.map(d => console.log("in category : " + d.id))}
            <select value={category} className="form-control" onChange={(e) => getAllTypeInCat(e.target.value)}>
                <option value={null}>--- select category ---</option>
                {
                    (data != null) ?
                        data.map(d =>
                            <option value={d.id} >{d.category}</option>
                        )
                        :
                        null
                }
            </select>
        </>);
    }

    const Type = (data) => {

        return (<>
            {console.log(data)}

            <select name='type' value={type} className="form-control" onChange={(e) => setType(e.target.value)}>
                <option >--- select type ---</option>
                {
                    allType ?
                        allType.map(d =>
                            <option value={d.id}>{d.typeName}</option>
                        )
                        :
                        null
                }
            </select>
        </>);
    }

    return (<>
        <section className="vh-10" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-50">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <fieldset style={{ padding: "20px" }}>
                                <legend align="center">EDIT PRODUCT</legend>
                                {/* <form onSubmit={onSubmitProduct}> */}
                                <form>
                                    {/* PRODUCT NAME */}
                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputEmail1">Product name</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" autoFocus />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Product Category</label>
                                        {
                                            (allCategories) ?
                                                Category(allCategories)
                                                :
                                                <select className="form-control">
                                                    <option>--- select Category ---</option>
                                                </select>
                                        }
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Product Type</label>
                                        {
                                            allType ?
                                                Type(allType)
                                                :
                                                <select className="form-control">
                                                    <option>--- select type ---</option>
                                                </select>
                                        }
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Product Size</label>
                                        <input name='size' type="text" value={size} onChange={(e) => setSize(e.target.value)} className="form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Product Quantity</label>
                                        <input name = 'qty' type="text" value={qty} onChange={(e) => setQty(e.target.value)} className="form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Product Price</label>
                                        <input name='price' type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Product Image</label>
                                        <input type="file" onChange={onFileChange} accept="image/*" className="form-control" required /> <br/>
                                        {/* <center><img src={imagePrev} alt="" width={"100px"} height={"100px"} /></center> */}
                                    </div>

                                    <center>
                                    <button type="submit" onClick={onSubmitProduct} className="btn btn-primary profile-button">Submit</button>&emsp;
                                    <button onClick={toHome} className="btn btn-primary cancel-button" > Cancel </button>
                                    </center>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);

}

export default Editproduct;