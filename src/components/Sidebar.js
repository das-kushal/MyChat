import React from 'react'
import homeStyles from '../styles/HomeChat.module.css'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
    return (
        <div className={homeStyles.sidebar}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Sidebar