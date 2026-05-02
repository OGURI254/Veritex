<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DocumentAIController extends Controller
{
    public function chat(Request $request)
    {
        $system = $request->input('system');
        $messages = $request->input('messages', []);

        $groqMessages = [];
        if ($system) {
            $groqMessages[] = ['role' => 'system', 'content' => $system];
        }
        
        foreach ($messages as $msg) {
            $groqMessages[] = ['role' => $msg['role'] ?? 'user', 'content' => $msg['content'] ?? ''];
        }

        try {
            $response = Http::withToken(env('GROQ_API_KEY'))
                ->timeout(60)
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => 'llama3-70b-8192', // Using LLaMA 3 70B as standard
                    'messages' => $groqMessages,
                    'max_tokens' => 2000,
                ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content');
                return response()->json(['content' => $content]);
            }

            Log::error('Groq API Error', ['response' => $response->json()]);
            return response()->json(['error' => 'Unable to connect to AI (Groq API Error).'], 500);

        } catch (\Exception $e) {
            Log::error('Groq API Exception', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Unable to connect to AI.'], 500);
        }
    }
}
