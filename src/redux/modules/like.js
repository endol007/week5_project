import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore} from "../../shared/firebase";
import moment from "moment";
import firebase from "firebase/app";
import {actionCreators as postActions} from "./post"
import { create } from "lodash";

const ADD_LIKE = "ADD_LIKE";
const SET_LIKE = "SET_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

const addLike = createAction(ADD_LIKE, (post_id, count_like) => ({post_id, count_like}));
const deleteLike = createAction(DELETE_LIKE, (id) => ({id}));

const initialState = {
    list: {},
};

const addLikeFB = (post_id, count_like) => {
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
                
            const increment = firebase.firestore.FieldValue.increment(1);
            like = {...like, id: doc.id}
            postDB.doc(post_id).update({like_cnt: increment, like_id: doc.id}).then((_post) => {
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
        console.log(like_id)
        const likeDB = firestore.collection("like");
        const post = getState().post.list.find(l=> l.id === post_id)
        likeDB.doc(like_id).delete().then((res) => {
            dispatch(deleteLike(post_id));
            dispatch(postActions.editPost(post_id, {like_cnt: parseInt(post.like_cnt)-1}))
        })
    }

}

export default handleActions(
    {
        [ADD_LIKE]: (state, action) => produce(state, (draft) => {
            draft.list[action.payload.post_id]= action.payload.count_like
        }),
        [DELETE_LIKE]: (state, action) => produce(state, (draft) => {
            
        })
    },
    initialState
  );
  
  const actionCreators = {
    addLikeFB,
    deleteLikeFB,
  };
  
  export { actionCreators };