import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;  

        if (!userId) {
            return res.json({ success: false, message: "User ID is missing in request" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not Found" });
        }

        res.json({
            success: true,
            userData: {
                userId: user._id,   
                name: user.name,
                isAccountVerified: user.isAccountVerified  
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
