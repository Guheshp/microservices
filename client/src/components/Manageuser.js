import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchAllUser();
    }, []);

    const fetchAllUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login', { state: { errorMessage: "Token not found please login!" } });
                return;
            }

            const response = await axios.get("http://localhost:2001/api/user/all-users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const allUserData = response.data.data;
            setAllUsers(allUserData);
            console.log(allUserData)
            // setSuccessMessage("All users fetched successfully!");
        } catch (error) {
            console.error("Error:", error);
            let errorMessage = "Fetching all users failed";
            navigate("/notpermitted")
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            setErrorMessage(errorMessage);
        }
    };

    return (
        <section>
            <div className='d-flex justify-content-center'>
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

                {/* Display allUsers data here */}

                <div className='container'>
                    <h4 className='text-muted text-center'>Manage Users</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sl no</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Password</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1} <span>userid-{user.id}</span></th>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </section>
    );
};

export default ManageUser;
