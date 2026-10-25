import fs from "node:fs";
import { db } from "../db.js";
import { tianguisTable } from "./schemaTianguis.js";

const CHUNK_SIZE = 500;
const RESET = process.argv.includes("--reset");

const clean = (value) => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
};

const main = async () => {
  const raw = fs.readFileSync(new URL("./tianguis.json", import.meta.url), "utf-8");
  const { fields, records } = JSON.parse(raw);

  // Nombres de columnas según el JSON
  const columns = fields.map((f) => f.id);
  const required = ["alcaldia", "colonia", "ubicacion", "dia", "horario", "latitud", "longitud"];

  const rows = [];

  for (const record of records) {
    const row = {};
    columns.forEach((col, i) => {
      if (col !== "_id") row[col] = clean(record[i]);
    });

    if (required.some((key) => !row[key])) {
      console.warn(`Registro omitido (faltan datos): _id ${record[0]}`);
      continue;
    }

    // "NA" en giro se guarda como null
    if (!row.giro || row.giro.toUpperCase() === "NA") row.giro = null;

    rows.push(row);
  }

  console.log(`Registros en archivo: ${records.length} | a insertar: ${rows.length}`);

  if (RESET) {
    await db.delete(tianguisTable);
    console.log("Tabla vaciada");
  }

  let processed = 0;
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    const chunk = rows.slice(i, i + CHUNK_SIZE);
    await db.insert(tianguisTable).values(chunk);
    processed += chunk.length;
    console.log(`Insertados ${processed}/${rows.length}`);
  }

  console.log("Seed completado");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error en el seed:", error);
    process.exit(1);
  });