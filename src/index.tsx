import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-bytebrew-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const BytebrewSdk = NativeModules.BytebrewSdk  ? NativeModules.BytebrewSdk  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const SDKVERSION = "0.1.5";

/**
 * Initialize ByteBrew with your App/Game ID and SDK Key
 */
const Initialize = (appID: string, appKey: string) => {
  BytebrewSdk.Initialize(appID, appKey, `REACT_NATIVE@${SDKVERSION}`);
}

/**
 * Check if the SDK is initialized
 * @returns Boolean saying if the SDK is done initializing
 */
 const IsByteBrewInitialized = (): Promise<boolean> => {
  return BytebrewSdk.IsByteBrewInitialized();
}

/**
 * Start initialization of ByteBrew Push Notifications
 */
const StartPushNotifications = () => {
  BytebrewSdk.StartPushNotifications();
}

/**
 * Track a new Custom Event
 * @param eventName The event name you want to track
 * @param value Optional
 */
const NewCustomEvent = (eventName: string, value?: string | number) => {
  if(!value) {
    BytebrewSdk.NewCustomEvent(eventName);
  } else if(typeof value == 'string') {
    BytebrewSdk.NewCustomEventWithStringValue(eventName, value);
  } else if(typeof value == 'number') {
    BytebrewSdk.NewCustomEventWithNumericValue(eventName, value);
  }
}

/**
 * Track a new Progression Event
 * @param progressionType Started, Completed, Failed
 * @param environment The environment your progressing in, could be like "pages", "levels"
 * @param stage The name of the stage or level your in
 * @param value Optional
 * @return
 */
const NewProgressionEvent = (progressionType: 'Started' | 'Completed' | 'Failed', environment: string, stage: string, value?: string | number) => {
  var indexType = (progressionType == "Started") ? 0 : (progressionType == "Completed") ? 1 : (progressionType == "Failed") ? 2 : -1;
  if(indexType == -1) {
    return;
  }

  if(!value) {
    BytebrewSdk.NewProgressionEvent(indexType, environment, stage);
  } else if(typeof value == 'string') {
    BytebrewSdk.NewProgressionEventWithStringValue(indexType, environment, stage, value);
  } else if(typeof value == 'number') {
    BytebrewSdk.NewCustomEventWithNumericValue(indexType, environment, stage, value);
  }
}

/**
 * Set a Custom Data Attribute to a user for querying or segmenting in the dashboard
 * @param key The attribute name
 * @param value The value of the attribute
 */
const SetCustomDataAttribute = (key: string, value: string | number | boolean) => {
  if(typeof value == "string") {
    BytebrewSdk.SetCustomDataWithStringValue(key, value);
  } else if(typeof value == "boolean") {
    BytebrewSdk.SetCustomDataWithBooleanValue(key, value);
  } else if(typeof value == "number") {
    if(value % 1 == 0) {
      BytebrewSdk.SetCustomDataWithIntValue(key, value);
    } else {
      BytebrewSdk.SetCustomDataWithDoubleValue(key, value);
    }
  }
}

/**
 * Track a Ad Event that happens in your app/game
 * @param adType The type of ad "Interstitial", "Reward", "Banner"
 * @param adLocation The location of where the ad was shown
 * @param adID Optional: The possible id of the ad unit
 * @param adProvider Optional: The provider or ad network that showed the ad
 * @returns 
 */
const TrackAdEvent = (adType: 'Interstitial' | 'Reward' | 'Banner', adLocation: string, adID?: string, adProvider?: string) => {
  var indexType = (adType == "Interstitial") ? 0 : (adType == "Reward") ? 1 : (adType == "Banner") ? 2 : -1;
  if(indexType == -1) {
    return;
  }

  if(adID) {
    if(adProvider) {
      BytebrewSdk.TrackAdEventWithAdProvider(indexType, adLocation, adID, adProvider);
    } else {
      BytebrewSdk.TrackAdEventWithAdID(indexType, adLocation, adID);
    }
  } else {
    BytebrewSdk.TrackAdEvent(indexType, adLocation);
  }
}

/**
 * Track a Ad Event that happens in your app/game and record the revenue
 * @param adType The type of ad "Interstitial", "Reward", "Banner"
 * @param adProvider The provider or ad network that showed the ad
 * @param adUnitName The possible name or id of the ad unit
 * @param revenue The revenue earned from the impression
 * @param adLocation Optional: The location in your app/game the ad occurred
 * @returns 
 */
const TrackAdEventRevenue = (adType: 'Interstitial' | 'Reward' | 'Banner', adProvider: string, adUnitName: string, revenue: number, adLocation?: string) => {
  var indexType = (adType == "Interstitial") ? 0 : (adType == "Reward") ? 1 : (adType == "Banner") ? 2 : -1;
  if(indexType == -1) {
    return;
  }

  if(adLocation) {
    BytebrewSdk.TrackAdEventWithAdLocationRevenue(indexType, adProvider, adUnitName, adLocation, revenue);
  } else {
    BytebrewSdk.TrackAdEventWithRevenue(indexType, adProvider, adUnitName, revenue);
  }
}

/**
 * Track a new in-purchase that occurs, this is default and does not validate the purchase
 * @param store Store where the purchase occurs, usually put "Google Play Store", "Apple App Store"
 * @param currency The currency used to pay
 * @param amount The amount paid
 * @param itemID The product/item ID purchased
 * @param category The category the purchase belongs to, ex. "Cart", "Clothing", "NoAds"
 */
const TrackInAppPurchase = (store: string, currency: string, amount: number, itemID: string, category: string) => {
  BytebrewSdk.TrackInAppPurchase(store, currency, amount, itemID, category);
}

/**
 * Track a new Apple in-purchase, this will validate the purchase and track it.
 * @param store Store where the purchase occurs, usually put "Google Play Store", "Apple App Store"
 * @param currency The currency used to pay
 * @param amount The amount paid
 * @param itemID The product/item ID purchased
 * @param category The category the purchase belongs to, ex. "Cart", "Clothing", "NoAds"
 * @param receipt The receipt given by the Apple App Store for the purchase.
 */
const TrackAppleInAppPurchase = (store: string, currency: string, amount: number, itemID: string, category: string, receipt: string) => {
  if(Platform.OS == "ios") {
    BytebrewSdk.TrackAppleInAppPurchase(store, currency, amount, itemID, category, receipt);
  } else {
    console.log("ByteBrew: Can only track Apple purchases on iOS applications.");
  }
}

/**
 * Track a new Google in-purchase, this will validate the purchase and track it.
 * @param store Store where the purchase occurs, usually put "Google Play Store", "Apple App Store"
 * @param currency The currency used to pay
 * @param amount The amount paid
 * @param itemID The product/item ID purchased
 * @param category The category the purchase belongs to, ex. "Cart", "Clothing", "NoAds"
 * @param receipt The receipt given by the Google Play Store for the purchase.
 * @param signature The purchase signature given by the Google Play Store.
 */
const TrackGoogleInAppPurchase = (store: string, currency: string, amount: number, itemID: string, category: string, receipt: string, signature: string) => {
  if(Platform.OS == "android") {
    BytebrewSdk.TrackGoogleInAppPurchase(store, currency, amount, itemID, category, receipt, signature);
  } else {
    console.log("ByteBrew: Can only track Google purchases on Android applications.");
  }
}

/**
 * Validate a Apple in-app purchase, NOTE: This will validate and track the purchase, just call this if you want to track and return the validation response.
 * Do not track a purchase twice, just use this to validate and track if you want a response about the purchases validation result.
 * @param store Store where the purchase occurs, usually put "Google Play Store", "Apple App Store"
 * @param currency The currency used to pay
 * @param amount The amount paid
 * @param itemID The product/item ID purchased
 * @param category The category the purchase belongs to, ex. "Cart", "Clothing", "NoAds"
 * @param receipt The receipt given by the Apple App Store for the purchase.
 * @returns Promise, the validation results ex. {itemID: 'some_product', isValid: true, purchaseProcessed: true, message: "Validation Successful, real purchase.", timestamp: "2022-07-31 13:00:00.000 UTC"}
 */
const ValidateAppleInAppPurchase = (store: string, currency: string, amount: number, itemID: string, category: string, receipt: string): Promise<Object> => {
  return BytebrewSdk.ValidateAppleInAppPurchase(store, currency, amount, itemID, category, receipt);
}

/**
 * Validate a Google in-app purchase, NOTE: This will also track the purchase analyticaly, just call this if you want to track and return the validation response.
 * Do not track a purchase twice, just use this to validate and track if you want a response about the purchases validation result.
 * @param store Store where the purchase occurs, usually put "Google Play Store", "Apple App Store"
 * @param currency The currency used to pay
 * @param amount The amount paid
 * @param itemID The product/item ID purchased
 * @param category The category the purchase belongs to, ex. "Cart", "Clothing", "NoAds"
 * @param receipt The receipt given by the Apple App Store for the purchase.
 * @param signature The purchase signature given by the Google Play Store.
 * @returns Promise, the validation results ex. {itemID: 'some_product', isValid: true, purchaseProcessed: true, message: "Validation Successful, real purchase.", timestamp: "2022-07-31 13:00:00.000 UTC"}
 */
const ValidateGoogleInAppPurchase = (store: string, currency: string, amount: number, itemID: string, category: string, receipt: string, signature: string): Promise<Object> => {
  return BytebrewSdk.ValidateGoogleInAppPurchase(store, currency, amount, itemID, category, receipt, signature);
}

/**
 * Get the current User ID
 * @returns The current tracked user ID
 */
const GetUserID = (): Promise<string> => {
  return BytebrewSdk.GetUserID();
}

/**
 * Check if the Remote Configs have been loaded
 * @returns Boolean saying if the remote configs have been loaded
 */
const HasRemoteConfigsBeenSet = (): Promise<boolean> => {
  return BytebrewSdk.HasRemoteConfigsBeenSet();
}

/**
 * Start loading the Remote Configs
 * @returns Promise to tell if the Remote Configs are done loading
 */
const LoadRemoteConfigs = (): Promise<boolean> => {
  return BytebrewSdk.LoadRemoteConfigs();
}

/**
 * Get the Remote Config value for the specified key
 * @param key The config key you set in the Remote Config Dashboard
 * @param defaultValue The default value that can be set if there is not Config Values
 * @returns The value for the config key
 */
const RetrieveRemoteConfigValue = (key: string, defaultValue: string): Promise<string> => {
  return BytebrewSdk.RetrieveRemoteConfigValue(key, defaultValue);
}

/**
 * Stop tracking the current user forever
 */
const StopTracking = () => {
  BytebrewSdk.StopTracking();
}

/**
 * Restart the tracking status for this user.
 */
const RestartTracking = () => {
  BytebrewSdk.RestartTracking();
}

export default {
  Initialize,
  IsByteBrewInitialized,
  StartPushNotifications,
  NewCustomEvent,
  NewProgressionEvent,
  SetCustomDataAttribute,
  TrackAdEvent,
  TrackAdEventRevenue,
  TrackInAppPurchase,
  TrackAppleInAppPurchase,
  TrackGoogleInAppPurchase,
  ValidateAppleInAppPurchase,
  ValidateGoogleInAppPurchase,
  GetUserID,
  HasRemoteConfigsBeenSet,
  LoadRemoteConfigs,
  RetrieveRemoteConfigValue,
  StopTracking,
  RestartTracking
}
