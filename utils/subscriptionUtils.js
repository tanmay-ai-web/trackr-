const monthlyFromSubscription = (subscription) => {
  if (subscription.cycle === 'yearly') {
    return subscription.price / 12;
  }
  return subscription.price;
};

export const getMonthlyTotal = (subscriptions) =>
  subscriptions.reduce((sum, sub) => sum + monthlyFromSubscription(sub), 0);

export const getYearlyEstimate = (subscriptions) => getMonthlyTotal(subscriptions) * 12;

export const formatCurrency = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;

export const formatDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const getRenewalAlert = (subscriptions) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowString = tomorrow.toISOString().slice(0, 10);
  const renewing = subscriptions.find((sub) => sub.nextBillingDate === tomorrowString);

  if (!renewing) {
    return 'No subscription renewals tomorrow';
  }

  return `${renewing.name} renews tomorrow`;
};
