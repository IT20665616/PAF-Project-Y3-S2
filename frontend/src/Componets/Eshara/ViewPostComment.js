import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import Sidebar from "../Hansi/Sidebar";


function ViewPostComment(prop) {

    const [commentData, setCommentData] = useState([]);
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState("");

    const { id } = useParams();

    useEffect(() => {
        function getPost() {
            axios
                .get(`http://localhost:8080/get/${id}`)
                .then((res) => {
                    setPost(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getPost();

    }, []);

    function getComments() {
        axios
            .get(`http://localhost:8080/comment/getByPostId/${id}`)
            .then((res) => {
                setCommentData(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }
    getComments();

    function deleteComments(commentId) {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover these details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(() => {
                axios.delete(`http://localhost:8080/comment/delete/${id}`)
                swal({
                    title: "Success!",
                    text: "Deleted record Successfully",
                    icon: "success",
                    timer: 2500,
                });
            })
            .catch((err) => {
                swal({
                    title: "Error!",
                    text: "Coulden't Delete your Request",
                    type: "error",
                });
            });
    }

    function editComments(commentId) {
        const newComment = {
            comment,
            // time,
            id
        };

        axios
            .put(`http://localhost:8080/comment/update/${commentId}`, newComment)
            .then((res) => {
                swal({
                    title: "Comment Edited !",
                    text: "Successful",
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

        // setTimeout(() => {
        //     window.location.replace("http://localhost:3000/myFeed");
        // }, 2000);

        setComment("");
    }

    return (
        <>
            <Sidebar />
            <div id="main">
                <div className="wrapper">
                    <form>
                        <div id="wizard">
                            <section>
                                <h1>{post.name}</h1>
                                <h4>{post.location}</h4>

                                <div>
                                    <div class="row m-5 justify-content-center">
                                        <div className="col">
                                            <img src={post.image} style={{ height: "300px", width: "500px" }} /><br />
                                        </div>
                                    </div>
                                </div>

                                <h2>{post.caption}</h2>

                                {/* <button onClick={() => getComments()}></button> */}

                                {commentData.map((val, key) => {
                                    return (
                                        <>
                                            <div className="row mt-5">


                                                <div className="col-1">
                                                    <i class="fa fa-user"></i>
                                                </div>
                                                <div className="col-9">
                                                    <h5>{val.comment}</h5>
                                                </div>
                                                <div className="col-1">
                                                    <button className="btn" onClick={() => document.getElementById('id02').style.display = 'block'}><i class="fa fa-pencil"></i></button>
                                                </div>
                                                <div className="col-1">
                                                    <button className="btn btn-primary" onClick={() => deleteComments()}><i class="fa fa-trash"></i></button>
                                                </div>
                                                <hr style={{ height: "2px", color: "black", border: "2px" }}></hr>



                                            </div>

                                            <div class="w3-container ">
                                                <div id="id02" class="w3-modal">
                                                    <div class="w3-modal-content w3-card-4 w3-animate-zoom w3-display-middle" style={{ width: "60%" }}>

                                                        <div class="w3-center"><br />
                                                            <span onClick={() => document.getElementById('id02').style.display = 'none'} class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="row m-3">
                                                                <div class="col-3">
                                                                    <label for="search">New Comment</label>
                                                                </div>
                                                                <div class="col-8">
                                                                    <textarea
                                                                        rows={3}
                                                                        class="form-control"
                                                                        placeholder={val.comment}
                                                                        onChange={(e) => {
                                                                            setComment(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="w3-container w3-border-top w3-padding-16 w3-light-grey"  >
                                                            <div className="row justify-content-between">
                                                                <div className="col-3">
                                                                    <button onClick={() => document.getElementById('id02').style.display = 'none'} type="button" class="w3-button w3-red" style={{ borderRadius: "5px" }}>Cancel</button>
                                                                </div>
                                                                <div className="col-3">
                                                                    <button onClick={() => editComments(val.id)} type="button" class="w3-button w3-green" style={{ borderRadius: "5px" }}>Update</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>

                                    );
                                })}


                                {/* <div>
                                    <table id="my-table" class="table w-100  mt-5 table-responsive">
                                        <tbody>
                                            {commentData.map((val, key) => {
                                                return (

                                                    <tr>
                                                        <td>
                                                            <div className="row">
                                                                <i class="fa fa-user"></i>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="row">
                                                                <h5>{val.comment}</h5>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn" onClick={() => document.getElementById('id02').style.display = 'block'}><i class="fa fa-pencil"></i></button>
                                                            <button className="btn" onClick={() => deleteComments(val.id)}><i class="fa fa-trash"></i></button>

                                                            <div class="w3-container ">
                                                                <div id="id02" class="w3-modal">
                                                                    <div class="w3-modal-content w3-card-4 w3-animate-zoom w3-display-middle" style={{ width: "60%" }}>

                                                                        <div class="w3-center"><br />
                                                                            <span onClick={() => document.getElementById('id02').style.display = 'none'} class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="row m-3">
                                                                                <div class="col-3">
                                                                                    <label for="search">New Comment</label>
                                                                                </div>
                                                                                <div class="col-8">
                                                                                    <textarea
                                                                                        rows={3}
                                                                                        class="form-control"
                                                                                        placeholder={val.comment}
                                                                                        onChange={(e) => {
                                                                                            setComment(e.target.value);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="w3-container w3-border-top w3-padding-16 w3-light-grey"  >
                                                                            <div className="row justify-content-between">
                                                                                <div className="col-3">
                                                                                    <button onClick={() => document.getElementById('id02').style.display = 'none'} type="button" class="w3-button w3-red" style={{ borderRadius: "5px" }}>Cancel</button>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <button onClick={() => editComments(val.id)} type="button" class="w3-button w3-green" style={{ borderRadius: "5px" }}>Update</button>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>




                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div> */}

                                <div class="row mt-5">
                                    <div className="col-2">
                                        <Link to={`/myFeed`}><button type="submit" class="btn btn-success">
                                            Back
                                        </button></Link>
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

export default ViewPostComment;