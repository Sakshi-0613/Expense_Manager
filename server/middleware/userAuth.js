import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode.id) {
            return res.status(401).json({ success: false, message: "Not Authorized. Invalid token." });
        }

        req.body.userId = tokenDecode.id; // ✅ Attach userId to req.body (As per your previous system)

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token." });
    }
};

export default userAuth;





// import jwt from "jsonwebtoken";


// const userAuth = async (req, res, next) => {
//     const token = req.cookies.token;
    

//     if (!token) {
        
//         return res.json({ success: false, message: "Not Authorized. Please log in again." });
//     }

//     try {
        
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        

//         if (tokenDecode.id) {
//             req.body.userId = tokenDecode.id; 
//              // Attach to req.userId instead of req.body
//         } else {
            
//             return res.json({ success: false, message: "Not Authorized. Please log in again." });
//         }

//         next();
//     } catch (error) {
        
//         res.json({ success: false, message: error.message });
//     }
// };

// export default userAuth;


