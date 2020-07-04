import React, { FunctionComponent, useContext } from 'react'
import { Grid, Paper, Card, GridList } from '@material-ui/core'
import FirebaseContext from '../Firebase/Context'

const Parties:FunctionComponent = () => {

    const firebase = useContext(FirebaseContext);
    let partiesRef = firebase?.db?.ref('env/dev/parties');
    // partiesRef?.once('value').then((snapshot)=>{
    //     snapshot.forEach((each)=> {
    //         console.log(each);
    //     })
    // })
    console.log(firebase?.currentUser?.providerData);
    console.log(firebase?.currentUser?.uid);

    return (
        <div>
            <Paper></Paper>
        </div>
    )
}

export default Parties;
