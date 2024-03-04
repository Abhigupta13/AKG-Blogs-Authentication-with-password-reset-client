import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

axios.defaults.baseURL = "http://localhost:8080";

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.email || !formData.password) {
                toast({
                    title: 'Please Fill all the Fields',
                    description: "You have to fill the required fields",
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                    position: 'bottom',
                });
                return;
            }

            if (!termsChecked) {
                toast({
                    title: 'Please Agree to Terms and Conditions',
                    description: "You must agree to terms and conditions.",
                    status: 'info',
                    duration: 1000,
                    isClosable: true,
                    position: 'bottom',
                });
                return;
            }

            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const { data } = await axios.post(
                "/api/user/login",
                formData,
                config
            );
            toast({
                title: 'Login Successfull',
                description: "You have Successfully logged IN",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate("/home");
        } catch (error) {
            toast({
                title: 'Invalid Email or Password',
                    description: "Kindly check check your email and password",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container' style={{ width: '35%', margin: 'auto' }}>
            <h2 className='mb-5 text-center mt-5'>Log in to your account</h2>
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"><b>Email address</b></label>
                        <input
                            type="email"
                            name="email"
                            className="form-control shadow-sm"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="form-control shadow-sm"
                                id="exampleInputPassword1"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={togglePasswordVisibility}
                                style={{ zIndex: '1' }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div id="emailHelp" className="form-text" style={{ textAlign: 'end' }}>
                            <NavLink to="/forgot">
                                <span style={{ color: "blue" }}>Forgot Password?</span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input shadow-sm"
                            id="exampleCheck1"
                            checked={termsChecked}
                            onChange={(e) => setTermsChecked(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">I accept the <a href='https://adnas.com/authentication-terms-and-conditions-of-service/' style={{ color: "blue" }}><i>terms and conditions.</i></a></label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        onClick={handleSubmit}
                    >
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : "Submit"}
                    </button>
                </form>
                <span className="d-block text-center mt-3">
                    Create a new Account-
                    <NavLink to="/sign-up">
                        <span style={{ color: "blue" }}>   Sign-Up</span>
                    </NavLink>
                </span>
            </div>
        </div>
    );
}

export default Login;
