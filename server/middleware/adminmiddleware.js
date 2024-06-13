const onlyAdminAccess = async (req, res, next) => {
    try {
        if (req.user.role != 1) {
            return res.status(400).json({
                success: false,
                message: "You dont have permission to access this page"
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'something went wronge'
        })
    }
    return next()
}

module.exports = {
    onlyAdminAccess
}