import React from "react";
import {Grid, Text, Image} from "../elements";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {realtime} from "../shared/firebase";


const Notification = (props) => {
    const user = useSelector(state => state.user.user);
    const [noti, setNoti] = React.useState([]);
    React.useEffect(() => {
      if(!user){
        return;
      }
      const notiDB = realtime.ref(`noti/${user.uid}/list`);

      const _noti = notiDB.orderByChild("insert_dt");

      _noti.once("value", snapshot => {
        if(snapshot.exists()){
          let _data = snapshot.val();
          let _noti_list = Object.keys(_data).reverse().map(s => {
            return _data[s];
          })
          console.log(_noti_list);
          setNoti(_noti_list);
        }
      })
    }, [user]);

    return (
      <React.Fragment>
        <Grid padding="16px" bg="white">
            {noti.map((n, index) => {
                return (
                    <Card key={`noti_${index}`} {...n}/>
                )
            })}
        </Grid>
      </React.Fragment>
    );
}

export default Notification;
