import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_aqui";

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24, // 1 día
};

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const protect = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token)
        return res
            .status(401)
            .json({ message: "Acceso denegado. No hay token." });

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.clearCookie("jwt", COOKIE_OPTIONS);
        res.status(403).json({ message: "Token inválido o expirado" });
    }
};
