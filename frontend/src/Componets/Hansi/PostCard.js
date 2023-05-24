import React from 'react';
import { Link } from "react-router-dom";


const PostCard = ({ item }) => {
    return (
        <>

            {/* <Link to={`/singlePost/${item.id}`}> */}
                <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                    <div class="icon-box">
                        <img src={item.image} class="icon"></img>
                        <h4><a href="">{item.name}</a></h4>
                        <p>{item.caption}</p>
                    </div>
                </div>
            {/* </Link> */}

        </>
    );
}

export default PostCard;
