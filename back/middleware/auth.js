import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Authorization token missing or invalid." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // JWT_SECRET should be in .env
        req.userId = decodedToken.id;  // Attach the decoded userId to the request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

export default authMiddleware;