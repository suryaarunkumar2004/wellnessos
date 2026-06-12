# AltHeal-WellnessOS: Integrative Member Journey & Onboarding Platform

An enterprise-grade Spring Boot 3.x microservice backend architecture engineered for **AltHeal Holistic MD LLP**. This platform encapsulates the full 45-day advanced training curriculum, handling secure patient intake workflows, multi-dimensional biometric processing algorithms, and role-based JWT access parameters.

---

## 🛠️ Core Technology Stack
* **Runtime Language**: Java 17 / 21
* **Core Framework**: Spring Boot 3.x (Web, Security, Data JPA, Validation)
* **Data Layer**: MySQL 8.x / Hibernate ORM Core
* **Security Layer**: Stateless JWT (HS256 Cryptographic Signatures)
* **Testing Suites**: JUnit 5, Mockito Framework, MockMvc
* **Container Environment**: Multi-stage Docker Runtime Isolation

---

## 🚀 Execution Guide & Terminal Commands

### 1. Build and Compile Source Binaries Locally
Execute the clean build task using the local Maven wrapper utility script. This resolves external packages, checks input formatting constraints, and verifies compilation bounds:
```bash
./mvnw clean package
```

### 2. Run the Automated Testing Harness
Trigger the testing suite to execute local algorithm unit tests and isolated service layer Mockito overrides simultaneously:
```bash
./mvnw test
```

### 3. Start the Application Locally (Development Profile)
To launch the service bound to port `8080` targeting your local development database engine configurations, use the profile switch flag:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### 4. Package the App Using Multi-Stage Docker Build
Compile, run tests, isolate production code, and compress the service into a lightweight, non-root system environment using the build execution command:
```bash
docker build -t altheal-wellnessos:latest .
```

### 5. Deploy the Production Container Globally
Fire up the secure container instance locally or on cloud compute stacks. Inject your production database passwords directly using environment parameters:
```bash
docker run -d \
  -p 5000:5000 \
  -e ALTHEAL_DB_HOST=your-database-endpoint \
  -e ALTHEAL_DB_USER=your-production-user \
  -e ALTHEAL_DB_PASSWORD=your-secret-password \
  --name altheal-backend-service \
  altheal-wellnessos:latest
```

---

## 💻 React Frontend
A React user interface is already included in `frontend/` using Vite and React 19.

Local frontend development:
```bash
cd frontend
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` and proxies `/api/v1` requests to the backend at `http://localhost:5000`.

For integrated production packaging, build the frontend and let Maven copy the `frontend/dist` output into Spring Boot static resources:
```bash
./mvnw clean package
```

> Note: The frontend Maven build now installs Node.js `20.19.0` so the Vite React app compiles successfully during `mvnw package`.

Then start the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The compiled React app is served by the backend on `http://localhost:5000`.

---

## 🎯 Production Core REST Endpoint Schemas

### 🔓 Public Authorization Routes
* `POST /api/v1/members/onboard`: Validates JSON payloads, parses custom regex expressions, builds the member row, and seeds the One-to-One health index record.

### 🔒 Restricted Practitioner Routes (Requires Valid JWT with `COACH` or `DOCTOR` Role)
* `GET /api/v1/members/{id}`: Extracts individual member metrics masking restricted data rows via DTO structures.
* `GET /api/v1/members/coach/{coachId}`: Fetches paginated, sorted rosters of active patients linked to specific practitioner portfolios.
