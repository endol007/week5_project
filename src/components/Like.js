import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";


const Like = (props) => {
    const {src, size, _onClick} = props;
    const styles ={
        size: size,
        src: src,
    }
    return (
            <LikeBtn {...styles} onClick={_onClick}></LikeBtn>
    )
}
Like.defaultProps={
    _onClick: () => {},
    size: 40,
    src: "https://image.flaticon.com/icons/png/512/833/833472.png",
}
const LikeBtn = styled.div`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;


export default Like;