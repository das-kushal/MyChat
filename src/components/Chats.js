import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import searchStyle from '../styles/Search.module.css'
import navStyles from '../styles/Navbar.module.css'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
const Chats = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => unsub();
        }

        currentUser.uid && getChats(); // if there is a user id then only call the getChats function to prevent any error
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };
    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                    className={searchStyle.userChat}
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <img className={navStyles.navimg} src={chat[1].userInfo.photoURL} alt="" />
                    <div className={searchStyle.userChatInfo}>
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats