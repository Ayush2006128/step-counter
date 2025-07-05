import { IonPage } from '@ionic/react';
import StepCounter from './components/StepCounter';
import { useStepCounter } from './hooks/useStepCounter';

const App = () => {
  const stepCounter = useStepCounter();
  return (
    <IonPage>
      <StepCounter {...stepCounter} />
    </IonPage>
  );
};

export default App;