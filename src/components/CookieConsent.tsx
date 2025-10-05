import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const CookieConsent = () => {
  const { 
    showBanner, 
    acceptAll, 
    acceptNecessaryOnly, 
    cookieSettings, 
    updateSettings 
  } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(cookieSettings);

  if (!showBanner) return null;

  const handleSettingsSave = () => {
    updateSettings(tempSettings);
    setShowSettings(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-in-right">
      <Card className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Vi använder cookies
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Vi använder cookies för att ge dig en bättre upplevelse. Läs mer i vår{' '}
                <Link 
                  to="/cookiepolicy" 
                  className="text-secondary hover:text-secondary/80 underline font-medium"
                >
                  cookiepolicy
                </Link>
                .
              </p>
              
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-white text-xs h-8"
                  >
                    Acceptera alla
                  </Button>
                  <Button
                    onClick={acceptNecessaryOnly}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs h-8 border-gray-300 hover:bg-gray-50"
                  >
                    Bara nödvändiga
                  </Button>
                </div>
                
                <Dialog open={showSettings} onOpenChange={setShowSettings}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs h-7 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      onClick={() => setTempSettings(cookieSettings)}
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Anpassa inställningar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <Cookie className="w-5 h-5 text-secondary" />
                        <span>Cookie-inställningar</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Nödvändiga cookies</Label>
                          <p className="text-xs text-gray-600">
                            Krävs för att webbplatsen ska fungera (varukorg, inloggning)
                          </p>
                        </div>
                        <Switch 
                          checked={true} 
                          disabled={true}
                          className="opacity-50"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Analys cookies</Label>
                          <p className="text-xs text-gray-600">
                            Hjälper oss förstå hur webbplatsen används
                          </p>
                        </div>
                        <Switch 
                          checked={tempSettings.analytics}
                          onCheckedChange={(checked) => 
                            setTempSettings(prev => ({ ...prev, analytics: checked }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Marknadsföring cookies</Label>
                          <p className="text-xs text-gray-600">
                            Används för att visa relevanta annonser
                          </p>
                        </div>
                        <Switch 
                          checked={tempSettings.marketing}
                          onCheckedChange={(checked) => 
                            setTempSettings(prev => ({ ...prev, marketing: checked }))
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button
                        onClick={handleSettingsSave}
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                      >
                        Spara inställningar
                      </Button>
                      <Button
                        onClick={() => setShowSettings(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Avbryt
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;