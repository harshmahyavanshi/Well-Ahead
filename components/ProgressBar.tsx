import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressBarProps {
  title: string;
  current: number;
  target: number;
  description?: string;
  unit?: string;
}

export default function ProgressBar({ 
  title, 
  current, 
  target, 
  description,
  unit = "points"
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {current} / {target} {unit}
          </span>
          <span className="font-semibold text-primary">{percentage.toFixed(0)}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </CardContent>
    </Card>
  );
}
