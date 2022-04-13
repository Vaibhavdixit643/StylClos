import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';


const Footer = () => {
    return (
        <>
            <section>
                <FooterContainer className='main-footer'>
                    <div className='footer-middle'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-3 col-sm-6'>
                                    {/* Column 1 */}
                                    <h4>Category</h4>
                                    <ul className='list-unstyled'>
                                        <li><a href='/Mens'>Mens</a></li>
                                        <li><a href='/Womens'>Womens</a></li>
                                    </ul>
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    {/* Column 2 */}
                                    <h4>Company</h4>
                                    <ul className='list-unstyled'>
                                        <li><a href='/admin'>Admin Login</a></li>
                                        <li><a href='/Aboutus'>About Us</a></li>
                                        <li><a href='/Contactus'>Contact Us</a></li>
                                        <li><a href='/faq'>FAQ's</a></li>
                                    </ul>
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    {/* Column 3 */}
                                    <h4>Policy Info</h4>
                                    <ul className='list-unstyled'>
                                        <li><a href='/termsandcondition'>Terms & Conditions</a></li>
                                        <li><a href='/ship-delivery'>Shipping & Delivery</a></li>
                                        <li><a href='/refunds-returns'>Refunds & Returns</a></li>
                                        <li><a href='/privacy-policy'>Privacy Policy</a></li>
                                    </ul>
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    {/* Column 4 */}
                                    <h4>Like Being First ?</h4>
                                    <ul className='list-unstyled'>
                                        <li>Sign up for our newsletter and get 10% off on your first order!</li>
                                        <Link style={{ textDecoration: 'none' }} to='/Signup'>
                                            <button className="checkoutbtn">Sign up</button>
                                        </Link>
                                    </ul>
                                </div>
                            </div>

                            {/* Footer Bottom */}
                            <div className='footer-bottom'>
                                <p className='text-xs-center'>
                                    &copy;{new Date().getFullYear()} StylClos - All Rights Resvered
                                </p>
                            </div>
                        </div>
                    </div>
                </FooterContainer>
            </section>
        </>

    )
}

export default Footer;

const FooterContainer = styled.footer`
    .main-footer {
        bottom: 0;
        top: 10rem;
    }

    .footer-middle {
        background: var(--mainDark);
        padding-top: 3rem;
        color: var(--mainWhite);
    }

    .footer-bottom {
        padding-top: 3rem;
        padding-bottom: 2rem;
    }

    ul li a {
        color: var(--mainLightGrey);
        text-decoration: none;
    }

    ul li a:hover {
        color: var(--mainWhite);
    }
`;