
//react stuff
import {React, useEffect, useState} from 'react';
//firestore stuff
import { getDocs,doc , getDoc, addDoc, collection } from "firebase/firestore";
//graphics stuff
import { ReactComponent as SpenseLogo } from '../styles/graphics/spense.svg';
//database import
import db from "../database";

// class Dashbaord extends React.Component{
//
// }
const Dashboard = (props) => {

    const [Username, setUsername] = useState("");
    const [Nickname, setNickname] = useState("");

    useEffect( () => {
        username();
    })

    let username = async () => {
        const docRef = doc(db, "Users", "jamestv@uci.edu");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setNickname(docSnap.data().Nickname);
            setUsername(docSnap.data().Username);
            return docSnap.data();
        }
    }

    return(
        <div>
            Welcome Back, { Nickname }!
        </div>
    );
}

export default Dashboard;