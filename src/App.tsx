import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { ProfilePage } from './components/ProfilePage';

type View = 'login' | 'signup' | 'onboarding' | 'dashboard' | 'profile';

interface User {
  email: string;
  name: string;
  avatar?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in production, this would validate against a backend
    setUser({ email, name: 'User' });
    setCurrentView('dashboard');
  };

  const handleSignup = (email: string, password: string, name: string) => {
    // Mock signup - in production, this would create a user in the backend
    setUser({ email, name });
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleUpdateProfile = (name: string, email: string, avatar?: string) => {
    if (user) {
      setUser({ ...user, name, email, avatar });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {currentView === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentView('signup')}
        />
      )}
      {currentView === 'signup' && (
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
      {currentView === 'onboarding' && (
        <OnboardingFlow
          user={user}
          onComplete={handleOnboardingComplete}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onViewProfile={() => setCurrentView('profile')}
        />
      )}
      {currentView === 'profile' && (
        <ProfilePage
          user={user}
          onBack={() => setCurrentView('dashboard')}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
}