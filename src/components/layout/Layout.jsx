import React, { useContext } from 'react';
import MainHeader from './MainHeader';
import Notification from '../ui/notification';
import { NotificationContext } from '../store/notification-context';

export default function Layout({ children }) {
  const { shouldRender } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />

      <main>
        {children}
      </main>

      {shouldRender && <Notification />}
    </>
  )
}
