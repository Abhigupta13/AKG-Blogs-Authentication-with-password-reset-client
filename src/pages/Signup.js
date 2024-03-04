import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

axios.defaults.baseURL = "http://localhost:8080";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleCPasswordVisibility = () => {
        setShowCPassword(!showCPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !password || !cpassword) {
            toast({
                title: 'Please Fill all the Fields',
                description: "You have to fill the required fields",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
        if (password !== cpassword) {
            toast({
                title: 'Passwords do not match',
                description: "You have to fill the same password in the confirm password input",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post('/api/user/sign-up', { name, email, password }, config);
            toast({
                title: 'Registration Successful',
                description: "We have successfully registered your account",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate("/")
        } catch (error) {
            // Handle error
            setLoading(false);
        }
    };

    return (
        <div className='container' style={{ width: '35%', margin: 'auto' }}>
            <h2 className='mb-5 text-center mt-5 font-weight-bold'>Create a New Account</h2>
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label font-weight-bold">Name</label>
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            id="name"
                            aria-describedby="emailHelp"
                            onChange={handleChange(setName)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label font-weight-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control shadow-sm"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={handleChange(setEmail)}
                        />
                        <div id="emailHelp" className="form-text font-weight-bold">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="exampleInputPassword1" className="form-label font-weight-bold">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control shadow-sm"
                                id="exampleInputPassword1"
                                onChange={handleChange(setPassword)}
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
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="exampleInputPassword2" className="form-label font-weight-bold">Confirm Password</label>
                        <div className="input-group">
                            <input
                                type={showCPassword ? "text" : "password"}
                                className="form-control shadow-sm"
                                id="exampleInputPassword2"
                                onChange={handleChange(setCPassword)}
                            />
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={toggleCPasswordVisibility}
                                style={{ zIndex: '1' }}
                            >
                                <FontAwesomeIcon icon={showCPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 font-weight-bold"
                        onClick={handleSubmit}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                <span className="d-block text-center mt-3">
                    Already have an account -
                    <NavLink to="/">
                        <span style={{ color: "blue" }}>   Log in</span>
                    </NavLink>
                </span>
            </div>
        </div>
    );
}

export default Signup;
