import { Activity } from 'lucide-react';

const StepCounterHeader: React.FC = () => (
  <div className="text-center">
    <div className="flex items-center justify-center mb-2">
      <Activity className="w-8 h-8 text-blue-600 mr-2" />
      <h1 className="text-2xl font-bold text-gray-800">Step Counter</h1>
    </div>
    <p className="text-gray-600 text-sm">Track your steps using accelerometer</p>
  </div>
);

export default StepCounterHeader;
