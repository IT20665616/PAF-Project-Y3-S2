import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import PostCard from "./PostCard";
import swal from "sweetalert";


export default function MyFeed() {

    const [post, setPost] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [comment, setComment] = useState("");

    const [isVisible, setIsVisible] = useState(false);

    function handleButtonClick(postID) {
        setIsVisible(!isVisible);

        function getComments(postID) {
            axios
                .get(`http://localhost:8080/comment/getByPostId/${postID}`)
                .then((res) => {
                    setCommentData(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }

        getComments(postID);
    }


    let time = Date.now().toString();

    const myDiv = document.querySelector('#showComment');

    if (myDiv !== null) {
        myDiv.style.display = "block";
    }

    useEffect(() => {
        function getPost() {
            axios
                .get("http://localhost:8080/findall")
                .then((res) => {
                    setPost(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getPost();
    }, []);




    function deleteComments(id) {

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

            setTimeout(() => {
                window.location.replace("http://localhost:3000/myFeed");
            }, 3000);
    }

    function editComments(id, postID) {
        const newComment = {
            comment,
            time,
            postID
        };

        axios
            .put(`http://localhost:8080/comment/update/${id}`, newComment)
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

        setTimeout(() => {
            window.location.replace("http://localhost:3000/myFeed");
        }, 2000);

        setComment("");
    }


    function sendData(postID) {
        const newComment = {
            comment,
            time,
            postID
        };

        axios
            .post("http://localhost:8080/comment/add", newComment)
            .then((res) => {
                console.log(res.data);
                swal({
                    title: "Comment Added !",
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

        setTimeout(() => {
            window.location.replace("http://localhost:3000/myFeed");
        }, 2000);

        setComment("");
    }



    return (
        <>
            <Sidebar />
            <div id="main">


                <section id="services" class="services">
                    <div class="container" data-aos="fade-up">

                        <div class="section-title">
                            <div class="row">
                                <div class="col-10">
                                    <h2>My Feed</h2>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-8">
                                    <p>Newly Updated Posts</p>
                                </div>
                            </div>
                        </div>


                        <center>
                            <table id="my-table" class="table w-75  mt-5 table-responsive">
                                <tbody>
                                    {post.map((val, key) => {
                                        return (
                                            <tr>
                                                <th>
                                                    <div className="row m-3 justify-content-center">
                                                        <h2><b>{val.name}</b></h2>
                                                        <p style={{ color: "grey" }}>{val.location}</p>
                                                    </div>

                                                    <div className="row">
                                                        <img src={val.image} class="icon" style={{ height: "400px", width: "650px", borderRadius: "20px" }}></img>
                                                    </div>

                                                    <div className="row m-3 justify-content-center">

                                                        <h4><i class="fa fa-heart-o"></i> &nbsp; &nbsp; <b>{val.caption}</b></h4>

                                                    </div>

                                                    <div className="row m-3 justify-content-center">
                                                        <textarea type="text"
                                                            class="form-control"
                                                            onChange={(e) => {
                                                                setComment(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="row m-3">
                                                        <div className="col-4">
                                                            <button onClick={() => sendData(val.id)} type="button" class="w3-button w3-green" style={{ borderRadius: "5px" }}>Send a comment</button>
                                                        </div>
                                                        <div className="col-4">
                                                            {/* <Link to={`/myFeed/viewPost/${val.id}`} >
                                                                <button class="w3-button w3-green" style={{ borderRadius: "5px" }}>View Comments</button>
                                                            </Link>
                                                            <button id="btn1" class="w3-button w3-green" onClick={() => getComments(val.id)} style={{ borderRadius: "5px" }}>View Comments</button> */}

                                                            <div>
                                                                <button id="btn1" class="w3-button w3-green" onClick={() => handleButtonClick(val.id)} style={{ borderRadius: "5px" }}>View Comments</button>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    {isVisible &&
                                                        <div>
                                                            {commentData.map((val, key) => {
                                                                return (

                                                                    <>
                                                                        <div className="row mt-5">
                                                                            <div className="col-1 align-middle">
                                                                                <i class="fa fa-user"></i>
                                                                            </div>
                                                                            <div className="col-9">
                                                                                <h5>{val.comment}</h5>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <button className="btn " onClick={() => document.getElementById('id02').style.display = 'block'}><i class="fa fa-pencil"></i></button>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <button className="btn " onClick={() => deleteComments(val.id)}><i class="fa fa-trash"></i></button>
                                                                            </div>
                                                                        </div>

                                                                        <div class="w3-container ">
                                                                            <div id="id02" class="w3-modal">
                                                                                <div class="w3-modal-content w3-card-4 w3-animate-zoom" style={{ width: "60%" }}>

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
                                                                                                    value={val.comment}
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
                                                                                                <button onClick={() => editComments(val.id, val.postID)} type="button" class="w3-button w3-green" style={{ borderRadius: "5px" }}>Update</button>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>


                                                                );
                                                            })}
                                                        </div>
                                                    }

                                                </th>
                                                <td>
                                                    <div className="row m-3 justify-content-center">
                                                        <button type="button" className="btn btn-primary">&nbsp;Follow</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        </center>

                    </div>
                </section>
            </div>


        </>
    );
}



                                                                    // <tr>
                                                                    //     <td>
                                                                    //         <div className="row">
                                                                    //             <i class="fa fa-user"></i>
                                                                    //         </div>
                                                                    //     </td>
                                                                    //     <td>
                                                                    //         <div className="row">
                                                                    //             <h5>{val.comment}</h5>
                                                                    //         </div>
                                                                    //     </td>
                                                                    //     <td>
                                                                    // <button className="btn" onClick={() => document.getElementById('id02').style.display = 'block'}><i class="fa fa-pencil"></i></button>
                                                                    // <button className="btn" onClick={() => deleteComments(val.id)}><i class="fa fa-trash"></i></button>

                                                                    //         <div class="w3-container ">
                                                                    //             <div id="id02" class="w3-modal">
                                                                    //                 <div class="w3-modal-content w3-card-4 w3-animate-zoom w3-display-middle" style={{ width: "60%" }}>

                                                                    //                     <div class="w3-center"><br />
                                                                    //                         <span onClick={() => document.getElementById('id02').style.display = 'none'} class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                                                                    //                     </div>
                                                                    //                     <div class="form-group">
                                                                    //                         <div class="row m-3">
                                                                    //                             <div class="col-3">
                                                                    //                                 <label for="search">New Comment</label>
                                                                    //                             </div>
                                                                    //                             <div class="col-8">
                                                                    //                                 <textarea
                                                                    //                                     rows={3}
                                                                    //                                     class="form-control"
                                                                    //                                     placeholder={val.comment}
                                                                    //                                     onChange={(e) => {
                                                                    //                                         setComment(e.target.value);
                                                                    //                                     }}
                                                                    //                                 />
                                                                    //                             </div>
                                                                    //                         </div>
                                                                    //                     </div>

                                                                    //                     <div class="w3-container w3-border-top w3-padding-16 w3-light-grey"  >
                                                                    //                         <div className="row justify-content-between">
                                                                    //                             <div className="col-3">
                                                                    //                                 <button onClick={() => document.getElementById('id02').style.display = 'none'} type="button" class="w3-button w3-red" style={{ borderRadius: "5px" }}>Cancel</button>
                                                                    //                             </div>
                                                                    //                             <div className="col-3">
                                                                    //                                 <button onClick={() => editComments(val.id, val.postID)} type="button" class="w3-button w3-green" style={{ borderRadius: "5px" }}>Update</button>
                                                                    //                             </div>
                                                                    //                         </div>

                                                                    //                     </div>
                                                                    //                 </div>
                                                                    //             </div>
                                                                    //         </div>
                                                                    //     </td>
                                                                    // </tr>