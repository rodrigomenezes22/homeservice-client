import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Pricing() {
    return (
        <div id="generic_price_table" className="pb-5">
            <Container>
                <div className ="container">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="price-heading  text-dark">
                                <h1 className="trykker font-primary h1 mt-5 mb-0"> Pricing </h1>
                                <p className="price-text text-dark"> Choose the pricing that suits your business needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">

                    <div className="row">
                        <div className="col-md-4">


                            <div className="generic_content clearfix">


                                <div className="generic_head_price clearfix">


                                    <div className="generic_head_content clearfix">


                                        <div className="head_bg"></div>
                                        <div className="head">
                                            <span>Basic</span>
                                        </div>


                                    </div>

                                    <div className="generic_price_tag clearfix">
                                        <span className="price">
                                            <span className="sign">€</span>
                                            <span className="currency">0</span>
                                            <span className="cent">.00</span>
                                            <span className="month">Free/MON</span>
                                        </span>
                                    </div>


                                </div>

                                <div class="generic_feature_list">
                                    <ul>
                                        <li>Limited Access</li>
                                        <li>View Task</li>
                                        <li>View Service Provider</li>
                                        <li>Search Service Provider</li>
                                        <li>Email Support</li>
                                        

                                    </ul>
                                </div>

                                <div className="generic_price_btn clearfix">
                                    <Link to="/register-service">Sign up</Link>
                                </div>


                            </div>


                        </div>

                        <div className="col-md-4">


                            <div className="generic_content active clearfix">

                                <div className="generic_head_price clearfix">


                                    <div className="generic_head_content clearfix">


                                        <div className="head_bg"></div>
                                        <div className="head">
                                            <span>Standard</span>
                                        </div>


                                    </div>

                                    <div className="generic_price_tag clearfix">
                                        <span className="price">
                                            <span className="sign">€</span>
                                            <span className="currency">9</span>
                                            <span className="cent">.99</span>
                                            <span className="month">/MON</span>
                                        </span>
                                    </div>


                                </div>

                                <div className="generic_feature_list">
                                    <ul>
                                        <li>Unlimited Access</li>
                                        <li><span>10 </span>Credits</li>
                                        <li><span>10 </span> Quotes Allowed</li>
                                        <li><span> </span>View approved contacts</li>
                                        <li><span>24/7 </span>Email Support</li>
                                        
                                    </ul>
                                </div>

                                <div className="generic_price_btn clearfix">
                                    <Link to="/register-service" className="">Sign up</Link>
                                </div>

                            </div>


                        </div>
                        <div className="col-md-4">


                            <div className="generic_content clearfix">


                                <div className="generic_head_price clearfix">


                                    <div className="generic_head_content clearfix">


                                        <div className="head_bg"></div>
                                        <div className="head">
                                            <span>Premium</span>
                                        </div>

                                    </div>

                                    <div className="generic_price_tag clearfix">
                                        <span className="price">
                                            <span className="sign">€</span>
                                            <span className="currency">19</span>
                                            <span className="cent">.99</span>
                                            <span className="month">/MON</span>
                                        </span>
                                    </div>

                                </div>

                                <div className="generic_feature_list">
                                    <ul>
                                        <li>Unlimited Access</li>
                                        <li><span>20 </span>Credits</li>
                                        <li><span>20 </span> Quotes Allowed</li>
                                        <li><span> </span>View approved contacts</li>
                                        <li><span>24/7 </span>Priority Email Support</li>
                                        
                                    </ul>
                                </div>

                                <div className="generic_price_btn clearfix">
                                    <Link to="/register-service" >Sign up</Link>
                                </div>


                            </div>


                        </div>
                    </div>


                </div>
            </Container>

        </div>


    )
}
export default Pricing