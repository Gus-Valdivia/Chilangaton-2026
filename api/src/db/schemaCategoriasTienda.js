import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const categoriasVendedorTable = pgTable("categorias_vendedor", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 255 }).notNull(),
  descripcion: varchar({ length: 255 }).notNull(),
});
