import { useState, useEffect } from 'react';
import { DeviceMode } from '../types';

export function useDevice() {
  const [mode, setMode] = useState<DeviceMode>(() => {
    const saved = localStorage.getItem('opendoors_device_mode');
    return (saved as DeviceMode) || 'auto';
  });

  const [detectedMobile, setDetectedMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isSmallScreen = window.innerWidth < 1024;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    return isSmallScreen || isMobileUA;
  });

  useEffect(() => {
    const checkDevice = () => {
      const isSmallScreen = window.innerWidth < 1024;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setDetectedMobile(isSmallScreen || isMobileUA);
    };

    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleSetMode = (newMode: DeviceMode) => {
    setMode(newMode);
    localStorage.setItem('opendoors_device_mode', newMode);
  };

  const isMobile = mode === 'mobile' ? true : mode === 'desktop' ? false : detectedMobile;

  return {
    mode,
    setMode: handleSetMode,
    detectedMobile,
    isMobile,
  };
}
