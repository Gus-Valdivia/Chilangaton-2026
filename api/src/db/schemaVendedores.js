import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const vendedoresTable = pgTable("vendedores", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nombre: varchar({ length: 255 }).notNull(),
    isValidated: boolean().notNull(),
    vendedor: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
});
