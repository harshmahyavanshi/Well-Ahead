import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface HealthCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  value?: string | number;
  children?: React.ReactNode;
  iconColor?: string;
}

export default function HealthCard({ 
  title, 
  description, 
  icon: Icon, 
  value, 
  children,
  iconColor = "text-primary"
}: HealthCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </CardHeader>
      {(value || children) && (
        <CardContent>
          {value && (
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {value}
            </p>
          )}
          {children}
        </CardContent>
      )}
    </Card>
  );
}
