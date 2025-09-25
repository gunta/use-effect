import { useSyncExternalStore } from 'react';

type CounterType = 'incident' | 'global' | 'money';

type CounterState = {
  incident: number;
  global: number;
  money: number;
};

type Listener = () => void;

const INITIAL_STATE: CounterState = {
  incident: 0,
  global: 2_847_293_847,
  money: 847,
};

let state: CounterState = { ...INITIAL_STATE };
const listeners = new Set<Listener>();

let rafId: number | null = null;
let moneyIntervalId: number | null = null;
let incidentIntervalId: number | null = null;
let incidentTimeoutId: number | null = null;
let started = false;

const emit = () => {
  listeners.forEach((listener) => listener());
};

const updateState = (updater: (prev: CounterState) => CounterState) => {
  state = updater(state);
  emit();
};

const stop = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (moneyIntervalId !== null) {
    window.clearInterval(moneyIntervalId);
    moneyIntervalId = null;
  }

  if (incidentIntervalId !== null) {
    window.clearInterval(incidentIntervalId);
    incidentIntervalId = null;
  }

  if (incidentTimeoutId !== null) {
    window.clearTimeout(incidentTimeoutId);
    incidentTimeoutId = null;
  }

  state = { ...INITIAL_STATE };
  started = false;
};

const start = () => {
  if (started || typeof window === 'undefined') {
    return;
  }

  started = true;

  const animateGlobalCounter = () => {
    updateState((prev) => ({
      ...prev,
      global: prev.global + Math.floor(Math.random() * 1_000) + 500,
    }));

    rafId = window.requestAnimationFrame(animateGlobalCounter);
  };

  rafId = window.requestAnimationFrame(animateGlobalCounter);

  moneyIntervalId = window.setInterval(() => {
    updateState((prev) => ({
      ...prev,
      money: prev.money + Math.random() * 0.1,
    }));
  }, 1_000);

  const triggerIncidentReset = () => {
    updateState((prev) => ({ ...prev, incident: 1 }));

    incidentTimeoutId = window.setTimeout(() => {
      updateState((prev) => ({ ...prev, incident: 0 }));
    }, 2_000);
  };

  triggerIncidentReset();

  incidentIntervalId = window.setInterval(() => {
    if (incidentTimeoutId !== null) {
      window.clearTimeout(incidentTimeoutId);
    }

    triggerIncidentReset();
  }, 10_000);
};

const subscribe = (listener: Listener) => {
  if (!listeners.size) {
    start();
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);

    if (!listeners.size) {
      stop();
    }
  };
};

const getSnapshot = () => state;
const getServerSnapshot = () => INITIAL_STATE;

export const useCounterValue = (type: CounterType) =>
  useSyncExternalStore(subscribe, () => getSnapshot()[type], () => getServerSnapshot()[type]);
