import React, { useEffect, useState, useRef } from "react";
import Card from '../Cards/Card';
import './collection.css';
import productService from "../../Services/product.service";

const Collection = () => {

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    let [products, setProducts] = useState(null);

    useEffect(() => {
        productService.getAll()
            .then(response => {
                console.log("Responsed Products Data " + response.data);
                setProducts(response.data);
            })
            .catch(err => {
                console.log("error while getting products data : " + err);
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
            })
    }, [])

    return (<>
        <div className='container-fluid collection'>
            <div className='row'>
                <div className='col-10 mx-auto' style={{ paddingTop: "20px" }}>
                    <center>
                        <h1 style={{ fontWeight: '600' }}>
                            Collections
                        </h1>
                    </center>
                    <div className='col-10 mx-auto'>


                        <div className="collection-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                products ?
                                    products.map((p) => {
                                        return (

                                            <Card key={p.id}
                                                id={p.id}
                                                imgType={p.imgType}
                                                imgsrc={p.imgData}
                                                title={p.category.category + " " + p.type.typeName}
                                                sname={p.title}
                                                link={p.size}
                                                size={p.size}
                                            />
                                        );
                                    })
                                    :
                                    <div className='col-10 mx-auto'>
                                        <div style={{ padding: "50px" }} align="center" >
                                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                        </div>
                                    </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>);

}

export default Collection;