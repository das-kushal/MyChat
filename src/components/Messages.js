import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { doc, onSnapshot } from 'firebase/firestore'
import mesagesStyles from '../styles/Messages.module.css'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });


        // cleanup
        return () => {
            unSub();
        }
    }, [data.chatId])
    return (
        <div className={mesagesStyles.messages}>
            {messages.map(m => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    )
}

export default Messages