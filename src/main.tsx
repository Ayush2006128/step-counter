import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IonApp } from '@ionic/react'

createRoot(document.getElementById('root')!).render(
  <IonApp>
    <StrictMode>
      <App />
    </StrictMode>
  </IonApp>
)
