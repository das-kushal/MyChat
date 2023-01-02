import React, { useContext, useState } from 'react'
import inputStyles from '../styles/Input.module.css'
import { IoMdAttach } from 'react-icons/io'
import { BsFillImageFill } from 'react-icons/bs'
import registerStyles from '../styles/Register.module.css'

import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const Input = () => {


    const [text, setText] = useState("")
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)


    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        // reset them after use
        setText("");
        setImg(null);
    };

    return (
        <div className={inputStyles.input}>
            <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                className={inputStyles.typing}
                placeholder='Type Something...'
                value={text} />
            <div className={inputStyles.send}>
                <span className={inputStyles.symbol}><IoMdAttach /></span>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <span className={inputStyles.symbol}><BsFillImageFill /></span>
                </label>
                <button className={registerStyles.button} onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input