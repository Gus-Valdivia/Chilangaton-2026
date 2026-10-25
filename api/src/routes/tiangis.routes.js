import { Router } from "express";

const router = Router();

router.get("/get-tianguis"); // Tianguis[]
router.get("/get-locals"); // Vendedores[], Productos[],
router.get("/get-locals-unregistered"); // (id producto) Vendedores[]

export default router;
