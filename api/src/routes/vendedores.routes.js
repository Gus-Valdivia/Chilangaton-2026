import { Router } from "express";
import {
  register,
  login,
  logout,
  getAll,
  getOne,
  create,
  replace,
  update,
  remove,
} from "../controllers/vendedores.controllers.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.post("/add-product"); // (Producto)
router.put("/update-product"); // (Producto)
router.get("/get-products");
router.get("/", getAll);        // GET    /vendedores
router.get("/:id", getOne);     // GET    /vendedores/:id
router.post("/", create);       // POST   /vendedores
router.put("/:id", replace);    // PUT    /vendedores/:id
router.patch("/:id", update);   // PATCH  /vendedores/:id
router.delete("/:id", remove);  // DELETE /vendedores/:id

export default router;
