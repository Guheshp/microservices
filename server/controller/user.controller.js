const db = require("../models/index")
const User = db.user

const get_profiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const get_all_users = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({ success: true, message: "all User data fetched successfully", data: users });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


const updateUser = async (req, res) => {
    const { id, email, role, password } = req.body;

    // console.log(`Received request to update user with ID: ${id}`);
    // console.log(`Request body: ${JSON.stringify(req.body)}`);

    try {
        // Check for undefined or null values for required fields
        if (id === undefined || email === undefined || role === undefined) {
            // console.log(`Missing fields in request: id: ${id}, email: ${email}, role: ${role}`); // Debugging log
            return res.status(400).json({
                success: false,
                message: "User id, email, and role are required"
            });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User ID not found' });
        }

        // Validate email format (basic validation)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        // Update user information
        user.email = email;
        user.role = role;

        // Update password only if a new one is provided
        if (password) {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(`Error updating user: ${error.message}`); // Debugging log
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the user'
        });
    }
};


module.exports = {
    updateUser
};



module.exports = {
    get_profiles,
    get_all_users,
    updateUser

};
