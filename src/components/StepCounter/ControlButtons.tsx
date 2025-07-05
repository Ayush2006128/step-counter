import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlButtonsProps {
  isTracking: boolean;
  permissionGranted: boolean;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  resetCounters: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isTracking,
  permissionGranted,
  startTracking,
  stopTracking,
  resetCounters,
}) => (
  permissionGranted ? (
    <div className="space-y-3">
      <button
        onClick={isTracking ? stopTracking : startTracking}
        className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
          isTracking
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isTracking ? (
          <>
            <Pause className="w-5 h-5 mr-2" />
            Stop Tracking
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            Start Tracking
          </>
        )}
      </button>
      <button
        onClick={resetCounters}
        className="w-full flex items-center justify-center py-2 px-4 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset All
      </button>
    </div>
  ) : null
);

export default ControlButtons;
