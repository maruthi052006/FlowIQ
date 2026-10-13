# FlowIQ — Enterprise Low-Code Workflow Automation & Data Platform

FlowIQ is a complete, production-ready enterprise SaaS application for visual workflow automation, dynamic data collection, and real-time AI processing.

---

## 🌟 Key Architecture & Features

### 🎨 Frontend (React 19 + Vite 5 + TypeScript 5.5)
- **Design System**: Warm Intelligent White theme (`#FAFAF9`), Google Fonts Satoshi & Inter, JetBrains Mono.
- **3D Visuals**: Three.js + React Three Fiber interactive hero 3D node scene & 3D metric cards.
- **Visual Canvas Editors**:
  - **Workflow Builder**: React Flow (`@xyflow/react`) DAG canvas with animated glowing connection edges, drag-and-drop node palette, and step inspector.
  - **Form Builder**: Visual form builder supporting conditional visibility, file attachments, and rating components.
- **Data & Real-time**: Zustand state management, TanStack React Query v5 server state, Axios client with JWT refresh token interceptors, and WebSockets (`ws/`).
- **Data Visualization**: Recharts streaming charts & virtualized data table for high submission throughput.

### ⚙️ Backend (Django 5 + DRF + Celery + Channels)
- **Modular Apps (12 Sub-systems)**: `accounts`, `workflows`, `forms_builder`, `submissions`, `ai_engine`, `integrations`, `notifications`, `approvals`, `analytics`, `audit`, `billing`, `documents`.
- **Workflow Engine**: Asynchronous step execution engine with step-by-step logging.
- **Security**: SimpleJWT authentication, RBAC role permissions, and request audit logging middleware.
- **API & Docs**: OpenAPI 3.0 schema with interactive Swagger UI documentation at `/api/docs/`.

---

## 🚀 Quick Start with Docker Compose

1. **Clone & Configure Environment**:
   ```bash
   cp .env.example .env
   ```

2. **Launch All Services**:
   ```bash
   docker compose up --build
   ```

3. **Access Application Endpoints**:
   - **Frontend App**: [http://localhost:3000](http://localhost:3000)
   - **Django API Gateway**: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)
   - **Swagger OpenAPI Docs**: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
   - **Reverse Proxy Nginx**: [http://localhost](http://localhost)

---

## 🛠 Local Development Setup

### Backend (Django 5)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

### Frontend (React 19)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 License
Proprietary Enterprise License — FlowIQ Platform Inc.
