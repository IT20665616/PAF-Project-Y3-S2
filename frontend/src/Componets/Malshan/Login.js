import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";


function Login() {

    const [email, setEmail] = useState("");
    const [pw, setPassword] = useState("");
    const [uerId, setUserId] = useState("");
    const [user, setUser] = useState("");


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSearchClick = () => {
        axios
            .get(`http://localhost:8080/users/userProfile?email=${email}&password=${pw}`)
            .then((response) => {
                if (response.data) {
                    console.log(response.data)
                    setUser(response.data);
                    sessionStorage.setItem('username', response.data.username);
                    sessionStorage.setItem('userID', response.data.id);
                    window.location.replace("http://localhost:3000/home");
                }
                else {
                    swal({
                        title: "Error!",
                        text: "User not fount. Make sure your email and password is correct",
                        type: "error",
                    });
                }

            })
            .catch((error) => {
                swal({
                    title: "Error!",
                    text: error,
                    type: "error",
                });
            });
    };

    return (
        <>

            <div className="wrapper">
                <div class="container" style={{ paddingTop: "90px", paddingBottom: "95px", paddingLeft: "auto", paddingRight: "auto", alignSelf: "center" }}>
                    <div id="wizard" style={{ height: "76vh", width: "70%" }}>
                        <section>
                            <h1 style={{ fontFamily: "Arial Rounded MT Bold", fontSize: "70px" }}>Influenzer</h1>
                            <h3>Log In</h3>


                            <div class="form-group">
                                <div class="row mt-5">
                                    <div class="col-5">
                                        <label for="code">Email</label>
                                    </div>

                                    <div class="col-6">
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="phone1"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="row mt-5">
                                    <div class="col-5">
                                        <label for="price">Password</label>
                                    </div>
                                    <div class="col-6">
                                        <input
                                            type="password"
                                            class="form-control"
                                            value={pw}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div className='col-7'>
                                    <button type="submit" onClick={handleSearchClick} className='btn btn-primary'>Log In</button>
                                    <h6><b>Do not have an account ?</b> &nbsp; <span><Link to={`/signup`}>Sign up</Link></span> </h6>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;