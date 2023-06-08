import { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext({
  notification: null,
  shouldRender: false,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export default function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState(null);

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  useEffect(() => {
    const timer = () => setActiveNotification(null);

    if (
      activeNotification && (
        activeNotification.status !== 'pending'
      )
    ) {
      setTimeout(timer, 3000);
    }

    return () => {
      clearTimeout(timer);
    }
  }, [activeNotification]);

  const context = {
    notification: activeNotification,
    shouldRender: Boolean(activeNotification),
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}
