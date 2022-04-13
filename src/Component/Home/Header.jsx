import React from 'react';
import './home.css';

function Header() {

    return (
        <>
            <header style={{margin: 'auto'}}>
                <section className='container main-hero-container'>
                    <div className='row'>
                        
                        {/*---- Main Header left side ----*/}
                        <div className='col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-items-left rowInfo'>
                            <h1 className='display-2'>
                                Online payment Made <br /> Easy for you.
                            </h1>
                            <p className='main-hero-para'>
                                Lorem ipsum, color sit amet consectetur
                            </p>
                            {/* <h3>Get early access for you</h3>
                            <div className='input-group mt-3'>
                                <input type="text" placeholder='Enter your Email'
                                    className='rounded-pill w-75 me-3 p-2 form-control-text' />
                                <button className='input-group-button'>Get it Now</button>
                            </div> */}
                        </div>

                        {/* ---- Main header right side ---- */}
                        <div className='col-12 col-md-4 col-lg-6 header-right-side d-flex justify-content-center align-items-right'>
                            <img style={{ height: '600px', width: '600px' }} src='images/blackJacket1.jpg' alt='unable to load image' className='img-fluid' />
                        </div>

                    </div>
                </section>
            </header>
        </>
    );

}

export default Header;