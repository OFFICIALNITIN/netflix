
import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";

const Login = () => {
    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const { dispatch, isFetching } = useContext(AuthContext)

    const handlelogin = (e) => {
        e.preventDefault()
        login({email,password}, dispatch)
    }

    return (
        <div className='login'>
            <div className='top'>
                <div className='wrapper'>
                    <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
                        alt=''
                    />

                </div>
            </div>
            <div className='container'>
                <form>
                    <h1>Sign In</h1>
                    <input type='email' placeholder='Email or phone number' onChange={(e)=> setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
                    <button className='loginButton' onClick={handlelogin} disabled={isFetching}>Sign In</button>
                    <Link to="/register">
                    <span>New to Netflix? <b>Sign up now.</b></span>
                    </Link>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login