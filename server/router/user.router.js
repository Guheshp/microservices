const usercontroller = require('../controller/user.controller')
const express = require("express")
const verifyToken = require("../middleware/authMiddleware")
const { onlyAdminAccess } = require("../middleware/adminmiddleware")

const router = express.Router()

// authenticated route 
router.get('/profile', verifyToken, usercontroller.get_profiles);
router.get('/all-users', verifyToken, onlyAdminAccess, usercontroller.get_all_users);
router.post('/update-user', verifyToken, onlyAdminAccess, usercontroller.updateUser);

// router.get('/loggedInuser', verifyToken, usercontroller.getLoggedInUserProfile)



module.exports = router;