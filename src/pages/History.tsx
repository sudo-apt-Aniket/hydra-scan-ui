import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History as HistoryIcon, 
  TrendingUp, 
  Calendar, 
  Droplets,
  Download,
  Filter
} from "lucide-react";

const History = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("week");

  // Mock historical data
  const historyData = [
    {
      id: 1,
      date: "2024-01-15",
      time: "09:30 AM",
      moistureLevel: 78.5,
      status: "Well Hydrated",
      site: "Left Cheek",
      confidence: 92
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "02:15 PM",
      moistureLevel: 75.2,
      status: "Well Hydrated",
      site: "Right Cheek",
      confidence: 89
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "11:45 AM",
      moistureLevel: 68.8,
      status: "Moderate",
      site: "Forehead",
      confidence: 85
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "08:20 AM",
      moistureLevel: 72.1,
      status: "Moderate",
      site: "Left Cheek",
      confidence: 88
    },
    {
      id: 5,
      date: "2024-01-11",
      time: "06:30 PM",
      moistureLevel: 81.3,
      status: "Well Hydrated",
      site: "Right Cheek",
      confidence: 94
    }
  ];

  const trendData = [
    { date: "Jan 11", value: 81.3 },
    { date: "Jan 12", value: 72.1 },
    { date: "Jan 13", value: 68.8 },
    { date: "Jan 14", value: 75.2 },
    { date: "Jan 15", value: 78.5 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Well Hydrated":
        return "success";
      case "Moderate":
        return "warning";
      default:
        return "destructive";
    }
  };

  const calculateStats = () => {
    const levels = historyData.map(entry => entry.moistureLevel);
    const average = levels.reduce((sum, level) => sum + level, 0) / levels.length;
    const highest = Math.max(...levels);
    const lowest = Math.min(...levels);
    
    return { average: average.toFixed(1), highest, lowest };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <HistoryIcon className="mr-3 h-8 w-8 text-primary" />
              Analysis History
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your skin moisture levels over time
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-primary-light/10 border-primary-light/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Level</p>
                  <p className="text-3xl font-bold text-primary">{stats.average}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-success/10 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Highest Reading</p>
                  <p className="text-3xl font-bold text-success">{stats.highest}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-accent/10 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Readings</p>
                  <p className="text-3xl font-bold text-accent">{historyData.length}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-full">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">Reading List</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historyData.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                          <Droplets className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold">{entry.moistureLevel}</p>
                            <Badge variant={getStatusColor(entry.status) as any} className="text-xs">
                              {entry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {entry.site} • {entry.confidence}% confidence
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{entry.date}</p>
                        <p className="text-xs text-muted-foreground">{entry.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Moisture Level Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Simple trend visualization */}
                <div className="h-64 flex items-end space-x-4 justify-between bg-muted/20 rounded-lg p-4">
                  {trendData.map((day, index) => (
                    <div key={day.date} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500 hover:scale-105 relative group"
                        style={{ height: `${(day.value / 100) * 200}px`, minHeight: '20px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {day.value}
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-xs text-muted-foreground">{day.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trend insights */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-semibold text-success mb-2">Positive Trend</h4>
                    <p className="text-sm text-muted-foreground">
                      Your skin moisture has improved by 12% over the last week. Keep up the good work!
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Consistency Goal</h4>
                    <p className="text-sm text-muted-foreground">
                      Try to maintain readings above 70 for optimal skin health.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;