import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb,
  Target,
  Droplets,
  Loader2
} from "lucide-react";

const AnalysisFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [results, setResults] = useState({
    moistureLevel: 0,
    confidence: 0,
    status: "",
    recommendations: []
  });

  const totalSteps = 3;
  const progressValue = (currentStep / totalSteps) * 100;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock results
    const mockMoisture = Math.floor(Math.random() * 40) + 60; // 60-100 range
    const mockConfidence = Math.floor(Math.random() * 20) + 80; // 80-100 range
    
    setResults({
      moistureLevel: mockMoisture,
      confidence: mockConfidence,
      status: mockMoisture >= 75 ? "Well Hydrated" : mockMoisture >= 60 ? "Moderate" : "Needs Hydration",
      recommendations: [
        "Apply moisturizer within 3 minutes of washing",
        "Drink at least 8 glasses of water daily",
        "Use a humidifier in dry environments",
        "Consider a hydrating serum before moisturizer"
      ]
    });
    
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const renderStep1 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary to-accent rounded-full w-fit">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Guided Image Capture</CardTitle>
        <p className="text-muted-foreground">
          Follow these steps for the most accurate skin moisture analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert className="border-primary-light bg-primary-light/10">
            <Lightbulb className="h-4 w-4 text-primary" />
            <AlertDescription>
              <strong>Lighting:</strong> Use natural light or bright indoor lighting. Avoid shadows on your face.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-accent-light bg-accent-light/10">
            <Target className="h-4 w-4 text-accent" />
            <AlertDescription>
              <strong>Position:</strong> Focus on your cheek area. Keep camera 6-8 inches away.
            </AlertDescription>
          </Alert>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold flex items-center">
            <CheckCircle className="h-5 w-5 text-success mr-2" />
            Best Practices
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Clean, makeup-free skin for best results</li>
            <li>• Take the photo in a well-lit area</li>
            <li>• Hold the camera steady to avoid blur</li>
            <li>• Capture the full cheek area</li>
          </ul>
        </div>

        <Button 
          onClick={() => setCurrentStep(2)}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white"
          size="lg"
        >
          I'm Ready to Capture
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-secondary to-accent rounded-full w-fit">
          <Upload className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Upload Your Image</CardTitle>
        <p className="text-muted-foreground">
          Select or capture an image of your cheek area
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          {selectedImage ? (
            <div className="space-y-4">
              <div className="mx-auto w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="font-medium">{selectedImage.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Select an image</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG up to 10MB
                </p>
              </div>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex space-x-4">
          <Button 
            variant="outline"
            onClick={() => setCurrentStep(1)}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button 
            onClick={() => setCurrentStep(3)}
            disabled={!selectedImage}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white"
          >
            Analyze Image
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-accent to-secondary rounded-full w-fit">
          {isAnalyzing ? (
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          ) : (
            <Droplets className="h-8 w-8 text-white" />
          )}
        </div>
        <CardTitle className="text-2xl">
          {isAnalyzing ? "Analyzing Your Skin..." : "Analysis Complete!"}
        </CardTitle>
        <p className="text-muted-foreground">
          {isAnalyzing 
            ? "Our AI is processing your image to determine moisture levels"
            : "Here are your skin moisture analysis results"
          }
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAnalyzing ? (
          <div className="space-y-4">
            <Progress value={66} className="h-2" />
            <div className="text-center text-sm text-muted-foreground">
              Processing image... This may take a few moments
            </div>
          </div>
        ) : analysisComplete ? (
          <div className="space-y-6">
            {/* Results */}
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {results.moistureLevel}
              </div>
              <div>
                <Badge 
                  variant={results.moistureLevel >= 75 ? "default" : "secondary"}
                  className="px-4 py-2"
                >
                  {results.status}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {results.confidence}% Confidence Level
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Personalized Recommendations</h3>
              <ul className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate("/history")}
                className="flex-1"
              >
                View History
              </Button>
              <Button 
                onClick={() => navigate("/")}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Button 
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
            <Button 
              onClick={simulateAnalysis}
              disabled={!selectedImage}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white"
            >
              Start Analysis
              <Loader2 className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10 py-8">
      <div className="container mx-auto px-4">
        {/* Progress Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Skin Analysis</h1>
            <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default AnalysisFlow;