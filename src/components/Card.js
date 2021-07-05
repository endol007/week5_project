import React from "react";
import {Grid, Image, Text} from "../elements";

const Card = (props) => {
    const {image_url, user_name, post_id} = props;

    return (
      <Grid is_flex bg="white" margin="8px 0px" line="1px solid #bcbcbc">
        <Grid width="auto" margin="0px 8px 0px 0px">
          <Image size={40} shape="circle" image_url={image_url}/>
        </Grid>
        <Grid>
          <Text>
            <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다.
          </Text>
        </Grid>
      </Grid>
    );
}

Card.defaultProps = {
    image_url: "",
    user_name: "",
    post_id: null,
}

export default Card;