import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GuideCardProps {
  title: string;
  description: string;
  category: string;
  points: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  slug: string;
}

export default function GuideCard({ 
  title, 
  description, 
  category, 
  points, 
  difficulty,
  slug 
}: GuideCardProps) {
  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{category}</Badge>
          <Badge className={difficultyColor[difficulty]}>{difficulty}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">+{points} HP</span>
          <span>?</span>
          <span>Complete to earn points</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/guides/${slug}`} className="w-full">
          <Button className="w-full" variant="outline">
            View Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
