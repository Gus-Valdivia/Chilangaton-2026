import bcrypt from "bcrypt";
import { generateToken, COOKIE_OPTIONS } from "../lib/jwt.js";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { vendedoresTable } from "../db/schema.js";


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


// Columnas públicas (sin password)
const publicColumns = {
  id: vendedoresTable.id,
  nombre: vendedoresTable.nombre,
  isValidated: vendedoresTable.isValidated,
  vendedor: vendedoresTable.vendedor,
  email: vendedoresTable.email,
};

const parseId = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "ID inválido" });
    return null;
  }
  return id;
};

// GET /vendedores
export const getAll = async (req, res) => {
  try {
    const vendedores = await db.select(publicColumns).from(vendedoresTable);
    res.status(200).json(vendedores);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// GET /vendedores/:id
export const getOne = async (req, res) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const [vendedor] = await db
      .select(publicColumns)
      .from(vendedoresTable)
      .where(eq(vendedoresTable.id, id));

    if (!vendedor) return res.status(404).json({ message: "Vendedor no encontrado" });
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// POST /vendedores
export const create = async (req, res) => {
  try {
    const { nombre, vendedor, email, password, isValidated = false } = req.body;

    if (!nombre || !vendedor || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [created] = await db
      .insert(vendedoresTable)
      .values({ nombre, vendedor, email, password: hashedPassword, isValidated })
      .returning(publicColumns);

    res.status(201).json({ message: "Vendedor creado", vendedor: created });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// PUT /vendedores/:id  (reemplazo completo: todos los campos requeridos)
export const replace = async (req, res) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const { nombre, vendedor, email, password, isValidated } = req.body;

    if (!nombre || !vendedor || !email || !password || typeof isValidated !== "boolean") {
      return res.status(400).json({
        message: "PUT requiere nombre, vendedor, email, password e isValidated (boolean)",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [updated] = await db
      .update(vendedoresTable)
      .set({ nombre, vendedor, email, password: hashedPassword, isValidated })
      .where(eq(vendedoresTable.id, id))
      .returning(publicColumns);

    if (!updated) return res.status(404).json({ message: "Vendedor no encontrado" });
    res.status(200).json({ message: "Vendedor actualizado", vendedor: updated });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// PATCH /vendedores/:id  (actualización parcial)
export const update = async (req, res) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const allowed = ["nombre", "vendedor", "email", "password", "isValidated"];
    const changes = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) changes[key] = req.body[key];
    }

    if (Object.keys(changes).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }

    const [updated] = await db
      .update(vendedoresTable)
      .set(changes)
      .where(eq(vendedoresTable.id, id))
      .returning(publicColumns);

    if (!updated) return res.status(404).json({ message: "Vendedor no encontrado" });
    res.status(200).json({ message: "Vendedor actualizado", vendedor: updated });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// DELETE /vendedores/:id
export const remove = async (req, res) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const [deleted] = await db
      .delete(vendedoresTable)
      .where(eq(vendedoresTable.id, id))
      .returning({ id: vendedoresTable.id });

    if (!deleted) return res.status(404).json({ message: "Vendedor no encontrado" });
    res.status(200).json({ message: "Vendedor eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};