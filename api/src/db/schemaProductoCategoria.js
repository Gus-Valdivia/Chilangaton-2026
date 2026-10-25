import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { productosTable } from "./schemaProductos.js";
import { categoriaProductoTable } from "./schemaCategoriasProducto.js";

export const usersTable = pgTable(
    "producto_categoria",
    {
        id_Producto: integer("id_producto").references(() => productosTable.id),
        id_CategoriaProducto: integer("id_categoria_producto").references(
            () => categoriaProductoTable.id,
        ),
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.id_Producto, table.id_CategoriaProducto],
        }),
    }),
);
