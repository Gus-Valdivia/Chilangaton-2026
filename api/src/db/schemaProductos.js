import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const productosTable = pgTable("productos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  imgUrl: varchar({ length: 255 }).notNull(),
  nombre: varchar({ length: 255 }).notNull(),
});
