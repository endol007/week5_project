import React from "react";
import styled from "styled-components";
import {useSpring, animated} from "react-spring";

import heart_black from "../shared/BlackHeart.png";
import heart_red from "../shared/RedHeart.png";


const Like = (props) => {
    const styles = useSpring({
        to:[{opacity: 1,
            width: "100%",
            height:"100%",
            position: "absolute",
            },
            {opacity : 0 }],
        from: {opacity: 0}
    })

    const icon = props.is_like==true? heart_red : heart_black;
        return (
            <React.Fragment>
                {props.is_like==true? (<animated.div style={styles}><Image src={heart_red}></Image></animated.div>)
                : (<div></div>) }
                
            <LikeBtn icon={icon} onClick={props._onClick} ></LikeBtn>
            </React.Fragment>
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
const Image = styled.img`
    position: absolute;
`;


export default Like;