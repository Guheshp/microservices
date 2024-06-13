// // import React, { useEffect, useState } from 'react';
// // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import { Navbar, Nav, Container } from 'react-bootstrap';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import axios from 'axios';

// // function Header() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const isLoggedIn = !!localStorage.getItem('token');

// //   const handleLogout = () => {
// //     console.log("token", isLoggedIn)
// //     localStorage.removeItem('token');
// //     console.log("logout worked")
// //     navigate('/login', { state: { successMessage: 'You have been successfully logged out.' } });
// //   };

// //   const fetchUserProfile = async () => {
// //     try {
// //       const token = localStorage.getItem('token'); // Get the token from localStorage
// //       const response = await axios.get('http://localhost:2001/api/user/profiles', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
// //           'Content-Type': 'application/json'
// //         }
// //       });
// //       console.log("user profile", response)
// //       setUser(response.data.user);
// //     } catch (error) {
// //       console.error('Failed to fetch user profile:', error);
// //       throw error;
// //     }
// //   };

// //   useEffect(() => {
// //     if (isLoggedIn) {
// //       fetchUserProfile();
// //     }
// //   }, [isLoggedIn])

// //   return (
// //     <>
// //       <Navbar expand="lg" className="bg-body-tertiary">
// //         <ToastContainer />
// //         <Container>
// //           <Navbar.Brand as={Link} to="/">RBAC</Navbar.Brand>
// //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //           <Navbar.Collapse id="basic-navbar-nav">
// //             <Nav className="me-auto">
// //               {isLoggedIn && (
// //                 <>
// //                   <Nav.Link as={Link} to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Nav.Link>
// //                   <Nav.Link as={Link} to="/manageuser" className={location.pathname === '/manageuser' ? 'active' : ''}>Manage User</Nav.Link>


// //                 </>
// //               )}

// //               {isLoggedIn ? (
// //                 <>
// //                   <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
// //                   <p className="nav-link disabled text-dark fw-bolder">
// //                     Welcome, {user ? user.email : 'NOT FOUND'} {/* Display user's email or a loading message */}
// //                   </p>
// //                 </>

// //               ) : (
// //                 <>
// //                   <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Nav.Link>
// //                   <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
// //                 </>

// //               )}
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>
// //     </>
// //   );
// // }

// // export default Header;

// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// function Header() {
//   const location = useLocation();
//   const [userRole, setUserRole] = useState();
//   const navigate = useNavigate();
//   const [user, setUsers] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const isLoggedIn = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     console.log("token", isLoggedIn)
//     localStorage.removeItem('token');
//     console.log("logout worked")
//     navigate('/login', { state: { successMessage: 'You have been successfully logged out.' } });
//   };

//   const fetchUserdata = async (token) => {
//     try {
//       const headers = {
//         'Authorization': `Bearer ${token}`
//       };

//       const response = await axios.get('http://localhost:2001/api/user/profile', { headers });

//       // Set user data to state
//       const userData = response.data.user;
//       setUsers(userData);
//       setUserRole(userData.role);


//     } catch (error) {
//       let message = 'Error fetching data';
//       if (error.response) {
//         if (error.response.status === 401) {
//           message = 'Session expired, please log in again';
//           // Optionally, clear token and redirect to login page
//           localStorage.removeItem('token');
//           navigate('/login');
//         } else if (error.response.data && error.response.data.error) {
//           message = error.response.data.error;
//         }
//       }
//       console.error('Error fetching data:', message);
//       setErrorMessage(message);
//     }
//   };


//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchUserdata();
//     }
//   }, [isLoggedIn])

//   return (
//     <>
//       <Navbar expand="lg" className="bg-body-tertiary">
//         <ToastContainer />
//         <Container>
//           <Navbar.Brand as={Link} to="/">RBAC</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               {isLoggedIn && (
//                 <>
//                   <Nav.Link as={Link} to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Nav.Link>
//                   {userRole?.role === 1 && (
//                     <>
//                       <Nav.Link as={Link} to="/manageuser" className={location.pathname === '/manageuser' ? 'active' : ''}>Manage User</Nav.Link>
//                       <p></p>
//                       <p className="nav-link disabled text-dark fw-bolder">
//                         Welcome ADMIN, {user ? user.email : 'Loading...'}
//                       </p>
//                     </>
//                   )}
//                   {userRole?.role === 0 && (
//                     <>
//                       {/* <Nav.Link as={Link} to="/user-dashboard" className={location.pathname === '/user-dashboard' ? 'active' : ''}>User Dashboard</Nav.Link> */}

//                     </>
//                   )}
//                 </>
//               )}
//               {isLoggedIn ? (
//                 <>
//                   <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

//                 </>
//               ) : (
//                 <>
//                   <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Nav.Link>
//                   <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default Header;

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { state: { successMessage: 'You have been successfully logged out.' } });
  };

  const fetchUserdata = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:2001/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserdata();
    }
  }, [isLoggedIn]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">RBAC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && user && (
              <>
                <Nav.Link as={Link} to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Nav.Link>
                {user.role === 1 && <Nav.Link as={Link} to="/manageuser" className={location.pathname === '/manageuser' ? 'active' : ''}>Manage User</Nav.Link>}
                <p className="nav-link disabled text-dark fw-bolder">
                  Welcome, {user.email}
                </p>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Nav.Link>
                <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
