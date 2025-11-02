"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProgressBar from '@/components/ProgressBar';
import { Trophy, Flame, Star, Award, TrendingUp, Calendar, Target } from 'lucide-react';

export default function ProgressPage() {
  const [healthPoints] = useState(350);
  const [streak] = useState(7);
  const [level] = useState(4);

  const achievements = [
    { icon: '??', name: '7-Day Streak', description: 'Maintained 7 consecutive days of activity', earned: true, date: '2025-11-02' },
    { icon: '??', name: 'Hydration Hero', description: 'Met water intake goal for 5 days', earned: true, date: '2025-10-30' },
    { icon: '??', name: 'Active Starter', description: 'Completed your first guide', earned: true, date: '2025-10-25' },
    { icon: '??', name: 'Guide Reader', description: 'Read 5 injury prevention guides', earned: true, date: '2025-10-28' },
    { icon: '??', name: 'Goal Getter', description: 'Hit your daily step goal 10 times', earned: false },
    { icon: '??', name: 'Strength Builder', description: 'Complete all strength training guides', earned: false },
    { icon: '??', name: 'Zen Master', description: 'Complete 20 meditation sessions', earned: false },
    { icon: '?', name: 'Community Star', description: 'Attend 5 community events', earned: false },
  ];

  const weeklyActivity = [
    { day: 'Mon', points: 50, active: true },
    { day: 'Tue', points: 40, active: true },
    { day: 'Wed', points: 60, active: true },
    { day: 'Thu', points: 45, active: true },
    { day: 'Fri', points: 55, active: true },
    { day: 'Sat', points: 70, active: true },
    { day: 'Sun', points: 30, active: true },
  ];

  const maxPoints = Math.max(...weeklyActivity.map(d => d.points));

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 1250, avatar: '??' },
    { rank: 2, name: 'Sarah Johnson', points: 1180, avatar: '??' },
    { rank: 3, name: 'Mike Rodriguez', points: 980, avatar: '??' },
    { rank: 4, name: 'You', points: healthPoints, avatar: '??', isUser: true },
    { rank: 5, name: 'Emily Davis', points: 820, avatar: '??' },
    { rank: 6, name: 'James Wilson', points: 750, avatar: '??' },
    { rank: 7, name: 'Lisa Anderson', points: 680, avatar: '??' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-10 w-10 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Progress
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Track your health journey, earn rewards, and compete with friends
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardDescription>Health Points</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{healthPoints}</CardTitle>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </CardHeader>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardDescription>Current Streak</CardDescription>
                  <CardTitle className="text-3xl text-orange-600">{streak} days</CardTitle>
                </div>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
            </CardHeader>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardDescription>Current Level</CardDescription>
                  <CardTitle className="text-3xl text-purple-600">Level {level}</CardTitle>
                </div>
                <Star className="h-8 w-8 text-purple-500" />
              </div>
            </CardHeader>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardDescription>Badges Earned</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">
                    {achievements.filter(a => a.earned).length}
                  </CardTitle>
                </div>
                <Award className="h-8 w-8 text-blue-500" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Level Progress */}
          <div className="space-y-6">
            <ProgressBar
              title="Level Progress"
              current={healthPoints}
              target={500}
              description={`${500 - healthPoints} HP until Level ${level + 1}`}
            />

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Weekly Activity
                </CardTitle>
                <CardDescription>Health points earned this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-40">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center justify-end flex-1">
                        <div
                          className={`w-full rounded-t-md transition-all ${
                            day.active ? 'bg-primary' : 'bg-gray-200'
                          }`}
                          style={{ height: `${(day.points / maxPoints) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
                      <span className="text-xs text-primary font-semibold">{day.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Active Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar
                  title="Daily Steps"
                  current={7500}
                  target={10000}
                  unit="steps"
                />
                <ProgressBar
                  title="Water Intake"
                  current={6}
                  target={8}
                  unit="glasses"
                />
                <ProgressBar
                  title="Guides Completed"
                  current={3}
                  target={6}
                  unit="guides"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  {achievements.filter(a => a.earned).length} of {achievements.length} unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.earned
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <Badge variant="secondary" className="text-xs">
                          {new Date(achievement.date).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Campus Leaderboard
                </CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        entry.isUser
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            entry.rank === 1
                              ? 'bg-yellow-100 text-yellow-700'
                              : entry.rank === 2
                              ? 'bg-gray-100 text-gray-700'
                              : entry.rank === 3
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {entry.rank}
                        </div>
                        <span className="text-2xl">{entry.avatar}</span>
                        <span className={`font-medium ${entry.isUser ? 'text-primary' : ''}`}>
                          {entry.name}
                        </span>
                      </div>
                      <span className="font-bold text-primary">{entry.points} HP</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
