import React, { useEffect, useRef, useContext } from 'react'
import messageStyles from '../styles/Message.module.css'
import navStyles from '../styles/Navbar.module.css'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'


const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={ref}
            className={`${messageStyles.message} ${message.senderId === currentUser.uid && `${messageStyles.owner}`}`} >
            <div className={messageStyles.messageInfo}>
                <img className={navStyles.navimg} src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.photoURL
                } alt="" />
                <span className={messageStyles.timing}>Just now</span>
            </div>
            <div className={messageStyles.messageContent}>
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message