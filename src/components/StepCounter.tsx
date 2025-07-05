import StepCounterHeader from './StepCounter/StepCounterHeader';
import ErrorMessage from './StepCounter/ErrorMessage';
import PermissionRequest from './StepCounter/PermissionRequest';
import StepStats from './StepCounter/StepStats';
import SessionStats from './StepCounter/SessionStats';
import AdditionalStats from './StepCounter/AdditionalStats';
import ControlButtons from './StepCounter/ControlButtons';
import StatusIndicator from './StepCounter/StatusIndicator';
import Instructions from './StepCounter/Instructions';

interface StepCounterProps {
  steps: number;
  isTracking: boolean;
  permissionGranted: boolean;
  error: string;
  sessionSteps: number;
  elapsedTime: number;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  resetCounters: () => void;
}

const StepCounter: React.FC<StepCounterProps> = ({
  steps,
  isTracking,
  permissionGranted,
  error,
  sessionSteps,
  elapsedTime,
  startTracking,
  stopTracking,
  resetCounters,
}) => {
  const estimatedDistance = (steps * 0.7 / 1000).toFixed(2); // in kilometers
  const pace = elapsedTime > 0 ? Math.round((sessionSteps / (elapsedTime / 60000))) : 0;

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen min-w-screen p-6">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
          {/* Header */}
          <StepCounterHeader />

          {/* Error Message */}
          {error && <ErrorMessage error={error} />}

          {/* Permission Request */}
          {!permissionGranted && <PermissionRequest startTracking={startTracking} />}

          {/* Main Step Counter */}
          <div className="text-center space-y-4">
            <StepStats steps={steps} />
            <SessionStats isTracking={isTracking} sessionSteps={sessionSteps} elapsedTime={elapsedTime} />
            <AdditionalStats steps={steps} estimatedDistance={estimatedDistance} pace={pace} />
          </div>

          {/* Control Buttons */}
          <ControlButtons
            isTracking={isTracking}
            permissionGranted={permissionGranted}
            startTracking={startTracking}
            stopTracking={stopTracking}
            resetCounters={resetCounters}
          />

          {/* Status Indicator */}
          <StatusIndicator isTracking={isTracking} />
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center p-8">
        <Instructions />
      </div>
    </div>
  );
};

export default StepCounter;
