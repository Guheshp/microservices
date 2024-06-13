// const jwt = require("jsonwebtoken")

// const verifyToken = async (req, res, next) => {
//     const token = req.body.token || req.query.token || req.headers["authorization"];

//     if (!token) {
//         return res.status(403).json({
//             success: false,
//             message: 'A token is required for authentication'
//         })
//     }
//     try {
//         const bearer = token.split(' ')
//         // const bearerToken = bearer[1]
//         const bearerToken = bearer[1] || bearer[0];

//         const decodedData = jwt.verify(bearerToken, process.env.ACCESS_SECRET_TOKEN);
//         console.log("decodedData", decodedData)
//         req.user = decodedData;

//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid token'
//         })
//     }
//     return next()
// }

// module.exports = verifyToken;


const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'A token is required for authentication'
        });
    }

    try {
        const bearer = token.split(' ');
        const bearerToken = bearer[1] || bearer[0];

        // Decode the token to get its payload
        const decodedData = jwt.decode(bearerToken, { complete: true });

        // Check if the token is expired
        if (decodedData.payload.exp < Date.now() / 1000) {
            return res.status(401).json({
                success: false,
                message: 'Token has expired'
            });
        }

        // Verify the token
        jwt.verify(bearerToken, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
            req.user = decoded;
            return next();
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = verifyToken;
