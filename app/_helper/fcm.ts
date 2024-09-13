import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";

import { Capacitor } from "@capacitor/core";

import { Dialog } from "@capacitor/dialog";

export const pushNotificationInit = (auth: any) => {
  if (Capacitor.getPlatform() == "web") return;
  if (!auth) return;

  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      PushNotifications.register();
    } else {
      Dialog.alert({
        title: "Notification permission rejected",
        message:
          "You will not be able to get any notification. You can change this from settings",
      });
    }
  });

  PushNotifications.addListener("registration", async (token: Token) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile/updateFcmToken/${auth._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ fcmToken: token.value }),
      }
    );
    if (!res.ok) {
      Dialog.alert({
        title: "Falied to register for notification",
        message: "Something went wrong. Please try again later",
      });
    }
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener("registrationError", (error: any) => {
    Dialog.alert({
      title: "Falied to register for notification",
      message: "Something went wrong. Please try again later",
    });
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener(
    "pushNotificationReceived",
    (notification: PushNotificationSchema) => {
      Dialog.alert({
        title: notification.title,
        message: notification.body || "",
      });
    }
  );

  // // Method called when tapping on a notification
  // PushNotifications.addListener(
  //   "pushNotificationActionPerformed",
  //   (notification: ActionPerformed) => {
  //     alert("Push action performed: " + JSON.stringify(notification));
  //   }
  // );
};
