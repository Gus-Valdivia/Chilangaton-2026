import { Router } from "express";
import {
    register,
    login,
    logout,
} from "../controllers/vendedores.controllers.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.post("/add-product"); // (Producto, idVendedor)
router.put("/update-product"); // (Producto, idVendedor, idProducto)
router.get("/get-products"); // (idVendedor) Producto

export default router;
