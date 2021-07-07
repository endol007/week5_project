import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore} from "../../shared/firebase";
import {actionCreators as postActions} from "./post"

const ADD_LIKE = "ADD_LIKE";
const SET_LIKE = "SET_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

const addLike = createAction(ADD_LIKE, (post_id, count_like) => ({post_id, count_like}));
const deleteLike = createAction(DELETE_LIKE, (post_id, post) => ({post_id, post}));

const initialState = {
    list: {},
};

const addLikeFB = (post_id) => {
    return function(dispatch, getState, {history}){
        const likeDB = firestore.collection("like");
        const user_info = getState().user.user;
        let like = {
            id: "",
            post_id: post_id,
            user_id: user_info.uid,
        }
        likeDB.add(like).then(doc => {
            const postDB = firestore.collection("post");
            const post = getState().post.list.find(l=> l.id === post_id)
            const like_cnt = post.like_cnt;
            like = {...like, id: doc.id}
            postDB.doc(post_id).update({like_cnt: parseInt(like_cnt)+1, like_id: doc.id}).then((_post) => {
                dispatch(addLike(post_id, like));
                dispatch(postActions.editPost(post_id, {like_cnt: parseInt(post.like_cnt)+1}));
            })
                
        })
        
    }
}
const deleteLikeFB = (like_id, post_id) => {
    return function(dispatch, getState, {history}){
        if(!like_id){
            return;
        }
        const postDB = firestore.collection("post");
        const likeDB = firestore.collection("like");
        const post = getState().post.list.find(l=> l.id === post_id);
        const like_cnt = post.like_cnt;
        postDB.doc(post_id).update({like_cnt: parseInt(like_cnt)-1}).then((_post) => {
        
        });
        likeDB.doc(like_id).delete().then((res) => {
            postDB.doc(post_id).update({like_cnt: parseInt(like_cnt)-1}).then((_post) => {
                dispatch(deleteLike(post_id, post));
            dispatch(postActions.editPost(post_id, {like_cnt: parseInt(post.like_cnt)-1}));
            });
    });
    }

}

export default handleActions(
    {
        [ADD_LIKE]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.count_like;
        }),
        [DELETE_LIKE]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post.like_cnt
            draft.list -= 1;
        })
    },
    initialState
  );
  
  const actionCreators = {
    addLikeFB,
    deleteLikeFB,
  };
  
  export { actionCreators };