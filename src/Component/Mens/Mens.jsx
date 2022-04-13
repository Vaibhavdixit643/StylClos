import React, { useState, useEffect, useRef } from 'react';
import productService from '../../Services/product.service';
import Card from '../Cards/Card';

function Mens() {

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    let [products, setProducts] = useState(null);

    useEffect(() => {
        productService.getProductsByCategory('MENS')
            .then(response => {
                setProducts(response.data);
                console.log("products fetched : ", products);
            })
            .catch(err => {
                console.log("error while getting product by Mens Category : " + err);
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
        {/* <h1>We are in Mens Collection</h1> */}
        <div className='container-fluid collection'>
            <div className='row'>
                <div className='col-10 mx-auto'>
                    <h1 style={{ textAlign: 'center' }}>
                        Fashion for Mens</h1>
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
                                <div className='col-10 mx-auto' align='center' style={{padding : "50px"}} >
                                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    </>);
}

export default Mens;