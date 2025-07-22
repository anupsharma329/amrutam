# amrutam

A modern, full-stack web application project using Next.js (React) for the frontend, Node.js/Express for the backend, Redis for caching, and Kubernetes for deployment and scaling. Nginx is used as a reverse proxy to route traffic.

---

## 🏗️ Project Structure

```
amrutam/
  ├── backend/      # Node.js/Express API server
  ├── frontend/     # Next.js (React) frontend app
  └── k8s/          # Kubernetes manifests (deployments, services, configs)
```

---

## 🚦 How It Works (Architecture)

- **Frontend**:  
  Built with Next.js, exported as a static site, and served by Nginx.
- **Backend**:  
  Node.js/Express API, connects to Redis for caching or session storage.
- **Nginx**:  
  Acts as a reverse proxy.  
  - Routes `/api/` requests to the backend.
  - Routes all other requests to the frontend.
- **Kubernetes**:  
  Manages and scales all services (frontend, backend, Redis, Nginx).
- **ArgoCD**:  
  Automates deployment from GitHub to Kubernetes.

---

## 🗺️ Traffic Flow

1. **User** → Nginx (LoadBalancer)
2. **Nginx**:
   - `/api/` → Backend service (Node.js)
   - `/` (everything else) → Frontend service (static Next.js)
3. **Backend** ↔ Redis (for caching/session)

---

## 🚀 Getting Started (Development)

### Frontend

```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npm run dev
# API runs on http://localhost:4000
```

---

## 🐳 Docker & Kubernetes

- **Build Docker images** for frontend and backend (see Dockerfiles in each folder).
- **Kubernetes manifests** are in the `k8s/` folder:
  - Deployments for backend, frontend, Redis, and Nginx
  - Services for internal communication
  - Nginx is exposed as a LoadBalancer

### Nginx Config (k8s/nginx-config.yaml)
- `/api/` → backend-service:80 (maps to backend pod on 4000)
- `/` → frontend-service:80 (serves static frontend)

---

## ⚡ CI/CD

- **GitHub Actions**:  
  - Lints, tests, builds, and pushes Docker images.
  - Updates Kubernetes manifests with new image tags.
  - ArgoCD syncs changes to the cluster automatically.

---

## 📂 Key Files

- `frontend/Dockerfile`: Builds and exports static Next.js site, serves with Nginx.
- `backend/Dockerfile`: Runs Node.js/Express API.
- `k8s/nginx-config.yaml`: Nginx reverse proxy rules.
- `k8s/nginx-deployment.yaml`: Nginx deployment and service.
- `k8s/services.yaml`: Internal services for backend and frontend.

---

## 📝 Notes

- All services except Nginx are internal-only (ClusterIP).
- Nginx is the only public entrypoint (LoadBalancer).
- Backend uses Redis for caching (see backend/src/index.js).

---

## 📊 Diagram

```
User
 │
 ▼
[Nginx LoadBalancer]
 ├── /api/ ──► [Backend Service] ──► [Redis]
 └── /      ──► [Frontend Service]
```





