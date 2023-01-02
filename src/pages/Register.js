import React, { useState } from 'react'
import styles from '../styles/Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };
    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <span className={styles.logo}>My Chat</span>
                <span className={styles.title}>Register</span>
                <form onSubmit={handleSubmit}>
                    <input className={styles.registerInput} type="text" placeholder='Enter Name' />
                    <input className={styles.registerInput} type="email" placeholder='Enter Email' />
                    <input className={styles.registerInput} type="password" placeholder='Enter Password' />
                    <input className={styles.registerInput} type="file" style={{ display: "none" }} id="file" />
                    <label htmlFor="file" style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: "center", justifyContent: "flex-start" }}>
                            <FontAwesomeIcon icon={faUserTie} size='2x' style={{ color: '#128c7e' }} />
                            <span style={{ marginLeft: '15px', color: '#128c7e', fontSize: '13px' }}>Add an avatar</span>
                        </div>
                    </label>
                    <button className={styles.button}>Sign Up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register

