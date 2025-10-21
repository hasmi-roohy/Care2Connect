import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "not authorised login" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // Corrected: Attach userId directly to the request object
        req.userId = token_decode.id;

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export default authUser;
