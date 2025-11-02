"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import HealthCard from '@/components/HealthCard';
import { Heart, Flame, Trophy, Droplet, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import wearableData from '@/data/wearable.json';
import healthTips from '@/data/healthTips.json';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [healthPoints, setHealthPoints] = useState(350);
  const [streak, setStreak] = useState(7);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'there'}! ??
          </h1>
          <p className="text-muted-foreground">
            Let's make today a healthy day. Here's your health overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <HealthCard
            title="Health Points"
            icon={Trophy}
            value={healthPoints}
            iconColor="text-yellow-500"
          />
          <HealthCard
            title="Current Streak"
            icon={Flame}
            value={`${streak} days`}
            iconColor="text-orange-500"
          />
          <HealthCard
            title="Steps Today"
            icon={Activity}
            value={wearableData.stepsToday.toLocaleString()}
            iconColor="text-blue-500"
          />
          <HealthCard
            title="Water Intake"
            icon={Droplet}
            value={`${wearableData.waterIntake}/${wearableData.waterGoal} glasses`}
            iconColor="text-cyan-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Daily Health Tips */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Daily Health Nudges
              </CardTitle>
              <CardDescription>
                Complete these tasks to maintain your streak and earn points
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {healthTips.slice(0, 4).map((tip) => (
                <div
                  key={tip.id}
                  className="flex items-start justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground">{tip.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-4"
                    onClick={() => {
                      setHealthPoints(prev => prev + 10);
                    }}
                  >
                    +10 HP
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Wearable Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Today's Activity
              </CardTitle>
              <CardDescription>From your wearable device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Steps</span>
                  <span className="font-semibold">{wearableData.stepsToday.toLocaleString()}</span>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(wearableData.stepsToday / wearableData.stepsGoal) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Calories</span>
                  <span className="font-semibold">{wearableData.caloriesBurned} kcal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Minutes</span>
                  <span className="font-semibold">{wearableData.activeMinutes} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Heart Rate</span>
                  <span className="font-semibold">{wearableData.heartRate} bpm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sleep</span>
                  <span className="font-semibold">{wearableData.sleepHours}h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Explore features to improve your health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col"
                onClick={() => router.push('/translator')}
              >
                <Heart className="h-6 w-6 mb-2 text-primary" />
                <span>Health Translator</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col"
                onClick={() => router.push('/guides')}
              >
                <Activity className="h-6 w-6 mb-2 text-primary" />
                <span>View Guides</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col"
                onClick={() => router.push('/progress')}
              >
                <Trophy className="h-6 w-6 mb-2 text-primary" />
                <span>Track Progress</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col"
                onClick={() => router.push('/community')}
              >
                <TrendingUp className="h-6 w-6 mb-2 text-primary" />
                <span>Join Events</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Badges */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Badges you've unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge className="px-4 py-2 text-sm">?? 7-Day Streak</Badge>
              <Badge className="px-4 py-2 text-sm" variant="secondary">?? Hydration Hero</Badge>
              <Badge className="px-4 py-2 text-sm" variant="secondary">?? Active Starter</Badge>
              <Badge className="px-4 py-2 text-sm" variant="secondary">?? Guide Reader</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
