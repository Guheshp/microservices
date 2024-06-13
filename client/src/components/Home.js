import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Redirect to login page if token is not present
        if (!token) {
            navigate('/login');
        } else {
            // Fetch user profile when the component mounts
            fetchUserdata(token);
        }

        // Set success message from location state and clear the state
        if (location.state && location.state.successMessage) {
            setSuccessMessage(location.state.successMessage);
            // Delay clearing the state to ensure message is displayed
            navigate({ state: {} });
        }
    }, []);

    const fetchUserdata = async (token) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.get('http://localhost:2001/api/user/profile', { headers });

            // Set user data to state
            const userData = response.data.user;
            setUsers(userData);
            setUserRole(userData.role);
            console.log(userData);

        } catch (error) {
            let message = 'Error fetching data';
            if (error.response) {
                if (error.response.status === 401) {
                    message = 'Session expired, please log in again';
                    // Optionally, clear token and redirect to login page
                    localStorage.removeItem('token');
                    navigate('/login');
                } else if (error.response.data && error.response.data.error) {
                    message = error.response.data.error;
                }
            }
            console.error('Error fetching data:', message);
            setErrorMessage(message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            <h1 className="text-muted fw-bolder display-5">-- Home page --</h1>


            {users && (
                <div className="user-profile">
                    <h2>User Profile</h2>
                    <p><strong>Email:</strong> {users.email}</p>
                    <p><strong>Role:</strong> {userRole}</p>
                    {/* Add more user details as needed */}
                </div>
            )}

            <div>
                <h1>All Users</h1>
            </div>
        </div>
    );
}

export default Home;
