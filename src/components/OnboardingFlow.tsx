import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Upload, CheckCircle2, FileText, User, MapPin, Shield } from 'lucide-react';
import { format } from 'date-fns';

interface OnboardingFlowProps {
  user: { email: string; name: string } | null;
  onComplete: () => void;
}

type Step = 'welcome' | 'personal' | 'address' | 'document' | 'review' | 'complete';

export function OnboardingFlow({ user, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  
  // Personal information
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [occupation, setOccupation] = useState('');
  
  // Address information
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  
  // Document information
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentFile, setDocumentFile] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<string | null>(null);

  const steps: Step[] = ['welcome', 'personal', 'address', 'document', 'review', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file.name);
    }
  };

  const renderWelcome = () => (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle>Welcome to Our Platform!</CardTitle>
        <CardDescription>
          To ensure the security of our platform, we need to verify your identity. This process will take about 5 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <h3>Personal Info</h3>
            <p className="text-sm text-gray-600">Provide your basic details</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3>Address</h3>
            <p className="text-sm text-gray-600">Verify your location</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <h3>Documents</h3>
            <p className="text-sm text-gray-600">Upload ID verification</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setCurrentStep('personal')} className="w-full">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );

  const renderPersonalInfo = () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Please provide your personal details for identity verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth ? format(dateOfBirth, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={setDateOfBirth}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Select value={nationality} onValueChange={setNationality}>
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              type="text"
              placeholder="Software Engineer"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep('welcome')}>
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep('address')}
          disabled={!dateOfBirth || !phoneNumber || !nationality || !occupation}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );

  const renderAddress = () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Address Verification</CardTitle>
        <CardDescription>
          Please provide your current residential address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            type="text"
            placeholder="123 Main Street, Apt 4B"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State / Province</Label>
            <Input
              id="state"
              type="text"
              placeholder="NY"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP / Postal Code</Label>
            <Input
              id="zip"
              type="text"
              placeholder="10001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep('personal')}>
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep('document')}
          disabled={!streetAddress || !city || !state || !zipCode || !country}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );

  const renderDocument = () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Document Verification</CardTitle>
        <CardDescription>
          Upload a government-issued ID and a selfie for verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="docType">Document Type</Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="drivers_license">Driver's License</SelectItem>
              <SelectItem value="national_id">National ID Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="docNumber">Document Number</Label>
          <Input
            id="docNumber"
            type="text"
            placeholder="Enter document number"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Upload Document</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              id="document"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload(e, setDocumentFile)}
            />
            <label htmlFor="document" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              {documentFile ? (
                <p className="text-sm text-green-600">✓ {documentFile}</p>
              ) : (
                <>
                  <p className="text-sm">Click to upload your ID document</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 10MB</p>
                </>
              )}
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Upload Selfie</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              id="selfie"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setSelfieFile)}
            />
            <label htmlFor="selfie" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              {selfieFile ? (
                <p className="text-sm text-green-600">✓ {selfieFile}</p>
              ) : (
                <>
                  <p className="text-sm">Click to upload a selfie</p>
                  <p className="text-xs text-gray-500 mt-1">Take a clear photo of your face</p>
                </>
              )}
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep('address')}>
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep('review')}
          disabled={!documentType || !documentNumber || !documentFile || !selfieFile}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );

  const renderReview = () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Review Your Information</CardTitle>
        <CardDescription>
          Please review the information you provided before submitting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Personal Information
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span>{dateOfBirth ? format(dateOfBirth, 'PPP') : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span>{phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nationality:</span>
              <span className="capitalize">{nationality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Occupation:</span>
              <span>{occupation}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Address
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <p>{streetAddress}</p>
            <p>{city}, {state} {zipCode}</p>
            <p className="capitalize">{country}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-600" />
            Documents
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Document Type:</span>
              <span className="capitalize">{documentType?.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Document Number:</span>
              <span>{documentNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ID Document:</span>
              <span className="text-green-600">✓ Uploaded</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Selfie:</span>
              <span className="text-green-600">✓ Uploaded</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep('document')}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep('complete')}>
          Submit for Verification
        </Button>
      </CardFooter>
    </Card>
  );

  const renderComplete = () => (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle>Verification Submitted!</CardTitle>
        <CardDescription>
          Your information has been submitted for review. We'll verify your details and notify you within 24-48 hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
              <span>Our team will review your documents</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
              <span>You'll receive an email notification once verified</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
              <span>Full platform access will be granted after approval</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onComplete} className="w-full">
          Go to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl space-y-4">
        {currentStep !== 'welcome' && currentStep !== 'complete' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {currentStep === 'welcome' && renderWelcome()}
        {currentStep === 'personal' && renderPersonalInfo()}
        {currentStep === 'address' && renderAddress()}
        {currentStep === 'document' && renderDocument()}
        {currentStep === 'review' && renderReview()}
        {currentStep === 'complete' && renderComplete()}
      </div>
    </div>
  );
}
