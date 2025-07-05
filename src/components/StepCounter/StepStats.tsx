interface StepStatsProps {
  steps: number;
}

const StepStats: React.FC<StepStatsProps> = ({ steps }) => (
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
    <div className="text-4xl font-bold mb-2">{steps.toLocaleString()}</div>
    <div className="text-blue-100">Total Steps</div>
  </div>
);

export default StepStats;
