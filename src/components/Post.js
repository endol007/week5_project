import React, { useEffect } from "react";
import { Grid, Image, Text, Button } from "../elements";
import Like from "./Like"
import {history} from "../redux/configureStore";
import {useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import {actionCreators as likeActions} from "../redux/modules/like";
import BlackHeart from "../shared/BlackHeart.png";
import RedHeart from "../shared/RedHeart.png";

 const Post = React.memo((props) => {
  const dispatch = useDispatch();
  const id = props.id;
  const like_id = props.like_id;
  const count = props.like_cnt;
  const [likeChecked, setLikeChecked] = React.useState("like");

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <React.Fragment>
              <Button width="auto" margin="4px" padding="4px" _onClick={() => {
                history.push(`/write/${props.id}`);
              }}>
                수정
              </Button>
              <Button width="auto" margin="4px" padding="4px" _onClick={() => {
                dispatch(postActions.deletePostFB(props.id));
              }}>삭제</Button>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
          {/* <Grid padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid>
            <Image shape="rectangle" src={props.image_url} />
          </Grid> */}
          {/* layout type이 a일 때 */}
        {props.layout_type === "a" && (
          <React.Fragment>
            <Grid padding="16px">
              <Text>{props.contents}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </React.Fragment>
        )}

        {/* layout type이 b일 때 */}
        {props.layout_type === "b" && (
          <React.Fragment>
            <Grid is_flex>
              <Grid width="50%" padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </React.Fragment>
        )}

        {/* layout type이 c일 때 */}
        {props.layout_type === "c" && (
          <React.Fragment>
            <Grid is_flex>
              <Image shape="rectangle" src={props.image_url} />
              <Grid width="50%" padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
          
          <Grid padding="16px" is_flex>
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개 -
            좋아요 {props.like_cnt}개
          </Text>
          {likeChecked==="like"? (<Like size="30"
                src={BlackHeart}
                _onClick={() => {
                  dispatch(likeActions.addLikeFB(id, count));
                  setLikeChecked("dislike")
                }}
          ></Like>) : (
            <Like size="30"
                src={RedHeart}
                _onClick={() => {
                  dispatch(likeActions.deleteLikeFB(like_id, id));
                  setLikeChecked("like");
                }}
          ></Like>
          ) }
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

Post.defaultProps = {
  id: null,
  user_info: {
    user_id: "",
    user_name: "",
    user_profile: "",
  },
  image_url: "",
  contents: "",
  comment_cnt: 10,
  layout_type: "a",
  like_cnt: 1,
  like_id: "",
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
