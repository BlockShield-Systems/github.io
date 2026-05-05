# AI-Techart & Dynamics — From Legacy to Intelligent

Official repository for the public portfolio website of **Demian Lienert** and the technical web presence behind:

- **AI-Techart & Dynamics**
- **Twisted_4_Chaos**
- **BlockShield Systems**

**Live website:** https://ai-techart.com/
**Automation environment:** https://n8n.ai-techart.com/

---

## Overview

This repository contains the source code for my public portfolio website, built with a modern frontend stack and connected to a hardened serverless contact workflow.

The project is designed to present a hybrid technical profile that combines:

- modern frontend development
- AI workflow design and automation thinking
- creative AI systems and visual direction
- platform-oriented infrastructure thinking
- secure and structured delivery

It is not intended as a simple static portfolio only. It also reflects how I approach real-world technical systems: modularly, operationally, and with production-oriented thinking.

---

## What this repository currently covers

The project currently includes:

- a modular portfolio frontend built with **Vite**, **TypeScript**, and **Bootstrap**
- structured sections for workflows, technical focus, services, projects, transformations, and contact
- a hardened contact form flow with:
  - frontend validation
  - honeypot spam protection
  - Cloudflare Worker backend
  - Resend-based email delivery
- environment-based frontend endpoint configuration
- deployment-oriented project structure for public delivery

---

## Public Technical Positioning

This project represents a technical profile built around several connected domains:

### Modern Web Development
Production-oriented frontend implementation with a focus on structure, maintainability, clean UX, and modular delivery.

### AI Workflow Systems
Design and implementation of structured AI workflows for research, reporting, information processing, and multi-step automation.

### Creative AI & Visual Systems
Use of AI-supported visual generation, transformation concepts, and cyberpunk-inspired creative direction as part of a broader technical and branding ecosystem.

### Infrastructure & Platform Thinking
System-oriented thinking shaped by long-term hands-on work across administration, Linux, networking, automation, service design, and platform architecture.

### Secure, Practical Engineering Mindset
A focus on solutions that are not only visually appealing or functional on the surface, but also technically coherent, maintainable, and operationally meaningful.

---

## Self-Hosted AI & Automation Environment

A visible part of the public technical ecosystem is the self-hosted automation and AI environment available through:

**https://n8n.ai-techart.com/**

This environment is used as a private lab and execution layer for workflow automation, local AI integration, and infrastructure-backed experimentation.

### Current environment components

- **n8n** for workflow automation and orchestration
- **Docker Compose** for service composition
- **WSL2** as local Linux-based runtime environment
- **Ollama** for local model execution
- **Qwen** and **nomic-embed** for local LLM and embedding use cases
- **PostgreSQL** for structured persistence
- **Redis** for fast in-memory service support
- **Caddy** for reverse proxy and HTTPS-facing routing

### What this demonstrates technically

This setup reflects practical ability in areas such as:

- self-hosted service architecture
- containerized service composition
- local AI deployment and orchestration
- reverse proxy and service routing
- Linux-oriented runtime operation
- workflow system design
- multi-service integration thinking
- platform-minded technical experimentation

This infrastructure is intentionally not exposed as a generic public toy setup. It exists as a serious technical lab environment for building and validating workflow-based systems.

---

## Contact Workflow Architecture

The website contact flow is not handled by exposing a direct personal mailbox on the frontend.

Instead, it uses a structured serverless pipeline:

1. The frontend submits validated form data to a **Cloudflare Worker**
2. The Worker validates and sanitizes the payload
3. A honeypot field helps detect low-quality automated spam
4. The Worker sends the message through **Resend**
5. The actual destination mailbox remains protected from direct public exposure

### Why this matters

This approach demonstrates practical understanding of:

- serverless backend patterns
- API-based email delivery
- separation between public frontend and private communication channels
- input validation and abuse reduction
- deployment-safe environment configuration

---

## Tech Stack

### Frontend
- **Vite**
- **TypeScript**
- **Bootstrap 5**
- **Bootstrap Icons**
- **Modular section-based architecture**
- **Responsive layout implementation**

### Contact / Backend Integration
- **Cloudflare Workers**
- **Resend**
- **Environment-based endpoint configuration**
- **Honeypot-based spam reduction**
- **CORS-aware request handling**

### Self-Hosted / Automation / AI Lab
- **n8n**
- **Docker Compose**
- **WSL2**
- **Ollama**
- **Qwen**
- **nomic-embed**
- **PostgreSQL**
- **Redis**
- **Caddy**

### Delivery / Tooling
- **GitHub**
- **GitHub Pages**
- **npm**
- **TypeScript compiler**
- **Vite build pipeline**

---

## Core Technical Themes

The project is intended to make the following technical themes clearly visible:

- modern TypeScript-based frontend development
- modular UI composition and maintainable project structure
- AI workflow architecture and automation logic
- self-hosted service operation
- local AI integration
- Linux- and platform-oriented technical work
- API integration and serverless backend patterns
- secure and structured communication flows
- systems thinking beyond isolated coding tasks

---

## Website Sections

The current website includes:

- **Hero / positioning**
- **Agentic Workflows Hub**
- **Skills & Technical Focus**
- **Selected Projects & Proof**
- **Services**
- **Transformations Gallery**
- **About**
- **Contact**

These sections are intended to show not only output, but also technical reasoning, workflow structure, and proof of practical implementation.

---

## Repository Structure

```text
.
├─ public/
│  ├─ images/
│  ├─ favicon.svg
│  └─ ...
├─ src/
│  ├─ css/
│  ├─ sections/
│  ├─ main.ts
│  └─ ...
├─ ai-techart-contact-worker/
│  ├─ src/
│  │  └─ index.ts
│  ├─ wrangler.jsonc
│  └─ ...
├─ .env.example
├─ .env.production
├─ package.json
└─ README.md
```

---

## Local Development

### Frontend

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a local environment file if needed:

```env
VITE_CONTACT_ENDPOINT=https://your-worker-url/submit
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Contact Worker

The contact worker is maintained in:

```text
ai-techart-contact-worker/
```

Typical workflow:

```bash
cd ai-techart-contact-worker
npm install
wrangler secret put RESEND_API_KEY
wrangler secret put CONTACT_TO_EMAIL
wrangler secret put CONTACT_FROM_EMAIL
wrangler deploy
```

---

## Deployment

### Frontend

The frontend is built with Vite and intended for static deployment, including **GitHub Pages**.

### Contact backend

The contact backend is deployed separately as a **Cloudflare Worker**.

This separation keeps the frontend static and lightweight while still allowing a structured backend-assisted contact flow.

---

## Why this project matters

This repository is meant to show more than visual presentation.

It demonstrates a combination of:

- frontend implementation
- technical communication
- structured AI workflow thinking
- service integration
- self-hosted experimentation
- infrastructure awareness
- secure contact architecture
- practical delivery mindset

The goal is to present a profile that is not limited to one narrow role, but clearly capable across development, automation, platform thinking, and technically meaningful digital systems.

---

## Contact

For project inquiries, collaboration, or technical exchange:

- Website: https://ai-techart.com/
- Public privacy/legal contact: privacy@ai-techart.com

The primary direct mailbox itself is intentionally not used as a raw public frontend target.

---

## License

This repository contains personal portfolio code, branding, and presentation material.

Unless explicitly stated otherwise, all rights remain with the repository owner.
```