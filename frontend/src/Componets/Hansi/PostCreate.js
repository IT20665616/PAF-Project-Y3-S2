import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import FileBase64 from "react-file-base64";
import Sidebar from "./Sidebar";
import swal from "sweetalert";
import axios from "axios";

function PostCreate() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");


    const myDiv = document.querySelector('#myDiv');

    if (myDiv !== null) {
        myDiv.style.display = "block";
    }


    let createdDate = Date.now().toString();
    const userId = sessionStorage.getItem('userID');

    function sendData(e) {
        e.preventDefault();

        const newPost = {
            name,
            location,
            createdDate,
            image,
            caption,
            userId
        };


        axios
            .post("http://localhost:8080/add", newPost)
            .then((res) => {
                console.log(res.data);
                swal({
                    title: "Post Created Succesfully !",
                    text: "Added Successfully",
                    icon: "success",
                    timer: 2000,
                    button: false,
                });
            })
            .catch((e) => {
                swal({
                    title: "Error!",
                    text: "Something is off " + e,
                    type: "error",
                });
            });

        setTimeout(() => {
            window.location.replace("http://localhost:3000/myPosts");
        }, 5000);

        setName("");
        setLocation("");
        setImage("");
        setCaption("");
    }

    return (
        <>

            <Sidebar />
            <div id="main">
                <div className="wrapper">
                    <form onSubmit={sendData}>
                        <div id="wizard">
                            <section>
                                <h1>Create Your Awsome Post</h1>

                                <div id="myDiv" style={{ display: "none" }} >
                                    <div class="row m-5 justify-content-center">
                                        <div className="col">
                                            <img src={image} style={{ height: "300px", width: "500px" }} /><br />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="row mt-5">
                                        <div class="col-5">
                                            <label for="code">Images<span style={{ color: "red" }}><sup>*</sup></span></label>
                                        </div>
                                        <div class="col-6">
                                            <FileBase64
                                                type="file"
                                                class="form-control"
                                                id="nicFront"
                                                required
                                                onDone={({ base64 }) => setImage(base64)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <div className="row mt-5">
                                        <div class="col-5">
                                            <label for="name">Give a Creative Name to Your Creative Post
                                                <span style={{ color: "red" }}><sup>*</sup></span></label>
                                        </div>
                                        <div class="col-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                required
                                                placeholder=""
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
                                            <label for="code">Attach Location<span style={{ color: "red" }}><sup>*</sup></span></label>
                                        </div>

                                        <div class="col-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="phone1"
                                                required
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                

                                <div class="form-group">
                                    <div class="row mt-5">
                                        <div class="col-5">
                                            <label for="price">Caption<span style={{ color: "red" }}><sup>*</sup></span></label>
                                        </div>
                                        <div class="col-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="nic"
                                                required
                                                onChange={(e) => {
                                                    setCaption(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-5">
                                    <div className="col-2">
                                        <Link to={`/myPosts`}><button type="submit" class="btn btn-success">
                                            Back
                                        </button></Link>
                                    </div>
                                    <div className="col-3">
                                        <button type="submit" class="btn btn-primary">
                                            Create Request
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button type="reset" class="btn btn-danger">
                                            Clear Form
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PostCreate;
