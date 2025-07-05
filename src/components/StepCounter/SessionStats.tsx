import { formatTime } from '../../utils/formatTime';

interface SessionStatsProps {
  isTracking: boolean;
  sessionSteps: number;
  elapsedTime: number;
}

const SessionStats: React.FC<SessionStatsProps> = ({ isTracking, sessionSteps, elapsedTime }) => (
  (isTracking || sessionSteps > 0) ? (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="text-lg font-semibold text-green-800">{sessionSteps}</div>
        <div className="text-green-600 text-sm">Session Steps</div>
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <div className="text-lg font-semibold text-purple-800">{formatTime(elapsedTime)}</div>
        <div className="text-purple-600 text-sm">Time Active</div>
      </div>
    </div>
  ) : null
);

export default SessionStats;
