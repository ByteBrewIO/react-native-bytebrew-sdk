package com.reactnativebytebrewsdk;

import android.content.Context;

import androidx.annotation.NonNull;

import com.bytebrew.bytebrewlibrary.ByteBrew;
import com.bytebrew.bytebrewlibrary.ByteBrewAdType;
import com.bytebrew.bytebrewlibrary.ByteBrewProgressionType;
import com.bytebrew.bytebrewlibrary.ByteBrewPurchaseResult;
import com.bytebrew.bytebrewlibrary.PurchaseResponseListener;
import com.bytebrew.bytebrewlibrary.RemoteConfigListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.HashMap;

@ReactModule(name = BytebrewSdkModule.NAME)
public class BytebrewSdkModule extends ReactContextBaseJavaModule {
    public static final String NAME = "BytebrewSdk";
    Context context;
    public BytebrewSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext.getApplicationContext();
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void Initialize(String appID, String appKey, String engineVersion)
    {
      ByteBrew.InitializeByteBrew(appID, appKey, engineVersion, context);
    }

    @ReactMethod
    public void IsByteBrewInitialized(Promise promise)
    {
      promise.resolve(ByteBrew.IsByteBrewInitialized());
    }

    @ReactMethod
    public void StartPushNotifications()
    {
      ByteBrew.StartPushNotifications(context);
    }

    @ReactMethod
    public void NewCustomEvent(String eventName)
    {
      ByteBrew.NewCustomEvent(eventName);
    }

    @ReactMethod
    public void NewCustomEventWithStringValue(String eventName, String value)
    {
      ByteBrew.NewCustomEvent(eventName, value);
    }

    @ReactMethod
    public void NewCustomEventWithNumericValue(String eventName, double value)
    {
      ByteBrew.NewCustomEvent(eventName, (float)value);
    }

    @ReactMethod
    public void NewProgressionEvent(int progessionType, String environment, String stage)
    {
      ByteBrew.NewProgressionEvent(ByteBrewProgressionType.values()[progessionType], environment, stage);
    }

    @ReactMethod
    public void NewProgressionEventWithStringValue(int progessionType, String environment, String stage, String value)
    {
      ByteBrew.NewProgressionEvent(ByteBrewProgressionType.values()[progessionType], environment, stage, value);
    }

    @ReactMethod
    public void NewCustomEventWithNumericValue(int progessionType, String environment, String stage, double value)
    {
      ByteBrew.NewProgressionEvent(ByteBrewProgressionType.values()[progessionType], environment, stage, (float)value);
    }

    @ReactMethod
    public void SetCustomDataWithStringValue(String key, String value)
    {
      ByteBrew.SetCustomData(key, value);
    }

    @ReactMethod
    public void SetCustomDataWithBooleanValue(String key, boolean value)
    {
      ByteBrew.SetCustomData(key, value);
    }

    @ReactMethod
    public void SetCustomDataWithIntValue(String key, int value)
    {
      ByteBrew.SetCustomData(key, value);
    }

    @ReactMethod
    public void SetCustomDataWithDoubleValue(String key, double value)
    {
      ByteBrew.SetCustomData(key, value);
    }

    @ReactMethod
    public void TrackAdEvent(int adType, String adLocation)
    {
      ByteBrew.TrackAdEvent(ByteBrewAdType.values()[adType], adLocation);
    }

    @ReactMethod
    public void TrackAdEventWithAdID(int adType, String adLocation, String adID)
    {
      ByteBrew.TrackAdEvent(ByteBrewAdType.values()[adType], adLocation, adID);
    }

    @ReactMethod
    public void TrackAdEventWithAdProvider(int adType, String adLocation, String adID, String adProvider)
    {
      ByteBrew.TrackAdEvent(ByteBrewAdType.values()[adType], adLocation, adID, adProvider);
    }

    @ReactMethod
    public void TrackInAppPurchase(String store, String currency, double amount, String itemID, String category)
    {
      ByteBrew.TrackInAppPurchaseEvent(store, currency, (float)amount, itemID, category);
    }

    @ReactMethod
    public void TrackGoogleInAppPurchase(String store, String currency, double amount, String itemID, String category, String receipt, String signature)
    {
      ByteBrew.TrackGoogleInAppPurchaseEvent(store, currency, (float)amount, itemID, category, receipt, signature);
    }

    @ReactMethod
    public void ValidateGoogleInAppPurchase(String store, String currency, double amount, String itemID, String category, String receipt, String signature, Promise promise)
    {
      ByteBrew.ValidateGoogleInAppPurchaseEvent(store, currency, (float) amount, itemID, category, receipt, signature,
        new PurchaseResponseListener() {
          @Override
          public void purchaseValidated(ByteBrewPurchaseResult byteBrewPurchaseResult) {
            HashMap<String, Object> purchaseResult = new HashMap<String, Object>(5);
            purchaseResult.put("itemID", byteBrewPurchaseResult.getItemID());
            purchaseResult.put("isValid", byteBrewPurchaseResult.isPurchaseValid());
            purchaseResult.put("purchaseProcessed", byteBrewPurchaseResult.isPurchaseProcessed());
            purchaseResult.put("message", byteBrewPurchaseResult.getMessage());
            purchaseResult.put("timestamp", byteBrewPurchaseResult.getValidationTime());
            promise.resolve(purchaseResult);
          }
        });
    }

    @ReactMethod
    public void GetUserID(Promise promise)
    {
      promise.resolve(ByteBrew.GetUserID());
    }

    @ReactMethod
    public void HasRemoteConfigsBeenSet(Promise promise)
    {
      promise.resolve(ByteBrew.HasRemoteConfigsBeenSet());
    }

    @ReactMethod
    public void LoadRemoteConfigs(Promise promise)
    {
      ByteBrew.LoadRemoteConfigs(new RemoteConfigListener() {
        @Override
        public void RetrievedConfigs(boolean b) {
          promise.resolve(b);
        }
      });
    }

    @ReactMethod
    public void RetrieveRemoteConfigValue(String key, String defaultValue, Promise promise)
    {
      promise.resolve(ByteBrew.RetrieveRemoteConfigValue(key, defaultValue));
    }

    @ReactMethod
    public void StopTracking()
    {
      ByteBrew.StopTracking(context);
    }

    @ReactMethod
    public void RestartTracking()
    {
      ByteBrew.RestartTracking(context);
    }
}
