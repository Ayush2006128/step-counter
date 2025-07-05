interface StatusIndicatorProps {
  isTracking: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isTracking }) => (
  <div className="flex items-center justify-center space-x-2">
    <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-green-500' : 'bg-gray-300'}`}></div>
    <span className="text-sm text-gray-600">
      {isTracking ? 'Actively tracking steps' : 'Tracking paused'}
    </span>
  </div>
);

export default StatusIndicator;
