import { createContext, useContext, useState, useEffect } from "react";
import {
    loginReq,
    registerReq,
    logoutReq,
    verifyTokenReq,
} from "../api/vendedor.js";

const VendedorContext = createContext();

export const VendedorProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await verifyTokenReq();
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const { data } = await loginReq(credentials);
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const { data } = await registerReq(userData);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        await logoutReq();
        setUser(null);
    };

    return (
        <VendedorContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </VendedorContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
