import React, { useContext } from 'react'
import styles from '../styles/Navbar.module.css'
import registerStyles from '../styles/Register.module.css'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className={styles.navbar}>
            <span className={styles.logo}>My Chat</span>
            <div className={styles.user}>
                <img className={styles.navimg} src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button className={registerStyles.button} onClick={() => signOut(auth)}>Log out</button>
            </div>
        </div>
    )
}

export default Navbar