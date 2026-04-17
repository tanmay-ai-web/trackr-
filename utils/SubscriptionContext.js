import React, { createContext, useContext, useMemo, useState } from 'react';
import { preloadedSubscriptions } from '../data/mockSubscriptions';

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState(preloadedSubscriptions);

  const addSubscription = (subscription) => {
    setSubscriptions((prev) => [
      ...prev,
      {
        ...subscription,
        id: Date.now().toString(),
      },
    ]);
  };

  const replaceSubscriptions = (incoming) => {
    setSubscriptions(incoming.map((item, idx) => ({ ...item, id: `${Date.now()}-${idx}` })));
  };

  const value = useMemo(
    () => ({ subscriptions, addSubscription, replaceSubscriptions }),
    [subscriptions]
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within SubscriptionProvider');
  }
  return context;
}
