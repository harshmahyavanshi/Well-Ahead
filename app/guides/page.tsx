"use client"

import { useState } from 'react';
import GuideCard from '@/components/GuideCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Filter } from 'lucide-react';
import guidesData from '@/data/guides.json';

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(guidesData.map(guide => guide.category)))];

  const filteredGuides = selectedCategory === 'All' 
    ? guidesData 
    : guidesData.filter(guide => guide.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Injury Prevention Guides
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Sport-specific guides with warm-ups, recovery tips, and safety reminders to keep you healthy and active.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Guides</CardDescription>
              <CardTitle className="text-3xl">{guidesData.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Categories</CardDescription>
              <CardTitle className="text-3xl">{categories.length - 1}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Points Available</CardDescription>
              <CardTitle className="text-3xl">
                {guidesData.reduce((sum, guide) => sum + guide.points, 0)} HP
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              title={guide.title}
              description={guide.description}
              category={guide.category}
              points={guide.points}
              difficulty={guide.difficulty as 'Beginner' | 'Intermediate' | 'Advanced'}
              slug={guide.id}
            />
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No guides found in this category.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
