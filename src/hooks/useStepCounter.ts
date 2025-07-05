import { useState, useEffect, useRef } from 'react';
import { Motion } from '@capacitor/motion';

export interface UseStepCounterResult {
  steps: number;
  isTracking: boolean;
  permissionGranted: boolean;
  error: string;
  sessionSteps: number;
  startTime: number | null;
  elapsedTime: number;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  resetCounters: () => void;
}

// Add to global window type for TypeScript
// (This is needed for iOS permission)
declare global {
  interface Window {
    DeviceMotionEvent: typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
  }
}

export function useStepCounter(): UseStepCounterResult {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState('');
  const [sessionSteps, setSessionSteps] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Step detection variables
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });
  const stepThreshold = useRef(2.0);
  const lastStepTime = useRef(0);
  const minStepInterval = useRef(300); // minimum 300ms between steps

  // Timer for elapsed time
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  // Request permission for iOS devices
  const requestPermission = async () => {
    if (
      typeof window.DeviceMotionEvent !== 'undefined' &&
      typeof window.DeviceMotionEvent.requestPermission === 'function'
    ) {
      try {
        const permission = await window.DeviceMotionEvent.requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          setError('');
        } else {
          setError('Permission denied. Please enable motion sensors in your browser settings.');
        }
      } catch (err: any) {
        setError('Error requesting permission: ' + (err?.message || err));
      }
    } else {
      // For non-iOS devices, assume permission is granted
      setPermissionGranted(true);
    }
  };

  const calculateMagnitude = (x: number, y: number, z: number): number => {
    return Math.sqrt(x * x + y * y + z * z);
  };

  // Step detection algorithm
  interface Acceleration {
    x: number;
    y: number;
    z: number;
  }

  const detectStep = (acceleration: Acceleration) => {
    const currentTime = Date.now();
    const { x, y, z } = acceleration;
    const magnitude = calculateMagnitude(x, y, z);
    const lastMagnitude = calculateMagnitude(
      lastAcceleration.current.x,
      lastAcceleration.current.y,
      lastAcceleration.current.z
    );
    const accelerationDelta = Math.abs(magnitude - lastMagnitude);
    if (
      accelerationDelta > stepThreshold.current &&
      currentTime - lastStepTime.current > minStepInterval.current
    ) {
      setSteps((prev: number) => prev + 1);
      setSessionSteps((prev: number) => prev + 1);
      lastStepTime.current = currentTime;
    }
    lastAcceleration.current = { x, y, z };
  };

  // Store the motion listener so we can remove it
  const motionListener = useRef<any>(null);

  // Replace handleMotion to use @capacitor/motion
  const handleMotion = (acceleration: { x: number; y: number; z: number }) => {
    if (!isTracking) return;
    detectStep(acceleration);
  };

  // Start tracking
  const startTracking = async () => {
    if (!permissionGranted) {
      await requestPermission();
      return;
    }
    setIsTracking(true);
    setStartTime(Date.now());
    setSessionSteps(0);
    setElapsedTime(0);
    // Remove any previous listener
    if (motionListener.current) {
      motionListener.current.remove();
    }
    // Add new motion listener
    motionListener.current = await Motion.addListener('accel', (event) => {
      const { x, y, z } = event.accelerationIncludingGravity || {};
      if (
        typeof x === 'number' &&
        typeof y === 'number' &&
        typeof z === 'number'
      ) {
        handleMotion({ x, y, z });
      }
    });
  };

  // Stop tracking
  const stopTracking = () => {
    setIsTracking(false);
    if (motionListener.current) {
      motionListener.current.remove();
      motionListener.current = null;
    }
  };

  // Reset counters
  const resetCounters = () => {
    setSteps(0);
    setSessionSteps(0);
    setElapsedTime(0);
    setStartTime(null);
    if (isTracking) {
      stopTracking();
    }
  };

  return {
    steps,
    isTracking,
    permissionGranted,
    error,
    sessionSteps,
    startTime,
    elapsedTime,
    startTracking,
    stopTracking,
    resetCounters,
  };
}
