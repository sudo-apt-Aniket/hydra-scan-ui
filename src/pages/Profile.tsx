import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Settings, 
  Smartphone, 
  Bell,
  Shield,
  Camera,
  Droplets,
  Target
} from "lucide-react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Alex Chen",
    email: "alex.chen@example.com",
    age: "28",
    skinType: "Combination"
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    dailyReminders: true,
    weeklyReports: false
  });

  const deviceInfo = {
    lastCalibrated: "2024-01-10",
    accuracy: "94%",
    totalReadings: 127,
    deviceModel: "HydroSkin Pro"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <User className="mr-3 h-8 w-8 text-primary" />
            Profile & Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account and customize your analysis experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{userInfo.name}</h3>
                    <p className="text-muted-foreground">{userInfo.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      Premium Member
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={userInfo.age}
                      onChange={(e) => setUserInfo({...userInfo, age: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skinType">Skin Type</Label>
                    <Input
                      id="skinType"
                      value={userInfo.skinType}
                      onChange={(e) => setUserInfo({...userInfo, skinType: e.target.value})}
                    />
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white">
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts for analysis reminders
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={preferences.notifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreferences({
                        ...preferences,
                        notifications: !preferences.notifications
                      })}
                    >
                      {preferences.notifications ? "On" : "Off"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Daily Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Get reminded to take your daily readings
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={preferences.dailyReminders ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreferences({
                        ...preferences,
                        dailyReminders: !preferences.dailyReminders
                      })}
                    >
                      {preferences.dailyReminders ? "On" : "Off"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly analysis summaries
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={preferences.weeklyReports ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreferences({
                        ...preferences,
                        weeklyReports: !preferences.weeklyReports
                      })}
                    >
                      {preferences.weeklyReports ? "On" : "Off"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-primary-light/10 border-primary-light/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span>Device Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{deviceInfo.deviceModel}</p>
                    <Badge variant="secondary" className="mt-1 bg-success text-success-foreground">
                      Connected
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Calibrated</span>
                    <span className="text-sm font-medium">{deviceInfo.lastCalibrated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="text-sm font-medium text-success">{deviceInfo.accuracy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Readings</span>
                    <span className="text-sm font-medium">{deviceInfo.totalReadings}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Calibrate Device
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-card to-accent-light/10 border-accent-light/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-accent" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">12</div>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="text-sm font-medium">5 readings</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Score</span>
                    <span className="text-sm font-medium text-success">75.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Streak</span>
                    <span className="text-sm font-medium">3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;