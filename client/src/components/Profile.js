import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";


function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState();

    const fetchUserdata = async (token) => {

        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await axios.get('http://localhost:2001/api/user/profile', { headers });

            // Set user data to state
            const userData = response.data.user;
            setUser(userData);

            console.log(userData);

        } catch (error) {
            let message = 'Error fetching data';
            if (error.response) {
                if (error.response.status === 401) {
                    message = 'Session expired, please log in again';
                    // Optionally, clear token and redirect to login page
                    localStorage.removeItem('token');
                    navigate('/login', { state: { errorMessage: message } });
                } else if (error.response.data && error.response.data.error) {
                    message = error.response.data.error;
                }
            }
            console.error('Error fetching data:', message);
            setErrorMessage(message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Redirect to login page if token is not present
        if (!token) {
            navigate('/login');
        } else {
            // Fetch user profile when the component mounts
            fetchUserdata(token);
        }
        if (location.state && location.state.successMessage) {
            setSuccessMessage(location.state.successMessage);

            navigate({ state: {} });
        }

    }, []);
    return (
        <div className="container">
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
            {user && (
                <div className="user-profile">
                    <h2>User Profile</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    {/* Add more user details as needed */}
                    {user.role === 1 && (
                        <div>
                            <h3>Admin section</h3>
                            <p>Admin! Have Supper Poewr!</p>
                        </div>
                    )}
                </div>

            )}

        </div>
    )
}

export default Profile
