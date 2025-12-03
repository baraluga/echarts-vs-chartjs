import { useState, useCallback, useRef, useEffect } from 'react';

export function useFPSCounter() {
  const [fps, setFps] = useState(60);
  const frameTimestamps = useRef<number[]>([]);
  const rafId = useRef<number | null>(null);
  const isTracking = useRef(false);

  /**
   * Start tracking FPS
   */
  const startTracking = useCallback(() => {
    if (isTracking.current) return;

    isTracking.current = true;
    frameTimestamps.current = [];

    const measureFrame = (timestamp: number) => {
      if (!isTracking.current) return;

      frameTimestamps.current.push(timestamp);

      // Keep only last 60 frames (1 second at 60fps)
      if (frameTimestamps.current.length > 60) {
        frameTimestamps.current.shift();
      }

      // Calculate FPS from frame timestamps
      if (frameTimestamps.current.length >= 2) {
        const firstTimestamp = frameTimestamps.current[0];
        const lastTimestamp = frameTimestamps.current[frameTimestamps.current.length - 1];
        const timeDiff = lastTimestamp - firstTimestamp;

        if (timeDiff > 0) {
          const calculatedFps = Math.round(
            ((frameTimestamps.current.length - 1) / timeDiff) * 1000
          );
          setFps(calculatedFps);
        }
      }

      rafId.current = requestAnimationFrame(measureFrame);
    };

    rafId.current = requestAnimationFrame(measureFrame);
  }, []);

  /**
   * Stop tracking FPS
   */
  const stopTracking = useCallback(() => {
    isTracking.current = false;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    // Reset to default 60 fps when stopped
    setFps(60);
    frameTimestamps.current = [];
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { fps, startTracking, stopTracking, isTracking: isTracking.current };
}
