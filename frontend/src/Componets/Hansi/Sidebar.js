import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Sidebar = () => {

    const [username, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword1] = useState([]);
    const [confirmPassword, setPassword2] = useState([]);
    const [mobileNo, setmobileNo] = useState([]);
    const [profileImg, setProfileImg] = useState([]);
    const [bio, setBio] = useState([]);
    const [user, setUser] = useState([]);

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
                })
        }
        getUser();
    }, []);


    function logout() {
        sessionStorage.clear();
        window.location.replace("http://localhost:3000/");
    }


    return (
        <>
            <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>

            <header id="header">
                <div class="d-flex flex-column">

                    <div class="profile">
                        <img src={profileImg} alt="" class="img-fluid rounded-circle" />
                        <h1 class="text-light"><a href="index.html">{username}</a></h1>
                        <p>{bio}</p>
                        
                        <div class="social-links mt-3 text-center">
                            {/* <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                            <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                            <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                            <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a> */}
                        </div>
                    </div>

                    <nav id="navbar" class="nav-menu navbar">
                        <ul>
                            <li><Link to="/home" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Home</span></Link></li>
                            <li><Link to="/profile" class="nav-link scrollto "><i class="bx bx-user"></i> <span>Edit My Profile</span></Link></li>
                            <li><Link to="/myPosts" class="nav-link scrollto"><i class="bx bx-book-content"></i> <span>My Posts</span></Link></li>
                            <li><Link to="/followers" class="nav-link scrollto"><i class="bx bx-user-plus"></i> <span>Followers</span></Link></li>
                            <li><Link to="/following" class="nav-link scrollto"><i class="bx bx-user-check"></i> <span>Following</span></Link></li>
                            <li><Link to="/" class="nav-link scrollto"> <span>
                                <button class="btn btn-danger" onClick={logout}>
                                    Log Out
                                </button>
                            </span></Link></li>
                        </ul>
                    </nav>
                </div>
            </header>



            <footer id="footer">
                <div class="container">
                    <div class="copyright">
                        &copy; Copyright <strong><span>PAF Asiggnment - 87</span></strong>
                    </div>
                    <div class="credits">
                        Designed by <a href="https://bootstrapmade.com/">myTeam</a>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Sidebar;