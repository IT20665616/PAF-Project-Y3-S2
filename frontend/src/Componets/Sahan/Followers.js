import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";
import Sidebar from '../Hansi/Sidebar';


function Followers() {

    const [username, setUsername] = useState([]);
    // const [status, setStatus] = useState([]);
    // const [followerId, setFollowerId] = useState("");
    const [user, setUser] = useState([]);

    const status = "following";

    const userId = sessionStorage.getItem('userID');

    useEffect(() => {
        function getUser() {
            axios
                .get(`http://localhost:8080/users/findall`)
                .then((res) => {
                    console.log(res.data);
                    setUser(res.data);
                    // setUsername(res.data.username);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getUser();
    }, []);


    function sendData(followerId) {

        const newFollower = {
            userId,
            followerId,
            status
        };


        axios
            .post("http://localhost:8080/follower/create", newFollower)
            .then((res) => {
                console.log(res.data);
                swal({
                    title: "You are Following ",
                    text: "Added Successfully",
                    icon: "success",
                    timer: 2000,
                    button: false,
                });

                setTimeout(() => {
                    window.location.replace("http://localhost:3000/followers");
                }, 5000);
            })
            .catch((e) => {
                swal({
                    title: "Error!",
                    text: "Something is off " + e,
                    type: "error",
                });
            });
    }


    return (
        <>
            <Sidebar />
            <div id="main">

                <div className="wrapper">
                    <div class="container" style={{ paddingTop: "90px", paddingBottom: "auto", paddingLeft: "90px", paddingRight: "auto", alignSelf: "center" }}>
                        <div id="wizard" style={{ height: "auto", width: "90%" }}>
                            <section>
                                <h1 style={{ fontFamily: "Arial Rounded MT Bold", fontSize: "70px" }}>Influenzer</h1>
                                <h3>You may interested in...</h3>
                                <center>
                                    <table id="my-table" class="table w-100  mt-5 table-responsive">
                                        <tbody>
                                            {user.map((val, key) => {
                                                return (
                                                    <tr>
                                                        <th style={{ width: "120px",textAlign: "center" }}>
                                                            <img src={val.profileImg} alt="" class="img-fluid rounded-circle"
                                                                style={{ height: "60%", width: "50px" }} />
                                                        </th>
                                                        <td style={{ width: "300px",textAlign: "center" }}><h3>{val.username}</h3></td>
                                                        <td><button type="button" className='btn btn-primary' onClick={() => sendData(val.id)} style={{ width: "120px",textAlign: "center" }}>Follow</button></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                </center>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Followers;