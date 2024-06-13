const express = require("express")
const { route } = require("./auth.router")
const verifyToken = require("../middleware/authMiddleware")
const { onlyAdminAccess } = require("../middleware/adminmiddleware")

const permissioncontroller = require('../controller/admin/permission.controller')
const router = express.Router()

router.post('/add-permission', verifyToken, onlyAdminAccess, permissioncontroller.addPermission)
router.get('/get-permissions', verifyToken, onlyAdminAccess, permissioncontroller.getPermissions)
router.post('/delete-permissions', verifyToken, onlyAdminAccess, permissioncontroller.deletePermissions)
router.post('/update-permissions', verifyToken, onlyAdminAccess, permissioncontroller.updatePermissions)

module.exports = router