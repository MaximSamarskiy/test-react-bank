import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import BackButton from "../../component/back_button/back_button";
import './index.scss';
import Frame540 from '../../image/svg/Frame 540.png';
import Frame541 from "../../image/svg/Frame 541.png";

const NotificationsPage = () => {
  const { state } = useContext(AuthContext);

  const renderIcon = (type) => {
    switch (type) {
      case 'Announcement':
        return <img className="img" src={Frame540} alt="Announcement" />;
      case 'Warning':
        return <img className="img" src={Frame541} alt="Warning" />;
      default:
        return null;
    }
  };

  return (
    <div className='page page-not'>
      <header className="header">
        <div className="header-content">
          <BackButton />
          <h1 className="page_title">Notifications</h1>
        </div>
      </header>

      <div className='page_section'>
        {state.notifications && state.notifications.length > 0 ? (
          state.notifications.map((notification, index) => (
            <button key={index} className='notification-item' onClick={() => console.log('Clicked!')}>
              {renderIcon(notification.type) && (
                <img src={renderIcon(notification.type)} alt={notification.type} className='notification-icon' />
              )}
              <div className='notification-content'>
                <span className='notification-title'>{notification.message}</span>
                <span className='notification-subtitle'>
                  {new Date(notification.timestamp).toLocaleString()} · {notification.type}
                </span>
              </div>
            </button>
          ))
        ) : (
          <div>No notifications</div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
