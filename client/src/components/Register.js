import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (data) => {
        axios.post("http://localhost:2001/api/auth/register", data)
            .then((response) => {
                console.log("this is response", response);
                console.log("Registration worked!");
                navigate('/login', { state: { successMessage: `${response.data.data.email} Registered successfully` } });
            })
            .catch((error) => {
                console.error("Error:", error);
                let errorMessage = 'Registration failed';
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
                setErrorMessage(errorMessage); // Set error message state
            });
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,18}$/,
                'Password must be between 8 and 18 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    return (
        <section>
            <div className='py-5 px-5'>

                <div className='row py-5 d-flex justify-content-center'>
                    <div className='col-4 border border-dark rounded'>
                        <h1>Register</h1>
                        <div className='p-3'>
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                    confirmPassword: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className='fw-bold'>Email/Username</label>
                                        <Field autoComplete='off' type="email" name='email' placeholder="Enter email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className='fw-bold'>Password</label>
                                        <Field autoComplete='off' type="password" name='password' placeholder="Enter password (Example@123)" className="form-control" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className='fw-bold'>Confirm Password</label>
                                        <Field autoComplete='off' type="password" name='confirmPassword' placeholder="Confirm Password" className="form-control" />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </div>

                                    <Button variant="primary" type="submit">
                                        Register
                                    </Button>
                                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
