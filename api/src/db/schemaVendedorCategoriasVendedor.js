import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { categoriasVendedorTable } from "./schemaCategoriasTienda.js";
import { vendedoresTable } from "./schemaVendedores.js";

export const vendedorCategoriasVendedorTable = pgTable(
    "vendedor_categoriasVendedor",
    {
        id_vendedores: integer("id_vendedores").references(
            () => vendedoresTable.id,
        ),
        id_categoriasVendedor: integer("id_categorias_vendedor").references(
            () => categoriasVendedorTable.id,
        ),
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.id_vendedores, table.id_categoriasVendedor],
        }),
    }),
);
