import { Router } from "express";

const router = Router();

router.get("/get-tianguis"); // Tianguis[]
router.get("/get-mercados");
router.get("/get-locals"); // (tianguis|mercado) Vendedores[], Productos[]

export default router;
