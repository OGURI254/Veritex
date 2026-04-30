from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import requests

app = FastAPI(title="Veritex AI Engine", version="1.0.0")

class QueryRequest(BaseModel):
    query: str
    user_id: int | None = None

class DocumentRequest(BaseModel):
    document_type: str
    context: dict

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Veritex AI Engine is running"}

@app.post("/api/ask")
def ask_legal_question(request: QueryRequest):
    """
    RAG Pipeline Endpoint:
    1. Generate embedding for `request.query` (using sentence-transformers)
    2. Search pgvector database for similar Kenyan case law / statutes
    3. Construct prompt with retrieved context
    4. Call Groq API for generation
    """
    # Mocking the RAG process for now
    mock_context = "Under the Employment Act of Kenya, an employer must give notice before termination."
    
    # Example Groq Call (Mocked until API key is provided)
    # response = requests.post(
    #     "https://api.groq.com/openai/v1/chat/completions",
    #     headers={"Authorization": f"Bearer {os.environ.get('GROQ_API_KEY')}"},
    #     json={
    #         "model": "mixtral-8x7b-32768",
    #         "messages": [
    #             {"role": "system", "content": "You are a Kenyan legal expert. Use the provided context to answer."},
    #             {"role": "user", "content": f"Context: {mock_context}\nQuestion: {request.query}"}
    #         ]
    #     }
    # )
    
    return {
        "answer": "Based on Kenyan employment law, an employer is generally required to provide notice before termination, except in cases of gross misconduct.",
        "sources": ["Employment Act, Cap 226, Section 35"]
    }

@app.post("/api/generate-document")
def generate_legal_document(request: DocumentRequest):
    """
    Generate structured legal documents (Contracts, Affidavits) using Groq.
    """
    return {
        "status": "success",
        "document_text": f"THIS {request.document_type.upper()} is made on this day...\n\n[MOCK GENERATED DOCUMENT]"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
