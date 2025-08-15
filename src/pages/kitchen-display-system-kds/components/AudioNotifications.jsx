import React, { useEffect, useRef } from 'react';

const AudioNotifications = ({ orders, isEnabled = true }) => {
  const audioContextRef = useRef(null);
  const lastOrderCountRef = useRef(0);
  const overdueOrdersRef = useRef(new Set());

  useEffect(() => {
    if (!isEnabled) return;

    // Initialize Web Audio API
    if (!audioContextRef?.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const currentOrderCount = orders?.filter(order => order?.stage === 'new')?.length;
    const overdueOrders = orders?.filter(order => {
      const now = new Date();
      const prepTime = new Date(order.estimatedCompletionTime);
      return prepTime?.getTime() < now?.getTime();
    });

    // New order notification
    if (currentOrderCount > lastOrderCountRef?.current) {
      playNewOrderSound();
    }

    // Overdue order notifications
    overdueOrders?.forEach(order => {
      if (!overdueOrdersRef?.current?.has(order?.id)) {
        playOverdueSound();
        overdueOrdersRef?.current?.add(order?.id);
      }
    });

    // Clean up overdue orders that are no longer overdue
    const currentOverdueIds = new Set(overdueOrders.map(order => order.id));
    overdueOrdersRef?.current?.forEach(orderId => {
      if (!currentOverdueIds?.has(orderId)) {
        overdueOrdersRef?.current?.delete(orderId);
      }
    });

    lastOrderCountRef.current = currentOrderCount;
  }, [orders, isEnabled]);

  const createBeep = (frequency, duration, type = 'sine') => {
    if (!audioContextRef?.current) return;

    const oscillator = audioContextRef?.current?.createOscillator();
    const gainNode = audioContextRef?.current?.createGain();

    oscillator?.connect(gainNode);
    gainNode?.connect(audioContextRef?.current?.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode?.gain?.setValueAtTime(0.3, audioContextRef?.current?.currentTime);
    gainNode?.gain?.exponentialRampToValueAtTime(0.01, audioContextRef?.current?.currentTime + duration);

    oscillator?.start(audioContextRef?.current?.currentTime);
    oscillator?.stop(audioContextRef?.current?.currentTime + duration);
  };

  const playNewOrderSound = () => {
    // Pleasant two-tone chime for new orders
    createBeep(800, 0.2);
    setTimeout(() => createBeep(600, 0.3), 150);
  };

  const playOverdueSound = () => {
    // More urgent triple beep for overdue orders
    createBeep(1000, 0.15);
    setTimeout(() => createBeep(1000, 0.15), 200);
    setTimeout(() => createBeep(1000, 0.15), 400);
  };

  const playUrgentAlert = () => {
    // Continuous urgent alert
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBeep(1200, 0.1, 'square'), i * 150);
    }
  };

  // Expose methods for manual triggering
  useEffect(() => {
    window.kdsAudio = {
      playNewOrder: playNewOrderSound,
      playOverdue: playOverdueSound,
      playUrgent: playUrgentAlert
    };

    return () => {
      delete window.kdsAudio;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AudioNotifications;