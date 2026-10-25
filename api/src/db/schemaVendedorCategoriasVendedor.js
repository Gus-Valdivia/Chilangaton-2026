import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const vendedorCategoriasVendedorTable = pgTable("vendedor_categoriasVendedor", {
  id_vendedores: integer().primaryKey().foreignKey(),
  id_categoriasVendedor: integer().primaryKey().foreignKey(),
});
