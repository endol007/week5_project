import React from "react";

import {Grid, Input, Button} from "../elements";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";



const CommentWrite = (props) => {
    const dispatch = useDispatch();

    const [comment_text, setCommentText] = React.useState();
    const onChange = (e) => {
      setCommentText(e.target.value);
    }
    const {post_id} = props;

    const write = () => {
      
      dispatch(commentActions.addCommentFB(post_id, comment_text));
      setCommentText("");
    }
    return (
      <React.Fragment>
        <Grid padding="16px" is_flex>
          <Input placeholder="댓글 내용을 입력해주세요 :)" 
          _onChange={onChange} 
          value={comment_text}
          onSubmit={write}
          is_submit/>
          <Button _onClick={write}
          width="50px" margin="0px 2px 0px 2px">작성</Button>
        </Grid>
      </React.Fragment>
    );
}

export default CommentWrite;

