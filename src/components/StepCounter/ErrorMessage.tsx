interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
    <p className="text-red-700 text-sm">{error}</p>
  </div>
);

export default ErrorMessage;
