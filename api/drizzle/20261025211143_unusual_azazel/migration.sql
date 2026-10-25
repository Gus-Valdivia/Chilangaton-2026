CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "categoria_producto" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categoria_producto_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"descripcion" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "categorias_vendedor" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categorias_vendedor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"descripcion" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "producto_categoria" (
	"id_producto" integer,
	"id_categoria_producto" integer,
	CONSTRAINT "producto_categoria_pkey" PRIMARY KEY("id_producto","id_categoria_producto")
);
--> statement-breakpoint
CREATE TABLE "productos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "productos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"imgUrl" varchar(255) NOT NULL,
	"nombre" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tianguis" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tianguis_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"alcaldia" varchar(255) NOT NULL,
	"colonia" varchar(255) NOT NULL,
	"ubicacion" varchar(255) NOT NULL,
	"giro" varchar(255),
	"dia" varchar(255) NOT NULL,
	"horario" varchar(255) NOT NULL,
	"latitud" varchar(255) NOT NULL,
	"longitud" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendedor_categoriasVendedor" (
	"id_vendedores" integer,
	"id_categorias_vendedor" integer,
	CONSTRAINT "vendedor_categoriasVendedor_pkey" PRIMARY KEY("id_vendedores","id_categorias_vendedor")
);
--> statement-breakpoint
CREATE TABLE "vendedores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vendedores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"isValidated" boolean NOT NULL,
	"vendedor" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "producto_categoria" ADD CONSTRAINT "producto_categoria_id_producto_productos_id_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id");--> statement-breakpoint
ALTER TABLE "producto_categoria" ADD CONSTRAINT "producto_categoria_YZnH5FXvTj2O_fkey" FOREIGN KEY ("id_categoria_producto") REFERENCES "categoria_producto"("id");--> statement-breakpoint
ALTER TABLE "vendedor_categoriasVendedor" ADD CONSTRAINT "vendedor_categoriasVendedor_id_vendedores_vendedores_id_fkey" FOREIGN KEY ("id_vendedores") REFERENCES "vendedores"("id");--> statement-breakpoint
ALTER TABLE "vendedor_categoriasVendedor" ADD CONSTRAINT "vendedor_categoriasVendedor_NRqIfDolveYT_fkey" FOREIGN KEY ("id_categorias_vendedor") REFERENCES "categorias_vendedor"("id");