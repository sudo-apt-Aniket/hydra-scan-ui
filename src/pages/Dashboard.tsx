import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Camera, 
  TrendingUp, 
  Calendar,
  Target,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentMoisture] = useState(78.5);
  const [moistureStatus] = useState("Well Hydrated");
  const [confidence] = useState(92);

  const mockTrendData = [
    { date: "Mon", value: 72 },
    { date: "Tue", value: 75 },
    { date: "Wed", value: 74 },
    { date: "Thu", value: 78 },
    { date: "Fri", value: 78.5 },
  ];

  const getStatusColor = (moisture: number) => {
    if (moisture >= 75) return "success";
    if (moisture >= 60) return "warning";
    return "destructive";
  };

  const getStatusIcon = (moisture: number) => {
    if (moisture >= 75) return <Droplets className="h-5 w-5" />;
    if (moisture >= 60) return <AlertCircle className="h-5 w-5" />;
    return <AlertCircle className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good morning! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your skin health overview for today
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Reading Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-card to-primary-light/5 border-primary-light/20 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                    <Droplets className="h-6 w-6 text-white" />
                  </div>
                  <span>Current Moisture Level</span>
                </CardTitle>
                <Badge 
                  variant={getStatusColor(currentMoisture) as any}
                  className="px-3 py-1"
                >
                  {getStatusIcon(currentMoisture)}
                  <span className="ml-2">{moistureStatus}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Main Reading */}
                <div className="text-center space-y-2">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {currentMoisture}
                  </div>
                  <p className="text-lg text-muted-foreground">Hydration Units</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hydration Level</span>
                    <span>{confidence}% Confidence</span>
                  </div>
                  <Progress 
                    value={currentMoisture} 
                    className="h-3 bg-muted"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Dry (0-40)</span>
                    <span>Normal (40-70)</span>
                    <span>Hydrated (70-100)</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => navigate("/analysis")}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white shadow-lg"
                  size="lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start New Analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-secondary-light/10 border-secondary-light/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span>Today's Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Readings</span>
                      <span>2/3</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="text-center pt-2">
                    <p className="text-2xl font-bold text-secondary">67%</p>
                    <p className="text-xs text-muted-foreground">Daily Goal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent-light/10 border-accent-light/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Target className="h-5 w-5 text-accent" />
                  <span>Weekly Average</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-accent">75.4</div>
                  <p className="text-sm text-muted-foreground">Hydration Units</p>
                  <div className="flex items-center justify-center text-sm text-success">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +2.1 from last week
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trend Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>5-Day Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end space-x-4 justify-between">
              {mockTrendData.map((day, index) => (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500 hover:scale-105"
                    style={{ height: `${(day.value / 100) * 100}%`, minHeight: '20px' }}
                  />
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{day.value}</p>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;