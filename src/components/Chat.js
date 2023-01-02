import React, { useContext } from 'react'
import homeStyles from '../styles/HomeChat.module.css'
import chatStyles from '../styles/Chat.module.css'
import { FaVideo, FaPhone } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs'
import Messages from './Messages';
import Input from './Input';
import inputStyles from '../styles/Input.module.css'
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const { data } = useContext(ChatContext)

    return (
        <div className={homeStyles.chat}>
            <div className={chatStyles.chatInfo}>
                <span>{data.user?.displayName}</span>
                <div className={chatStyles.chatIcons}>
                    <span className={inputStyles.symbol}><FaVideo /></span>
                    <span className={inputStyles.symbol}><FaPhone /></span>
                    <span className={inputStyles.symbol}><BsThreeDotsVertical /></span>
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat