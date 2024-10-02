import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";

/**
 * Platform: Web
 * Configure and initialize the firebase app.
 * @param options - firebase web app configuration options
 * */
FirebaseAnalytics.initializeFirebase({
  apiKey: "AIzaSyBbLheWjRjoc8rIuL_IHNZdFdp519d_VmY",
  authDomain: "stocksupporter.firebaseapp.com",
  projectId: "stocksupporter",
  storageBucket: "stocksupporter.appspot.com",
  messagingSenderId: "542243227226",
  appId: "1:542243227226:web:1b4fad4e2a35b65fedba63",
  measurementId: "G-BY9FBEW106",
});

/**
 * Platform: Web/Android/iOS
 * Sets the user ID property.
 * @param userId - unique identifier of a user
 * @returns void
 * https://firebase.google.com/docs/analytics/userid
 */
FirebaseAnalytics.setUserId({
  userId: "john_doe_123",
});

/**
 * Platform: Web/Android/iOS
 * Sets a user property to a given value.
 * @param options - property name and value to set
 * @returns void
 * https://firebase.google.com/docs/analytics/user-properties
 */
FirebaseAnalytics.setUserProperty({
  name: "favorite_food",
  value: "pizza",
});

/**
 * Platform: Android/iOS
 * Retrieves the app instance id from the service.
 * @param none
 * @returns instanceId - individual instance id value
 * https://firebase.google.com/docs/analytics/user-properties
 */
FirebaseAnalytics.getAppInstanceId();

/**
 * Platform: Android/iOS
 * Sets the current screen name, which specifies the current visual context in your app.
 * @param screenName - name of the current screen to track
 *        nameOverride - name of the screen class to override
 * @returns instanceId - individual instance id value
 * https://firebase.google.com/docs/analytics/screenviews
 */
FirebaseAnalytics.setScreenName({
  screenName: "login",
  nameOverride: "LoginScreen",
});

/**
 * Platform: Web/Android/iOS
 * Clears all analytics data for this app from the device and resets the app instance id.
 * @param none
 * @returns void
 */
FirebaseAnalytics.reset();

/**
 * Platform: Web/Android/iOS
 * Logs an app event.
 * @param name - name of the event to log
 *        params - key/value pairs of properties (25 maximum per event)
 * @returns void
 */
FirebaseAnalytics.logEvent({
  name: "select_content",
  params: {
    content_type: "image",
    content_id: "P12453",
    items: [{ name: "Kittens" }],
  },
});

/**
 * Platform: Web/Android/iOS
 * Sets whether analytics collection is enabled for this app on this device.
 * @param name - enabled - boolean true/false
 * @returns void
 */
FirebaseAnalytics.setCollectionEnabled({
  enabled: false,
});

/**
 * Platform: Web/Android/iOS
 * Deprecated - use setCollectionEnabled() instead
 * Enable analytics collection for this app on this device.
 * @param none
 * @returns void
 */
FirebaseAnalytics.enable();

/**
 * Platform: Web/Android/iOS
 * Deprecated - use setCollectionEnabled() instead
 * Disable analytics collection for this app on this device.
 * @param none
 * @returns void
 */
FirebaseAnalytics.disable();

/**
 * Platform: Web/Android/iOS
 * Sets the duration of inactivity that terminates the current session.
 * @param duration - duration in seconds (default - 18000)
 * @returns void
 */
FirebaseAnalytics.setSessionTimeoutDuration({
  duration: 10000,
});

export default FirebaseAnalytics;
