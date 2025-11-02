"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Loader2, Lightbulb, AlertCircle } from 'lucide-react';

export default function TranslatorPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const exampleTerms = [
    'tendinitis',
    'hypertension',
    'migraine',
    'asthma',
    'diabetes mellitus',
    'osteoarthritis'
  ];

  const handleTranslate = async () => {
    if (!input.trim()) {
      setError('Please enter a medical term to translate');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to translate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (term: string) => {
    setInput(term);
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Health Translator
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert complex medical terms into simple, understandable language
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold mb-1">How it works:</p>
                <p className="text-muted-foreground">
                  Enter any medical term or jargon you encounter. Our AI-powered translator 
                  will break it down into simple language you can understand. Perfect for 
                  reading medical documents, research papers, or doctor's notes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Medical Term</CardTitle>
            <CardDescription>
              Type or paste any medical term you want to understand
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="e.g., tendinitis, hypertension, gastroesophageal reflux..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px]"
            />
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button 
              onClick={handleTranslate} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Translate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Example Terms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Try These Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {exampleTerms.map((term) => (
                <Badge
                  key={term}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleExampleClick(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Result Section */}
        {result && (
          <Card className="border-primary shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Simple Explanation
              </CardTitle>
              {result.matchedTerm !== 'general' && (
                <CardDescription>
                  Term: <span className="font-semibold capitalize">{result.matchedTerm}</span>
                  {' ? '}
                  Confidence: <span className="font-semibold">{(result.confidence * 100).toFixed(0)}%</span>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {result.translation}
                </p>
              </div>

              {result.tips && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Important Reminders
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {result.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">?</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            ?? This tool is for educational purposes. Always consult healthcare professionals 
            for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
