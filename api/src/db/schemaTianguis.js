import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const tianguisTable = pgTable("tianguis", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 255 }).notNull(),
  localizacion: varchar({ length: 255 }).notNull().unique(),
});
