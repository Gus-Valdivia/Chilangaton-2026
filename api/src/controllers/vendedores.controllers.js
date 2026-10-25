import bcrypt from "bcrypt";
import { generateToken, COOKIE_OPTIONS } from "../lib/jwt.js";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        // const user = await User.create({ email, password: hashedPassword });
        const user = { id: Date.now(), email }; // Mock

        const token = generateToken({ id: user.id, email: user.email });

        res.cookie("jwt", token, COOKIE_OPTIONS);
        res.status(201).json({
            message: "Usuario registrado",
            user: { id: user.id, email: user.email },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // const user = await User.findOne({ email });
        const user = { id: 1, email, password: "hash_guardado_aqui" }; // Mock

        if (!user)
            return res.status(401).json({ message: "Credenciales inválidas" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Credenciales inválidas" });

        const token = generateToken({ id: user.id, email: user.email });

        res.cookie("jwt", token, COOKIE_OPTIONS);
        res.status(200).json({
            message: "Login exitoso",
            user: { id: user.id, email: user.email },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwt", COOKIE_OPTIONS);
    res.status(200).json({ message: "Sesión cerrada" });
};
