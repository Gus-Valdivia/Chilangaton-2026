import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id_Producto: integer().primaryKey().ForeignKey(),
  id_CategoriaProducto: integer().primaryKey().ForeignKey(),
});
