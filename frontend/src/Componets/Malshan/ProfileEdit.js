import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FileBase64 from "react-file-base64";
import swal from "sweetalert";
import Sidebar from "../Hansi/Sidebar";



function ProfileEdit(prop) {

    const [username, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword1] = useState([]);
    const [confirmPassword, setPassword2] = useState([]);
    const [mobileNo, setmobileNo] = useState([]);
    const [profileImg, setProfileImg] = useState([]);
    const [bio, setBio] = useState([]);
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState("");

    const userId = sessionStorage.getItem('userID');

    useEffect(() => {
        function getUser() {

            axios
                .get(`http://localhost:8080/users/${userId}`)
                .then((res) => {
                    setName(res.data.username);
                    setEmail(res.data.email);
                    setmobileNo(res.data.mobileNo);
                    setProfileImg(res.data.profileImg);
                    setBio(res.data.bio);
                    setPassword1(res.data.password);
                })
                .catch((err) => {
                    swal({
                        title: "Error!",
                        text: err,
                        type: "error",
                    });
                })
        }
        getUser();
    }, []);

  

    function updateProfile() {

        setStatus("Follow");

        const newUser = {
            username,
            email,
            mobileNo,
            password,
            profileImg,
            bio,
            status
        };


        axios
            .put(`http://localhost:8080/users/${userId}`, newUser)
            .then(() => {
                swal({
                    title: "Success!",
                    text: "UPDATED Successfully",
                    icon: "success",
                    timer: 2000,
                    button: false,
                });

                setTimeout(() => {
                    window.location.replace("http://localhost:3000/profile");
                }, 3000);

            })
            .catch((err) => {
                swal({
                    title: "Error!",
                    text: "Coulden't UPDATE your Product",
                    type: "error",
                });
            });
    }


    // function updatePassword() {

    //     const newUser = {
    //         password
    //     };
    //     axios
    //         .put(`http://localhost:8080/users/${userId}`, newUser)
    //         .then(() => {
    //             swal({
    //                 title: "Success!",
    //                 text: "Password Updated Successfully",
    //                 icon: "success",
    //                 timer: 2000,
    //                 button: false,
    //             });

    //             setTimeout(() => {
    //                 window.location.replace("http://localhost:3000/profile");
    //             }, 3000);

    //         })
    //         .catch((err) => {
    //             swal({
    //                 title: "Error!",
    //                 text: "Coulden't UPDATE your Product",
    //                 type: "error",
    //             });
    //         });


    // }


    function deleteAccount() {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover these details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(() => {
                axios.delete(`http://localhost:8080/users/${userId}`);
                swal({
                    title: "Success!",
                    text: "Deleted record Successfully",
                    icon: "success",
                    timer: 2500,
                });

                sessionStorage.clear();

                setTimeout(() => {
                    window.location.replace("http://localhost:3000/signup");
                }, 3000);
            })
            .catch((err) => {
                swal({
                    title: "Error!",
                    text: "Coulden't Delete your Request",
                    type: "error",
                });
            });
    }

    return (
        <>
            <Sidebar />
            <div id="main">
                <div className="wrapper">
                       <div id="wizard" style={{ height: "auto", width: "100%" }}>
                            <section>
                                <div className="row justify-content-between">
                                    <div className="col-5 align-self-center">
                                        <div class="profile">
                                            <img src={profileImg} alt="" class="img-fluid rounded-circle"
                                                style={{ height: "60%", width: "60%" }} />
                                            <h1 class="text-light"><a href="index.html">{user.name}</a></h1>
                                            <p>{user.bio}</p>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <h1 style={{ fontFamily: "Arial Rounded MT Bold", fontSize: "60px" }}>{username}</h1>
                                        <h3>Profile Update</h3>
                                    </div>

                                </div>


                                <div class="form-group">
                                    <div class="row mt-5">
                                        <div class="col-5">
                                            <label for="code">Image</label>
                                        </div>
                                        <div class="col-6">
                                            <FileBase64
                                                type="file"
                                                class="form-control"
                                                id="nicFront"
                                                required
                                                onDone={({ base64 }) => setProfileImg(base64)}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div className="row mt-5">
                                        <div class="col-5">
                                            <label for="name">Describe Yourself
                                            </label>
                                        </div>
                                        <div class="col-6">
                                            <textarea
                                                type="text"
                                                class="form-control"
                                                rows={4}
                                                id="name"
                                                value={bio}
                                                onChange={(e) => {
                                                    setBio(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                                value={username}
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
                                                value={email}
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
                                                value={mobileNo}
                                                onChange={(e) => {
                                                    setmobileNo(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-5">
                                    <div className='col-3'>
                                        <button type='submit' className='btn btn-primary' onClick={updateProfile}>Update</button>
                                    </div>
                                    <div className='col-3'>
                                        <button className='btn btn-danger' onClick={deleteAccount}>Delete Account</button>
                                    </div>
                                </div>
                            </section>
                        </div>

                    {/* <div class="row mt-5">
                        <div className='col-3'>
                            <button className='btn btn-danger' onClick={deleteAccount}>Delete Account</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ProfileEdit;