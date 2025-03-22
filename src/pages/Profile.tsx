
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '@/App';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { storageService } from '@/services/storage';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    navigate('/login');
  };

  const handleClearData = () => {
    storageService.clearAll();
    toast({
      title: 'Data cleared',
      description: 'All your local data has been successfully cleared',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-lg">{user?.email || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                  <p className="text-lg">{user?.company || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      Explorer
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/home')}>
                  Back to Home
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
            
            {/* Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Clear local data</span>
                  <Button variant="outline" size="sm" onClick={handleClearData}>
                    Clear
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Presenter mode</span>
                  <div className="w-10 h-6 bg-primary/10 rounded-full relative flex items-center p-1">
                    <div className="w-4 h-4 rounded-full bg-primary absolute right-1"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
