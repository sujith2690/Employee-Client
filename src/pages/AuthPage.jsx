import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import LoginForm from '../components/AuthPage/LoginForm'
import SignUpForm from '../components/AuthPage/SignUpForm'
import { GiCircleClaws } from "react-icons/gi";


const Auth = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(true)
    const handleLogin = () => {
        console.log(auth, '------- auth')
        setAuth((prev) => !prev)
    }
    return (
        <section className='bg-black flex h-screen items-center justify-center lg:justify-end lg:px-10 bg-no-repeat bg-cover'
            style={{ backgroundImage: 'url(./officeFiles.webp)' }}
        >
            <div className="w-full max-w-md z-20 bg-white/50 bg-opacity-30 backdrop-blur-lg p-4 rounded-lg">
                <h1
                    className="my-6  cursor-pointer text-center font-extrabold flex items-center justify-around  p-2"
                    onClick={() => navigate('/')}
                >
                    <span className="font-extrabold text-8xl text-white">
                        <GiCircleClaws />
                    </span>
                    <span className="text-black bg-blu-400 text-4xl">Employ Circle</span>
                </h1>



                {auth ? <LoginForm handleLogin={handleLogin} />
                    : <SignUpForm handleSignUp={handleLogin} />
                }
            </div>
        </section>
    )
}

export default Auth
