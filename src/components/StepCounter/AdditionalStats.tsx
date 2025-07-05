interface AdditionalStatsProps {
  steps: number;
  estimatedDistance: string;
  pace: number;
}

const AdditionalStats: React.FC<AdditionalStatsProps> = ({ steps, estimatedDistance, pace }) => (
  steps > 0 ? (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <div className="text-lg font-semibold text-orange-800">{estimatedDistance} km</div>
        <div className="text-orange-600 text-sm">Est. Distance</div>
      </div>
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
        <div className="text-lg font-semibold text-teal-800">{pace}</div>
        <div className="text-teal-600 text-sm">Steps/min</div>
      </div>
    </div>
  ) : null
);

export default AdditionalStats;
