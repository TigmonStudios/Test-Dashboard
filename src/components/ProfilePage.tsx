import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Camera, Save } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ProfilePageProps {
  user: { email: string; name: string } | null;
  onBack: () => void;
  onUpdateProfile: (name: string, email: string, avatar?: string) => void;
}

export function ProfilePage({ user, onBack, onUpdateProfile }: ProfilePageProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateProfile(name, email, avatar);
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setIsEditing(false);
  };

  const hasChanges = name !== user?.name || email !== user?.email || avatar !== '';

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your profile information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {successMessage && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Click the camera icon to upload a new profile picture
              </p>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <Input
                  id="username"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsEditing(true);
                  }}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEditing(true);
                  }}
                  placeholder="Enter your email"
                />
                <p className="text-xs text-gray-500">
                  Changing your email will require verification
                </p>
              </div>
            </div>

            {/* Account Information (Read-only) */}
            <div className="border-t pt-6 space-y-4">
              <h3>Account Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="text-yellow-600">Pending Verification</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span>November 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Login</span>
                  <span>Just now</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && hasChanges && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Notification Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
