const onlyUserAccess = async (req, res, next) => {
    try {
        if (req.user.role !== 0) { // Check if the role is not 0
            return res.status(403).json({
                success: false,
                message: "You don't have permission to access this page becaouse this is userpage"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
    next();
};