import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const tianguisTable = pgTable("tianguis", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    alcaldia: varchar({ length: 255 }).notNull(),
    colonia: varchar({ length: 255 }).notNull(),
    ubicacion: varchar({ length: 255 }).notNull(),
    giro: varchar({ length: 255 }),
    dia: varchar({ length: 255 }).notNull(),
    horario: varchar({ length: 255 }).notNull(),
    latitud: varchar({ length: 255 }).notNull(),
    longitud: varchar({ length: 255 }).notNull(),
});
