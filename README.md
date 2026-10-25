# Chilangaton 2026

Este es el proyecto de Chilangaton 2026

Para poder usar el proyecto es necesario usar un docker compose para ejecutar la parte de la api y la parte web:

```bash
# docker compose up (para windows)
sudo docker compose up
```

Cuando el proyecto este ejecutandose habra servers ejecutandose:

API: `http://localhost:3000` con Express

Web: `http://localhost:5173` con React + Vite

En caso de hacer algun cambio a los Dockerfiles:

```bash
sudo docker compose build
sudo docker compose up
```

Para detener el proyecto:

```bash
sudo docker compose down
```

Para revisar los containers

```bash
sudo docker ps
```

Para poder ejecutar comandos dentro de los containers

```bash
sudo docker exec -it <nombre_container> sh
```

Entonces se abrira una consola dentro del container

Para poder revisar los logs del container

```bash
sudo docker compose logs <nombre_container>
```

- Comercio popular y barrial
  Contar un medio para saber como se ubica, como opera y todo eso

## Requerimientos

Sistema para poder

### Negocio

Es solo para tianguis no para negocios pequeños en general

- Hora de llegada
- Hora de salida
- Activo: boolean
- Menu con precios
- Tipos de pago
- Nombre del negocio
- Google maps para irte a la ubicacion
- Contacto
- Iniciar sesion
- Crear cuenta
    - Subir el documento de validez para los tianguis
- Integrantes
- Folio

Si tienen que estar registrados por medio de la alcaldia

No hay informacion de nada, si tendriamos que hacer un foro o algo asi para poder mostrar todo lo que estamos haciendo

**Negocios irregulares para obtener difusion para que se regularizen**
