# Matheus Alves — Portfolio (Editorial & Brutalist Architecture)

<p align="left">
  <a href="https://github.com/Matheus-Allvz/home/actions/workflows/ci.yml"><img src="https://github.com/Matheus-Allvz/home/actions/workflows/ci.yml/badge.svg" alt="CI & Quality Gate"/></a>
  <a href="https://matheus-alves.dev"><img src="https://img.shields.io/badge/Production-Live-D63A2F?style=flat-square&logo=google-chrome&logoColor=white" alt="Live Site"/></a>
  <img src="https://img.shields.io/badge/Stack-C%23_.NET_8_%2F_Docker_%2F_Nginx-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt="Stack"/>
</p>

Interactive portfolio and presentation hub for **Matheus Alves da Costa**, Backend Software Engineer specializing in C# (.NET 8), Microservices, High-Throughput Distributed Systems, RabbitMQ, PostgreSQL, and Clean Architecture.

Live: [https://matheus-alves.dev/](https://matheus-alves.dev/)

---

## 🛠️ Tech Stack & Engineering Highlights

- **Languages & Frameworks:** C# (.NET 8), ASP.NET Core, EF Core, Dapper
- **Messaging & Queues:** RabbitMQ, Background Workers, Outbox Pattern
- **Databases:** PostgreSQL, SQL Server, Redis
- **Architecture:** Clean Architecture, DDD, CQRS, Idempotency & Fault-Tolerant Pipelines
- **Design & Experience:** Brutalist Swiss Typography, GSAP Kinetic Physics, Web Audio Synthesizer Engine, Custom Cursor & CRT Retro Channel Visuals

---

## 📁 Project Structure

`
├── css/
│   └── style.css          # Editorial Swiss & Brutalist design system
├── js/
│   └── main.js            # Preloader, magnetic cursor, Web Audio synth, HUD
├── img/                   # Engineering badges, SVG architecture diagrams & icons
├── favicon.ico            # Site favicon
├── index.html             # Main entrypoint
├── nginx.conf             # Production Nginx reverse-proxy configuration
├── Dockerfile             # Production container
└── docker-compose.yml     # Multi-container orchestration
`

---

## 🚀 Running Locally

You can serve the static files with any HTTP server:

`ash
# Python
python -m http.server 8080

# Or with Docker
docker compose up -d
`

---

## 📜 License

MIT License &copy; 2026 Matheus Alves.
