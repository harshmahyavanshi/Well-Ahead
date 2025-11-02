import { NextRequest, NextResponse } from 'next/server';
import medicalTerms from '@/data/medicalTerms.json';

const termsDict: { [key: string]: string } = medicalTerms;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple translation logic - check if any medical terms match
    const lowerText = text.toLowerCase();
    let translation = null;
    let matchedTerm = null;

    // Check for exact matches first
    for (const [term, definition] of Object.entries(termsDict)) {
      if (lowerText.includes(term.toLowerCase())) {
        translation = definition;
        matchedTerm = term;
        break;
      }
    }

    // If no match found, provide a generic helpful response
    if (!translation) {
      translation = `I don't have a specific definition for "${text}" in my database yet. However, I recommend:\n\n1. Breaking down the term into smaller parts\n2. Looking up each component separately\n3. Consulting with a healthcare provider for personalized advice\n\nWould you like to try searching for a specific medical term?`;
      matchedTerm = "general";
    }

    return NextResponse.json({
      original: text,
      translation,
      matchedTerm,
      confidence: matchedTerm !== "general" ? 0.95 : 0.5,
      tips: [
        "Always consult a healthcare professional for medical advice",
        "This is a simplified explanation for educational purposes",
        "Individual cases may vary - seek personalized guidance"
      ]
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to process translation' },
      { status: 500 }
    );
  }
}
