import React from "react";
import styled from "styled-components";

import heart_black from "../shared/BlackHeart.png";
import heart_red from "../shared/RedHeart.png";


const Like = (props) => {
    const icon = props.is_like==true? heart_red : heart_black;
        return (
            <LikeBtn icon={icon} onClick={props._onClick} ></LikeBtn>
    )
}

const LikeBtn = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    background-image: url(${(props) => props.icon});
    background-size: cover;
    cursor: pointer;
`;


export default Like;