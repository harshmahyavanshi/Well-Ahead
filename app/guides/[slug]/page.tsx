"use client"

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, Trophy, AlertTriangle, Heart } from 'lucide-react';
import guidesData from '@/data/guides.json';
import { useState } from 'react';

export default function GuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  const guide = guidesData.find(g => g.id === params.slug);

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Guide Not Found</CardTitle>
            <CardDescription>The guide you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/guides')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800',
  };

  const handleComplete = () => {
    setCompleted(true);
    // In a real app, this would update the database
    setTimeout(() => {
      alert(`Congratulations! You earned ${guide.points} Health Points! ??`);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/guides')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Guides
        </Button>

        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">{guide.category}</Badge>
              <Badge className={difficultyColor[guide.difficulty as keyof typeof difficultyColor]}>
                {guide.difficulty}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                <Trophy className="h-3 w-3 mr-1" />
                {guide.points} HP
              </Badge>
            </div>
            <CardTitle className="text-3xl mb-2">{guide.title}</CardTitle>
            <CardDescription className="text-base">{guide.description}</CardDescription>
          </CardHeader>
        </Card>

        {/* Warm-up Section */}
        <Card className="mb-6">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Heart className="h-5 w-5 text-blue-500" />
              Warm-Up Routine
            </CardTitle>
            <CardDescription>
              Prepare your body before starting to prevent injuries
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {guide.warmup.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recovery Section */}
        <Card className="mb-6">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Recovery Tips
            </CardTitle>
            <CardDescription>
              Post-activity recovery to optimize healing and performance
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {guide.recovery.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Safety Section */}
        <Card className="mb-6">
          <CardHeader className="bg-amber-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Safety Reminders
            </CardTitle>
            <CardDescription>
              Important safety considerations for this activity
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {guide.safety.map((reminder, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="flex-shrink-0 h-5 w-5 text-amber-500 mt-0.5" />
                  <span className="text-muted-foreground">{reminder}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Complete Button */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {completed ? 'Guide Completed!' : 'Complete This Guide'}
              </h3>
              <p className="mb-6 opacity-90">
                {completed 
                  ? `You earned ${guide.points} Health Points! Keep up the great work!`
                  : `Mark this guide as complete to earn ${guide.points} Health Points`
                }
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleComplete}
                disabled={completed}
                className="w-full sm:w-auto"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Trophy className="mr-2 h-5 w-5" />
                    Mark as Complete
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
