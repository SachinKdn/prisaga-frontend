'use client';

import { ReactNode, useState } from 'react';
import useCustomEventListener from '@/hooks/useCustomEventListener';
import SubscriptionAlertDialog from '@components/Subscription/SubscriptionAlertDialog';

interface WrapperProps {
  children: ReactNode;
}

const SubscriptionAlertWrapper: React.FC<WrapperProps> = ({ children }) => {
  const [isSubscriptionPopupOpen, setIsSubscriptionPopupOpen] = useState(false);

  const [subscriptionPopupData, setSubscriptionPopupData] =
    useState<SubscriptionPopup>();

  useCustomEventListener('subscription_popup', (e) => {
    setIsSubscriptionPopupOpen(e.detail.isOpen);
    setSubscriptionPopupData(e.detail.data);
  });
  return (
    <>
      {children}
      {isSubscriptionPopupOpen && subscriptionPopupData && (
        <SubscriptionAlertDialog
          isOpen={isSubscriptionPopupOpen}
          onClose={() => setIsSubscriptionPopupOpen(false)}
          data={subscriptionPopupData}
        />
      )}
    </>
  );
};

export default SubscriptionAlertWrapper;
