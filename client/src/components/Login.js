import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (location.state) {
            if (location.state.errorMessage) {
                setErrorMessage(location.state.errorMessage);
            }
            if (location.state.successMessage) {
                setSuccessMessage(location.state.successMessage);
            }
        }
    }, [location.state]);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email/Username is required'),
        password: Yup.string()
            .required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:2001/api/auth/login", values);

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.data.role);
            console.log("data from login page", response.data)
            console.log("logged in successfully")
            navigate('/', { state: { successMessage: `${response.data.data.email} logged in successfully` } });

        } catch (error) {
            // Handle specific error messages from the backend
            if (error.response && error.response.data && error.response.data.error) {
                if (error.response.data.error.includes("email")) {
                    setFieldError('email', error.response.data.error);
                }
                if (error.response.data.error.includes("password")) {
                    setFieldError('password', error.response.data.error);
                }
            } else {
                // Handle other errors
                setErrorMessage('Login failed. Please try again.');
            }
        }

        setLoading(false);
        setSubmitting(false);
    };

    return (
        <section>
            <div className='py-5 px-5'>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                <div className='row py-5 d-flex justify-content-center'>
                    <div className='col-4 border border-dark rounded'>
                        <h1>Login</h1>
                        <div className='p-3'>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="email" className='fs-6 fw-bolder'>Email/Username</label>
                                            <Field
                                                className='form-control border-dark'
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className='fs-6 fw-bolder'>Password</label>
                                            <Field
                                                className='form-control border-dark'
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                            />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>

                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting || loading}>
                                            {loading ? 'Loading...' : 'Login'}
                                        </button>

                                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
