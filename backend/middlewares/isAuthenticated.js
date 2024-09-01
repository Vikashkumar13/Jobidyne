import jwt from "jsonwebtoken";

//USER->AUTHENTICATION MIDDLEWARE
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        //validation-token
        if (!token) {
            return res.status(401).json({ message: "User not authenticated", success: false, })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        //validation-decoded token
        if (!decode) {
            return res.status(401).json({ message: "Invalid token", success: false })
        };
        req.id = decode.userId;
        next();
    }
    catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;