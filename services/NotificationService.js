import * as Notifications from "expo-notifications";

 const sendNotification = async (body) => {
    const notificationContent = {
      title: 'New Notification!',
      body: body,
      sound: true,
    };

    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: null,
    });
  };

export {sendNotification};