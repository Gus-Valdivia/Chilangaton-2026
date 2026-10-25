import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const categoriaProductoTable = pgTable("categoria_producto", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 255 }).notNull(),
  descripcion: varchar({ length: 255 }).notNull().unique(),
});
