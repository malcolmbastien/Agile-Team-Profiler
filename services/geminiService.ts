
import { GoogleGenAI, Type } from "@google/genai";
import { ATTRIBUTES, PRACTICE_CATEGORIES } from '../constants';
import type { Scores, Practice, Recommendation, PracticeSummary } from '../types';

if (!process.env.API_KEY) {
  // This is a fallback for development; the execution environment will provide the key.
  console.warn("API_KEY environment variable not found.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const fullAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    scores: {
      type: Type.OBJECT,
      properties: ATTRIBUTES.reduce((acc, attr) => {
        acc[attr.id] = {
          type: Type.INTEGER,
          description: `Score from -5 to 5 for: ${attr.description}`,
        };
        return acc;
      }, {} as Record<string, { type: Type; description: string }>),
      required: ATTRIBUTES.map(attr => attr.id),
    },
    category: {
      type: Type.STRING,
      description: `The most appropriate category for the practice.`,
      enum: PRACTICE_CATEGORIES,
    },
    summary: {
      type: Type.OBJECT,
      properties: {
        summary: {
          type: Type.STRING,
          description: 'A concise summary (2-3 sentences) highlighting the main potential trade-offs.',
        },
        positive_impacts: {
          type: Type.ARRAY,
          description: 'An array of attribute IDs that are positively impacted by the practice.',
          items: { type: Type.STRING, enum: ATTRIBUTES.map(a => a.id) }
        },
        negative_impacts: {
          type: Type.ARRAY,
          description: 'An array of attribute IDs that are negatively impacted by the practice.',
          items: { type: Type.STRING, enum: ATTRIBUTES.map(a => a.id) }
        }
      },
      required: ['summary', 'positive_impacts', 'negative_impacts'],
    }
  },
  required: ['scores', 'category', 'summary'],
};

const attributeContext = ATTRIBUTES.map(attr => `${attr.name} (${attr.id}): ${attr.description}`).join('\n');

export async function analyzePractice(description: string): Promise<{ scores: Scores; category: string; summary: PracticeSummary }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following agile practice description and return the full JSON analysis:\n\n"${description}"\n\n**Available Attributes for analysis:**\n${attributeContext}`,
      config: {
        systemInstruction: `You are an expert Agile Coach. Your task is to analyze a description of an agile team practice. You must evaluate it against a predefined set of attributes, categorize it, and provide a concise summary of its trade-offs. Respond only with a single, valid JSON object that adheres to the provided schema. The scores for each attribute should range from -5 (strong negative impact) to +5 (strong positive impact). The category must be one of the following: ${PRACTICE_CATEGORIES.join(', ')}. The summary should be 2-3 sentences and should align with the identified positive and negative impacts.`,
        responseMimeType: "application/json",
        responseSchema: fullAnalysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    const { scores, category, summary } = result;

    // Validate scores are within range
    for (const key in scores) {
        if (typeof scores[key] !== 'number') {
            scores[key] = 0;
        }
    }
    
    // Validate category
    if (!PRACTICE_CATEGORIES.includes(category)) {
        console.warn(`Received unexpected category: ${category}. Defaulting to 'Other'.`);
        return { scores: scores as Scores, category: 'Other', summary: summary as PracticeSummary };
    }


    return { scores: scores as Scores, category, summary: summary as PracticeSummary };

  } catch (error) {
    console.error("Error analyzing practice with Gemini API:", error);
    throw new Error("Failed to get analysis from AI. The API key might be invalid or the service may be unavailable.");
  }
}

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'A concise, actionable title for the recommendation.',
    },
    description: {
      type: Type.STRING,
      description: 'A concrete, actionable recommendation for the team.',
    },
    impacted_attributes: {
      type: Type.ARRAY,
      description: 'An array of attribute IDs that this recommendation will most significantly impact.',
      items: {
        type: Type.STRING,
        description: `An attribute ID from the provided list. e.g., 'speed_of_delivery', 'psychological_safety'.`
      }
    },
  },
  required: ['title', 'description', 'impacted_attributes'],
};

const actionPlanSchema = {
    type: Type.ARRAY,
    items: recommendationSchema
};

export async function generateActionPlan(practices: Practice[], totalScores: Scores): Promise<Recommendation[]> {
  try {
    const practiceDescriptions = practices.map(p => `- ${p.description}`).join('\n');
    const scoresText = ATTRIBUTES.map(attr => `${attr.name}: ${totalScores[attr.id] || 0}`).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following team practices and their resulting attribute scores, please provide an action plan.\n\n**Team Practices:**\n${practiceDescriptions}\n\n**Current Attribute Scores:**\n${scoresText}\n\n**Attribute Meanings:**\n${attributeContext}\n\nPlease generate recommendations that are specific and would help the team address their weaknesses or build on their strengths. For each recommendation, list the attribute IDs that would be most significantly impacted.`,
      config: {
        systemInstruction: `You are an expert Agile Coach. Your task is to analyze a team's agile practices and their aggregated scores to provide a concise, actionable improvement plan. Respond only with a single, valid JSON object that adheres to the provided schema. Generate 3 to 4 recommendations, each with a clear title.`,
        responseMimeType: "application/json",
        responseSchema: actionPlanSchema,
      },
    });

    const jsonText = response.text.trim();
    const actionPlan = JSON.parse(jsonText);

    return actionPlan as Recommendation[];

  } catch (error) {
    console.error("Error generating action plan with Gemini API:", error);
    throw new Error("Failed to get action plan from AI. The API key might be invalid or the service may be unavailable.");
  }
}