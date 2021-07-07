import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import BlackHeart from "../shared/BlackHeart.png";
import RedHeart from "../shared/BlackHeart.png";


const Like = (props) => {
    
    const {src, size, _onClick, like} = props;
    const styles ={
        size: size,
        src: src,
    }
        return (
            <LikeBtn {...styles} onClick={_onClick} ></LikeBtn>
    )
}
Like.defaultProps={
    _onClick: () => {},
    size: 40,
    src: "",
    like: "",
}
const LikeBtn = styled.div`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;


export default Like;