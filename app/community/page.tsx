"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MapPin, Clock, UserPlus, CheckCircle } from 'lucide-react';
import communityEvents from '@/data/communityEvents.json';

export default function CommunityPage() {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);

  const handleRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  const eventTypes = Array.from(new Set(communityEvents.map(e => e.type)));

  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Yoga': 'bg-purple-100 text-purple-800',
      'Running': 'bg-blue-100 text-blue-800',
      'Workshop': 'bg-green-100 text-green-800',
      'Meditation': 'bg-pink-100 text-pink-800',
      'Cycling': 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const upcomingEvents = communityEvents.filter(event => 
    new Date(event.date) > new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Community
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Join campus wellness events, connect with peers, and participate in group challenges
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Upcoming Events</CardDescription>
              <CardTitle className="text-3xl">{upcomingEvents.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Events Joined</CardDescription>
              <CardTitle className="text-3xl">{registeredEvents.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Attendees</CardDescription>
              <CardTitle className="text-3xl">
                {communityEvents.reduce((sum, e) => sum + e.attendees, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Event Types</CardDescription>
              <CardTitle className="text-3xl">{eventTypes.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Community Highlights */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Why Join Community Events?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Connect with Peers</h4>
                  <p className="text-sm text-muted-foreground">
                    Meet like-minded students who care about health and wellness
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Earn Extra Points</h4>
                  <p className="text-sm text-muted-foreground">
                    Get bonus Health Points for attending events
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Stay Accountable</h4>
                  <p className="text-sm text-muted-foreground">
                    Group activities help you stick to your health goals
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => {
              const isRegistered = registeredEvents.includes(event.id);
              const spotsLeft = event.maxAttendees - event.attendees;
              const percentageFull = (event.attendees / event.maxAttendees) * 100;

              return (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      <Badge variant={spotsLeft > 10 ? 'secondary' : 'destructive'}>
                        {spotsLeft} spots left
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="text-base">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} / {event.maxAttendees} attendees</span>
                      </div>
                    </div>

                    {/* Attendance Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            percentageFull > 80 ? 'bg-orange-500' : 'bg-primary'
                          }`}
                          style={{ width: `${percentageFull}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={isRegistered ? 'outline' : 'default'}
                      onClick={() => handleRegister(event.id)}
                      disabled={spotsLeft === 0 && !isRegistered}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Registered
                        </>
                      ) : spotsLeft === 0 ? (
                        'Event Full'
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Register
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Group Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Active Group Challenges
            </CardTitle>
            <CardDescription>
              Compete with teams and earn bonus rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">November Step Challenge</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Walk 100,000 steps as a team this month
                    </p>
                  </div>
                  <Badge>5 days left</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Progress</span>
                    <span className="font-semibold">67,450 / 100,000 steps</span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">Hydration Challenge</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Everyone drinks 8 glasses daily for a week
                    </p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Progress</span>
                    <span className="font-semibold">4 / 7 days completed</span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '57%' }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
