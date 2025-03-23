
import { AlertCircle } from 'lucide-react';

const StaticBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-blue-50 py-2 px-4 border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex items-center text-sm text-blue-800">
        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
        <p>
          This is a learning space — try not to share private or company data. We want to keep things simple, safe, and stress-free for everyone!
        </p>
      </div>
    </div>
  );
};

export default StaticBanner;
