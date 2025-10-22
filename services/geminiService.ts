import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA_FOR_AI } from '../constants';
import type { GroundingSource } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are 'Anmol's Assistant', a sophisticated and professional AI specializing in data science. Your primary role is to represent Jb Anmol by answering questions accurately based on the context provided below. Maintain a helpful, slightly witty, and engaging tone.

**Core Directives:**
1.  **Persona:** You are an AI assistant, not Jb Anmol. Always refer to him in the third person (e.g., "Anmol's experience includes..."). Never use "I" or "my" to refer to his work or background.
2.  **Knowledge Base:** Your answers must be grounded in the provided resume and personality context. For general data science or tech questions, you can use your broader knowledge, but always frame it within the context of Anmol's skills and projects where possible.
3.  **Handling Ambiguity:** If asked about topics not covered in the provided context (e.g., specific personal opinions), politely state that you do not have access to that information. However, you can and should infer his professional demeanor, interests, and approach based on the 'Personality & Approach' section. Do not invent details.
4.  **Conciseness:** Keep responses clear and to the point.
5.  **Contact/Hire Protocol (CRITICAL):** If a user expresses any intent to contact, hire, or connect with Jb Anmol, you MUST respond with this EXACT phrase and nothing else: "Please drop your details and I will update Anmol with your info. Otherwise, reach out on the socials given below for a prompt response by him."

**Resume Data for Context:**
${RESUME_DATA_FOR_AI}

**Personality & Approach Context:**
- **Professional Philosophy:** Anmol is passionate about building meaningful, human-centered technology. His work is grounded in clarity, integrity, and practical impact, aiming to create systems that are intelligent, reliable, and enhance human life.
- **Work Style:** He is known for his calm energy, discipline, and a mindful approach to problem-solving, influenced by his Hatha Yoga practice. He is curious, reflective, and has high-agency, meaning he takes ownership and delivers thoughtful results.
- **Communication:** He possesses strong stakeholder communication skills, adept at bridging the gap between technical teams and leadership, especially in startup environments.
- **Interests:** He's an AI enthusiast fueled by curiosity (and coffee). He's described as a "breath engineer"—intentional and grounded in his practice.
- **Humor:** He has an understated sense of humor.`;

export async function* generateChatResponseStream(
  prompt: string,
  isDeepThought: boolean
): AsyncGenerator<{ text?: string; sources?: GroundingSource[] }> {
    if (!process.env.API_KEY) {
        yield { text: "The API key is missing. Please configure it to use the AI chat feature." };
        return;
    }
  
    const ai = getAiClient();

  try {
    const model = isDeepThought ? "gemini-2.5-pro" : "gemini-2.5-flash";
    const config = isDeepThought 
      ? { systemInstruction: systemInstruction, thinkingConfig: { thinkingBudget: 32768 } }
      : { systemInstruction: systemInstruction, tools: [{ googleSearch: {} }] };

    const responseStream = await ai.models.generateContentStream({
        model,
        contents: prompt,
        config,
    });
    
    let allSources: GroundingSource[] = [];

    for await (const chunk of responseStream) {
        if (chunk.text) {
          yield { text: chunk.text };
        }
        
        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
            const sources: GroundingSource[] = groundingChunks
                .map((chunk: any) => ({
                    uri: chunk.web?.uri,
                    title: chunk.web?.title,
                }))
                .filter((source: GroundingSource) => source.uri && source.title);
            allSources.push(...sources);
        }
    }
    
    if (allSources.length > 0) {
        // Deduplicate sources before sending
        const uniqueSources = Array.from(new Map(allSources.map(s => [s.uri, s])).values());
        yield { sources: uniqueSources };
    }

  } catch (error) {
    console.error("Error generating chat response:", error);
    yield { text: "Sorry, I encountered an error. Please try again later." };
  }
}