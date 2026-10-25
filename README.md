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