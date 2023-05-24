import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FileBase64 from "react-file-base64";
import Header from "./Sidebar";
import swal from "sweetalert";
import Sidebar from "./Sidebar";


function SinglePost(prop) {


    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");

    const userId = sessionStorage.getItem('userID');


    const { id } = useParams();

    useEffect(() => {
        function getPost() {
            axios
                .get(`http://localhost:8080/get/${id}`)
                .then((res) => {

                    if (res.data) {
                        setName(res.data.name);
                        setLocation(res.data.location);
                        setImage(res.data.image);
                        setCaption(res.data.caption);
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });

        }
        getPost();
    }, []);


    function updatePost() {

        const newPost = {
            name,
            location,
            image,
            caption,
            userId
        };


        axios
            .put(`http://localhost:8080/update/${id}`, newPost)
            .then(() => {
                swal({
                    title: "Success!",
                    text: "UPDATED Successfully",
                    icon: "success",
                    timer: 2000,
                    button: false,
                });

                setTimeout(() => {
                    window.location.replace("http://localhost:3000/myPosts");
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




    function deletePost() {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover these details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(() => {
                axios.delete(`http://localhost:8080/delete/${id}`);
                swal({
                    title: "Success!",
                    text: "Deleted record Successfully",
                    icon: "success",
                    timer: 2500,
                });

                setTimeout(() => {
                    window.location.replace("http://localhost:3000/myPosts");
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
                    <form>
                        <div id="wizard">
                            <section>
                                <h1>{name}</h1>

                                <div>
                                    <div class="row m-5 justify-content-center">
                                        <div className="col">
                                            <img src={image} style={{ height: "300px", width: "500px" }} /><br />
                                        </div>
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
                                                    onDone={({ base64 }) => setImage(base64)}
                                                />
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div className="row mt-5">
                                        <div class="col-5">
                                            <label for="name">Give a Creative Name to Your Creative Post
                                            </label>
                                        </div>
                                        <div class="col-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                value={name}
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
                                            <label for="code">Attach Location</label>
                                        </div>

                                        <div class="col-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="phone1"
                                                value={location}
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
                                            <label for="price">Caption</label>
                                        </div>
                                        <div class="col-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="nic"
                                                value={caption}
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
                                        <button type="button" class="btn btn-primary" onClick={() => updatePost()}>
                                            Update Post
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" class="btn btn-danger" onClick={() => deletePost()}>
                                            Remove Post
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

export default SinglePost;