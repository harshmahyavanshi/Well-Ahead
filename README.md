# WellAhead - Your Smart Preventive Health Companion

A comprehensive web application designed to help students understand, track, and act on preventive healthcare habits through AI-assisted guidance, gamification, and community engagement.

## ?? Features

### ?? Landing Page
- Beautiful hero section with mission statement
- Email + Google authentication via Firebase
- Feature highlights and call-to-action

### ?? Dashboard
- Personalized health overview
- Daily health tips and nudges (hydration, posture, exercise)
- Current streak and Health Points display
- Wearable data integration (steps, calories, heart rate, sleep)
- Quick access to all features

### ?? Smart Health Translator
- AI-powered medical term simplification
- Mock API endpoint that converts complex medical jargon into plain language
- Example terms library with instant translations
- Educational tips and reminders

### ?? Injury Prevention Guides
- Sport-specific guides (cycling, football, yoga, running, weightlifting, swimming)
- Comprehensive warm-up routines
- Recovery strategies
- Safety reminders
- Health Points rewards for completion

### ?? Gamification & Progress
- Health Points system
- Streak tracking
- Level progression
- Achievement badges
- Weekly activity charts
- Campus leaderboard
- Goal tracking (steps, water intake, guides)

### ?? Community Integration
- Campus wellness events calendar
- Event registration system
- Group challenges
- Real-time attendance tracking
- Event types: Yoga, Running, Workshops, Meditation, Cycling

## ??? Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI
- **Authentication**: Firebase Authentication (Email + Google)
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **AI Route**: Mock API simulating health translation

## ?? Project Structure

```
/workspace/
??? app/                      # Next.js App Router pages
?   ??? api/
?   ?   ??? translate/       # Mock AI translation endpoint
?   ??? dashboard/           # Main user dashboard
?   ??? translator/          # Health translator page
?   ??? guides/              # Injury prevention guides
?   ?   ??? [slug]/         # Individual guide pages
?   ??? progress/            # Gamification & progress tracking
?   ??? community/           # Community events
?   ??? layout.tsx           # Root layout with navbar
?   ??? page.tsx             # Landing page
?   ??? globals.css          # Global styles
??? components/              # Reusable React components
?   ??? ui/                  # ShadCN UI components
?   ??? Navbar.tsx
?   ??? HealthCard.tsx
?   ??? ProgressBar.tsx
?   ??? GuideCard.tsx
??? lib/                     # Utility libraries
?   ??? firebase.ts          # Firebase configuration
?   ??? mongodb.ts           # MongoDB connection & schemas
?   ??? utils.ts             # Utility functions
??? data/                    # Mock data files
?   ??? wearable.json        # Simulated wearable data
?   ??? healthTips.json      # Daily health nudges
?   ??? guides.json          # Injury prevention guides
?   ??? communityEvents.json # Campus events
?   ??? medicalTerms.json    # Medical dictionary
??? package.json
```

## ?? Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or Atlas)
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshmahyavanshi/Well-Ahead.git
   cd Well-Ahead
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/wellahead
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ?? UI Theme

- **Primary Color**: Teal/Cyan (`#00A8B5`)
- **Secondary Color**: Light Teal (`#4FD1C5`)
- **Design Philosophy**: Calming, health-focused palette
- **Icons**: Lucide React (Activity, Heart, Brain, Users, etc.)

## ?? Mock Data

The prototype includes comprehensive mock data for demonstration:

- **Wearable Data**: Steps, calories, heart rate, sleep hours, water intake
- **Health Tips**: 5 daily nudges for hydration, posture, breathing, etc.
- **Guides**: 6 sport-specific injury prevention guides
- **Events**: 6 campus wellness events with registration
- **Medical Terms**: 15 common medical terms with simple explanations

## ?? Authentication

Firebase Authentication supports:
- Email/Password sign-up and login
- Google OAuth sign-in
- Automatic redirect to dashboard on successful auth
- Logout functionality

## ?? Responsive Design

Fully responsive layout optimized for:
- Desktop (1920px+)
- Laptop (1280px - 1920px)
- Tablet (768px - 1280px)
- Mobile (320px - 768px)

## ?? Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard

### Build for Production

```bash
npm run build
npm start
```

## ?? Future Enhancements

- Real OpenAI API integration for health translation
- Actual wearable device integration (Apple Health, Google Fit)
- Social features (friends, messaging)
- Push notifications for health nudges
- Advanced analytics and insights
- Nutrition tracking
- Mental health resources
- Integration with campus health services

## ?? Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ?? License

ISC License

## ????? Author

Built for WellAhead - Making preventive health accessible for students.

## ?? Acknowledgments

- Next.js team for the amazing framework
- ShadCN for the beautiful UI components
- Firebase for authentication services
- The open-source community

---

**Made with ?? for student health and wellness**
