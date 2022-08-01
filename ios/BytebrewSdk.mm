#import "BytebrewSdk.h"
#import "ByteBrewNativeiOSPlugin/ByteBrewNativeiOSPlugin.h"
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNBytebrewSdkSpec.h"
#endif
#import <React/RCTLog.h>

@interface BytebrewSdk()
@property (nonatomic, assign) BOOL initializationCalled;
@end

@implementation BytebrewSdk
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(Initialize: (NSString *)appID appKey:(NSString *) appKey engineVersion:(NSString *) engineVersion)
{
    [ByteBrewNativeiOSPlugin InitializeWithSettings:appID SecretKey:appKey EngineVersion:engineVersion BuildVersion:[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"]];
    self.initializationCalled = YES;
}

RCT_EXPORT_METHOD(StartPushNotifications)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin StartPushNotification];
}

RCT_EXPORT_METHOD(NewCustomEvent: (NSString *) eventName)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddNewCustomEvent:eventName];
}

RCT_EXPORT_METHOD(NewCustomEventWithStringValue: (NSString *) eventName value:(NSString *) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddNewCustomEventWithStringValue:eventName Value:value];
}

RCT_EXPORT_METHOD(NewCustomEventWithNumericValue: (NSString *) eventName value:(double) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddNewCustomEventWithNumericValue:eventName Value:value];
}

RCT_EXPORT_METHOD(NewProgressionEvent: (int) progressionType environment:(NSString *) environment stage:(NSString *) stage)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddProgressionEvent:(ByteBrewProgressionType)progressionType Environment:environment Stage:stage];
}

RCT_EXPORT_METHOD(NewProgressionEventWithStringValue: (int) progressionType environment:(NSString *) environment stage:(NSString *) stage value:(NSString *) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddProgressionEventWithStringValue:(ByteBrewProgressionType)progressionType Environment:environment Stage:stage Value:value];
}

RCT_EXPORT_METHOD(NewProgressionEventWithNumericValue: (int) progressionType environment:(NSString *) environment stage:(NSString *) stage value:(double) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddProgressionEventWithNumericValue:(ByteBrewProgressionType)progressionType Environment:environment Stage:stage Value:value];
}

RCT_EXPORT_METHOD(SetCustomDataWithStringValue: (NSString *) key value:(NSString *) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddCustomDataAttributeWithStringValue:key Value:value];
}

RCT_EXPORT_METHOD(SetCustomDataWithIntValue: (NSString *) key value:(int) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddCustomDataAttributeWithIntegerValue:key Value:value];
}

RCT_EXPORT_METHOD(SetCustomDataWithDoubleValue: (NSString *) key value:(double) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddCustomDataAttributeWithDoubleValue:key Value:value];
}

RCT_EXPORT_METHOD(SetCustomDataWithBooleanValue: (NSString *) key value:(nonnull NSNumber *) value)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddCustomDataAttributeWithBooleanValue:key Value:[value boolValue]];
}

RCT_EXPORT_METHOD(TrackAdEvent: (int) adType adLocation:(NSString*) adLocation)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    NSString* adTypeSTR = @"";
    if(adType == 0) {
        adTypeSTR = @"Interstitial";
    } else if(adType == 1) {
        adTypeSTR = @"Reward";
    } else if(adType == 2) {
        adTypeSTR = @"Banner";
    }
    
    [ByteBrewNativeiOSPlugin NewTrackedAdEvent:adTypeSTR AdLocation:adLocation];
}

RCT_EXPORT_METHOD(TrackAdEventWithAdID: (int) adType adLocation:(NSString *) adLocation adID:(NSString *) adID)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    NSString* adTypeSTR = @"";
    if(adType == 0) {
        adTypeSTR = @"Interstitial";
    } else if(adType == 1) {
        adTypeSTR = @"Reward";
    } else if(adType == 2) {
        adTypeSTR = @"Banner";
    }
    
    [ByteBrewNativeiOSPlugin NewTrackedAdEvent:adTypeSTR AdLocation:adLocation AdID:adID];
}

RCT_EXPORT_METHOD(TrackAdEventWithAdProvider: (int) adType adLocation:(NSString *) adLocation adID:(NSString *) adID adProvider:(NSString*) adProvider)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    NSString* adTypeSTR = @"";
    if(adType == 0) {
        adTypeSTR = @"Interstitial";
    } else if(adType == 1) {
        adTypeSTR = @"Reward";
    } else if(adType == 2) {
        adTypeSTR = @"Banner";
    }
    
    [ByteBrewNativeiOSPlugin NewTrackedAdEvent:adTypeSTR AdLocation:adLocation AdID:adID AdProvider:adProvider];
}

RCT_EXPORT_METHOD(TrackInAppPurchase: (NSString *) store currency:(NSString *) currency amount:(nonnull NSNumber *) amount itemID:(NSString *) itemID category:(NSString *) category)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddTrackedInAppPurchaseEvent:store Currency:currency Amount:[amount floatValue] ItemID:itemID Category:category];
}

RCT_EXPORT_METHOD(TrackAppleInAppPurchase: (NSString *) store currency:(NSString *) currency amount:(nonnull NSNumber *) amount itemID:(NSString *) itemID category:(NSString *) category receipt:(NSString *) receipt)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        return;
    }
    
    [ByteBrewNativeiOSPlugin AddTrackediOSInAppPurchaseEvent:store Currency:currency Amount:[amount floatValue] ItemID:itemID Category:category Receipt:receipt];
}

RCT_EXPORT_METHOD(ValidateAppleInAppPurchase: (NSString *) store currency:(NSString *) currency amount:(nonnull NSNumber *) amount itemID:(NSString *) itemID category:(NSString *) category receipt:(NSString *) receipt withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        NSDictionary* dataDict = [[NSDictionary alloc] init];
        resolve(dataDict);
        return;
    }
    
    [ByteBrewNativeiOSPlugin ValidateiOSInAppPurchaseEvent:store Currency:currency Amount:[amount floatValue] ItemID:itemID Category:category Receipt:receipt finishedValidationResult:^(NSMutableDictionary *purchaseResult) {
        NSDictionary* dataDict = [[NSDictionary alloc] initWithDictionary:purchaseResult];
        resolve(dataDict);
    }];
}

RCT_EXPORT_METHOD(GetUserID: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        resolve(@"");
        return;
    }
    
    resolve([ByteBrewNativeiOSPlugin GetUserID]);
}

RCT_EXPORT_METHOD(HasRemoteConfigsBeenSet: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        resolve([NSNumber numberWithBool:NO]);
        return;
    }
    
    resolve([NSNumber numberWithBool:[ByteBrewNativeiOSPlugin HasRemoteConfigs]]);
}

RCT_EXPORT_METHOD(LoadRemoteConfigs: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        resolve([NSNumber numberWithBool:NO]);
        return;
    }
    
    [ByteBrewNativeiOSPlugin LoadRemoteConfigs:^(BOOL status) {
        resolve([NSNumber numberWithBool:status]);
    }];
}

RCT_EXPORT_METHOD(RetrieveRemoteConfigValue: (NSString *)key defaultValue:(NSString *) defaultValue withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    if(![self initializationCalled]) {
        NSLog(@"ByteBrew: Must call initialization first before anything else.");
        resolve(defaultValue);
        return;
    }
    
    resolve([ByteBrewNativeiOSPlugin RetrieveRemoteConfigs:key DefaultValue:defaultValue]);
}

RCT_EXPORT_METHOD(StopTracking)
{
    [ByteBrewNativeiOSPlugin StopTracking];
}

RCT_EXPORT_METHOD(RestartTracking)
{
    [ByteBrewNativeiOSPlugin RestartTracking];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeBytebrewSdkSpecJSI>(params);
}
#endif

@end
