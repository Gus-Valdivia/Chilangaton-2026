import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Valida la cookie al cargar la app (requiere endpoint /me en el backend)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me"); // Asegúrate de tener este endpoint
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
        }
        return res;
    };

    const register = async (userData) => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
        }
        return res;
    };

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
