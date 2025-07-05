import StepCounter from './components/StepCounter';
import { useStepCounter } from './hooks/useStepCounter';

const App = () => {
  const stepCounter = useStepCounter();
  return <StepCounter {...stepCounter} />;
};

export default App;