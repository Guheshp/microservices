const db = require("../../models/index")
const Permission = db.permissionmodel

// add permission 
const addPermission = async (req, res) => {
    try {
        const { permission_name, is_default } = req.body;

        const existingPermission = await Permission.findOne({ where: { permission_name } });
        if (existingPermission) {
            return res.status(400).json({ success: false, message: 'Permission name already exist ' })
        }

        // Create a new permission record in the database
        const permission = await Permission.create({ permission_name, is_default });
        res.status(201).json({ success: true, data: permission });
    } catch (error) {
        // Handle errors
        console.error("Error adding permission:", error);
        res.status(500).json({ success: false, error: "Failed to add permission" });
    }
}

// get permission 
const getPermissions = async (req, res) => {
    try {

        const permission = await Permission.findAll()

        return res.status(200).json({
            success: true,
            message: "Permission Fetched Successfully!",
            data: permission
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
// delete permission 
const deletePermissions = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Permission ID is required"
        });
    }

    try {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            return res.status(404).json({
                message: "Not Found",
                status: 404,
                id: id
            });
        }
        await permission.destroy();

        return res.status(200).json({
            success: true,
            message: "Permission deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting permission:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// update permission 
const updatePermissions = async (req, res) => {
    try {
        const { id, permission_name, is_default } = req.body;

        // Validate the input
        if (!id || !permission_name) {
            return res.status(400).json({ success: false, message: 'Permission ID and name are required' });
        }

        // Check if the permission ID exists
        const existingPermission = await Permission.findByPk(id);
        if (!existingPermission) {
            return res.status(404).json({ success: false, message: 'Permission ID not found' });
        }

        // Check if the permission name is already assigned to another permission
        const isNameAssigned = await Permission.findOne({
            where: {
                id: { [db.Sequelize.Op.ne]: id },
                permission_name: permission_name
            }
        });
        if (isNameAssigned) {
            return res.status(400).json({ success: false, message: 'Permission name is already assigned to another permission' });
        }

        // Update the permission
        existingPermission.permission_name = permission_name;
        existingPermission.is_default = is_default;

        await existingPermission.save();
        return res.status(200).json({ success: true, message: 'Permission updated successfully', data: existingPermission });
    } catch (error) {
        // Handle errors
        console.error("Error updating permission:", error);
        return res.status(500).json({ success: false, error: "Failed to update permission", error });
    }
}

module.exports = {
    addPermission,
    getPermissions,
    deletePermissions,
    updatePermissions

};