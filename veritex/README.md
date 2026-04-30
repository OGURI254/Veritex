# Veritex Platform

Veritex is a comprehensive Global Legal Rights & Justice Platform designed to democratize legal access. Built with a modern microservice architecture, Veritex integrates an AI-powered legal assistant, an immutable blockchain-ready evidence vault, and an escrow-based legal marketplace.

---

## Architecture Overview

The platform is split into two primary components:

1. **Veritex Core (Backend & Frontend)**
2. **Veritex AI Engine (RAG Microservice)**

### 1. Veritex Core (Laravel 11 + React PWA)
Located in the current directory (`veritex/`), this is the main monolithic application serving both the API gateway and the frontend Progressive Web App (PWA).

**Key Features:**
*   **Role-Based Access Control**: Separate dashboards for Citizens, Lawyers, and Administrators.
*   **Escrow Payment System**: Built using `bavix/laravel-wallet` and Safaricom M-Pesa to manage milestone-based legal payments securely.
*   **Evidence Vault**: Immutable file storage using AWS S3 (SSE-KMS) and SHA-256 cryptographic hashing to maintain legal audit trails.
*   **Frontend**: React.js driven by Inertia.js, structured as a Progressive Web App (PWA) for mobile accessibility.

### 2. Veritex AI Engine (Python FastAPI)
Located in `../veritex-ai/`, this lightweight microservice handles the intensive Retrieval-Augmented Generation (RAG) logic for the platform's AI Assistant.

**Key Features:**
*   **Framework**: FastAPI for blazing-fast, asynchronous endpoints.
*   **Vector Search**: Uses `pgvector` to store and query embeddings of the Kenyan Constitution and Case Law.
*   **Embeddings**: Local sentence-transformers for privacy-compliant document chunking and vectorization.
*   **LLM Inference**: Integrates with the **Groq API** (Llama 3 / Mixtral) to provide high-speed, localized legal answers and automated document generation (e.g., Affidavits, Contracts).

---

## Getting Started

### Prerequisites
*   PHP 8.3+
*   Composer
*   Node.js (v20+)
*   Python 3.10+
*   PostgreSQL (with `pgvector` extension enabled)
*   Redis (for background queues)

### 1. Setting up Veritex Core (Laravel)
```bash
# Navigate to the core directory
cd veritex/

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy the environment file and generate app key
cp .env.example .env
php artisan key:generate

# Configure your .env file with your PostgreSQL database details, then run migrations:
php artisan migrate

# Start the Laravel development server and Vite frontend compiler
php artisan serve
npm run dev
```

### 2. Setting up Veritex AI Engine (Python)
```bash
# Navigate to the AI microservice directory
cd ../veritex-ai/

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Security & Compliance
*   **Data Sovereignty**: Architecture designed to comply with the Kenya Data Protection Act 2019 and GDPR.
*   **Immutability**: All evidence uploads generate a SHA-256 hash saved in an append-only ledger format.
*   **Privacy**: Sensitive documents are chunked and vectorized locally before ever reaching an external LLM.

## License
Veritex is proprietary software. All rights reserved.
