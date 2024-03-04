import axios from 'axios';
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
axios.defaults.baseURL = "http://localhost:8080"
const ForgotPassword = () => {
    const toast = useToast();
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const sendLink = async(e)=>{
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const {data} = await axios.post("/api/user/forgot",{email},config)
            console.log(data);
            if(data){
                toast({
                    title: 'Mail Sent',
                    description: "Password reset link sent successfully to your email",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom',
                });
                setMessage(true);
                setEmail("");
            }
        } catch (error) {
            
        }
    }
    return (
        <div className='container' style={{ width: '35%', margin: 'auto' }}>
        <h1 className='mt-5'>Enter Your Email</h1>
        {message && <p style={{ color: "green", fontWeight: "bold" }}>Password reset link sent successfully to your email</p>}
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                    value={email} 
                    type="email" 
                    className="form-control shadow-sm" 
                    id="exampleInputEmail1" 
                    onChange={(e) => setEmail(e.target.value)} 
                    aria-describedby="emailHelp"
                />
            </div> 
            <button 
                type="submit" 
                className="btn btn-primary" 
                onClick={sendLink}
            >
                Send
            </button>
        </form>
    </div>
    
    )
}

export default ForgotPassword
