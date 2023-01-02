import React, { useContext, useState } from 'react'
import searchStyle from '../styles/Search.module.css'
import registerStyles from '../styles/Register.module.css'
import navStyles from '../styles/Navbar.module.css'
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext'

import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);


    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats

                // for the other user
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                // for current user
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        setUser(null)
        setUsername("")
    };


    return (
        <div className={searchStyle.search}>
            <div className={searchStyle.searchForm}>
                <span className={searchStyle.searchIcon}><FaSearch /></span>
                <input
                    type="text"
                    className={registerStyles.registerInput}
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User Not Found!</span>}
            {user && (
                <div className={searchStyle.userChat} onClick={handleSelect}>
                    <img
                        className={navStyles.navimg}
                        src={user.photoURL}
                        alt=""
                    />
                    <div className={searchStyle.userChatInfo}>
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search