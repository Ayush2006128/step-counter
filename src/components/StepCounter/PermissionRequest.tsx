interface PermissionRequestProps {
  startTracking: () => Promise<void>;
}

const PermissionRequest: React.FC<PermissionRequestProps> = ({ startTracking }) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <p className="text-yellow-800 text-sm mb-3">
      This app needs access to your device's motion sensors to count steps accurately.
    </p>
    <button
      onClick={startTracking}
      className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
    >
      Enable Motion Sensors
    </button>
  </div>
);

export default PermissionRequest;
