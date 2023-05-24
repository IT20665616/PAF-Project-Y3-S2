import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import PostCard from "./PostCard";


export default function MyPosts() {

    const [post, setPost] = useState([]);
    const userId = sessionStorage.getItem('userID');

    useEffect(() => {
        function getPost() {
            axios
                .get(`http://localhost:8080/getPost?userId=${userId}`)
                .then((res) => {
                    console.log(res.data);
                    setPost(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getPost();
    }, []);

    return (
        <>
            <Sidebar />
            <div id="main">

                <section id="services" class="services">
                    <div class="container" data-aos="fade-up">

                        <div class="section-title">
                            <div class="row">
                                <div class="col-10">
                                    <h2>Posts</h2>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-8">
                                    <p>My Created Posts</p>
                                </div>
                                <div class="col-auto mr-auto d-flex align-items-start">
                                    <Link to={"/createPost"} >
                                        <button class="get-started-btn scrollto"><i class="fa fa-plus"></i>&nbsp;&nbsp;Create a Post</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {post.map((val, key) => (
                                <div className="col-4" key={key}>
                                    <Link to={`/singlePost/${val.id}`}>
                                        <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                                            <div class="icon-box">
                                                <img src={val.image} class="icon" style={{ height: "200px", width: "350px" }}></img>
                                                <h4><a href="">{val.name}</a></h4>
                                                {/* <p>{val.caption}</p> */}
                                            </div>
                                        </div>
                                    </Link>
                                    <br/>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>


        </>
    );
}
