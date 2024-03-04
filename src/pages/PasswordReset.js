import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

axios.defaults.baseURL = "http://localhost:8080";

const PasswordReset = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const { id, token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleCPasswordVisibility = () => {
        setShowCPassword(!showCPassword);
    };

    const userValid = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/user/forgot/${id}/${token}`, config);
            if (!data) {
                alert('Invalid Link');
                navigate("/forgot");
            }
        } catch (error) {
            console.error(error);
            alert('Invalid Link');
            navigate("/forgot");
        }
    };

    useEffect(() => {
        userValid();
    }, []);

    const sendPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: 'Password Mismatch',
                description: "Please enter the same password in both fields.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(`/api/user/reset/${id}/${token}`, { password }, config);
            if (data) {
                toast({
                    title: 'Password Reset Successful',
                    description: "You have successfully reset your password.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom',
                });
                setPassword("");
                setConfirmPassword("");
                navigate("/");
            } else {
                alert("Something went wrong. Please generate a new link.");
                navigate("/forgot");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again later.");
            navigate("/forgot");
        }
    };

    return (
        <div className='container' style={{ width: '35%', margin: 'auto' }}>
            <h1 className='mt-5'>Enter Your New Password</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <div className="input-group">
                        <input
                            value={password}
                            type={showPassword ? "text" : "password"}
                            className="form-control shadow-sm"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            aria-describedby="passwordHelp"
                            placeholder='Enter New password'
                        />
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            value={confirmPassword}
                            type={showCPassword ? "text" : "password"}
                            className="form-control shadow-sm"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            aria-describedby="confirmPasswordHelp"
                            placeholder='Confirm New password'
                        />
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={toggleCPasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showCPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={sendPassword}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default PasswordReset;
