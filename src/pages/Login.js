import React, { useState } from 'react'
import styles from '../styles/Register.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <span className={styles.logo}>My Chat</span>
                <span className={styles.title}>Login</span>
                <form onSubmit={handleSubmit}>
                    <input className={styles.registerInput} type="email" placeholder='Enter Email' />
                    <input className={styles.registerInput} type="password" placeholder='Enter Password' />

                    <button className={styles.button}>Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;