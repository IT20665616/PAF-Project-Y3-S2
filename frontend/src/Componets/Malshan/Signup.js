import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";


function Signup() {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword1] = useState("");
    const [confirmPassword, setPassword2] = useState("");
    const [mobileNo, setmobileNo] = useState("");

    const status = "follow";


    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword1(event.target.value);
        if (event.target.value === confirmPassword) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setPassword2(event.target.value);
        if (event.target.value === password) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    };

    function sendData(e) {
        e.preventDefault();

        if (passwordsMatch) {
            const newUser = {
                username,
                email,
                mobileNo,
                password,
                status
            };


            axios
                .post("http://localhost:8080/users/add", newUser)
                .then((res) => {
                    console.log(res.data);
                    swal({
                        title: "Signed Up Succesfully !",
                        text: "Added Successfully",
                        icon: "success",
                        timer: 2000,
                        button: false,
                    });

                    setTimeout(() => {
                        window.location.replace("http://localhost:3000/");
                    }, 3000);
                })
                .catch((e) => {
                    swal({
                        title: "Error!",
                        text: "Something is off " + e,
                        type: "error",
                    });
                });

        }
        else {
            swal({
                title: "Error!",
                text: "Passwords are not matching",
                type: "error",
            });
        }
    }
    return (
        <>

            <div className="wrapper">
                <form onSubmit={sendData}>
                    <div id="wizard" style={{ height: "auto", width: "70%" }}>
                        <section>
                            <h1 style={{ fontFamily: "Arial Rounded MT Bold", fontSize: "70px" }}>Influenzer</h1>
                            <h3>Sign Up</h3>

                            <div class="form-group">
                                <div className="row mt-5">
                                    <div class="col-5">
                                        <label for="name">User Name
                                        </label>
                                    </div>
                                    <div class="col-6">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Ex: malshan99_"
                                            style={{ textTransform: 'none' }}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="row mt-5">
                                    <div class="col-5">
                                        <label for="code">Email</label>
                                    </div>

                                    <div class="col-6">
                                        <input
                                            type="text"
                                            class="form-control"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="row mt-5">
                                    <div class="col-5">
                                        <label for="price">mobileNo Number</label>
                                    </div>
                                    <div class="col-6">
                                        <input
                                            type="text"
                                            class="form-control"
                                            onChange={(e) => {
                                                setmobileNo(e.target.value);
                                            }}
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
                                            id="pass1"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="row mt-5">
                                    <div class="col-5">
                                        <label for="price">Confirm Password</label>
                                    </div>
                                    <div class="col-6">
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="pass2"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div class="row mt-5">
                                <div className='col-7'>
                                    <button type='submit' className='btn btn-primary'>Sign up</button>
                                    <h6><b>Already have an account ?</b> &nbsp; <span><Link to={`/`}>Log in</Link></span> </h6>
                                </div>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;