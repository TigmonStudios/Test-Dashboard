import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Clock, User, Mail, LogOut } from 'lucide-react';

interface DashboardProps {
  user: { email: string; name: string } | null;
  onLogout: () => void;
  onViewProfile: () => void;
}

export function Dashboard({ user, onLogout, onViewProfile }: DashboardProps) {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1>Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">Your account dashboard</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Verification Status</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Clock className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Your KYC verification is being reviewed. You'll be notified once complete.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Email verified</span>
                </div>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700" onClick={onViewProfile}>
                View Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Security Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Support Center
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest account activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p>KYC verification submitted</p>
                  <p className="text-gray-500">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p>Account created</p>
                  <p className="text-gray-500">Today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}