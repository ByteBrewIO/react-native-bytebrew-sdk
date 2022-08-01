//
//  ByteBrewiOSProxy.m
//  ByteBrewNativeiOSPlugin
//
//  Created by Cameron Hozouri on 12/18/21.
//  Copyright © 2021 Mad Cow Studios Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <objc/runtime.h>
#import "ByteBrewNativeiOSPlugin.h"
#import <Foundation/Foundation.h>
#import "UIKit/UIKit.h"

@implementation UIApplication(ByteBrewPush)

+ (void) load {
    NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
    
    NSString* pushSetting = [preferences stringForKey:@"BB_PUSH_SET"];
    //Check for if the developer wants push notifications, this will either be nil or 0
    //We do have the possibility of them turning this on and then off which will result
    //in the next next session setting the preference to the perfered push setting
    //We deal with this by calling all original swizzled methods so any other push notification platform
    //Will get the notification as well and checking that
    //The push notifications that are only sent by ByteBrew are tracked by bytebrew sdk
    if(pushSetting != nil) {
        if([pushSetting isEqualToString:@"1"]) {
            [self SwizzleLaunch];
        }
    }
    
}

+ (void) SwizzleLaunch {
    static dispatch_once_t once;
    dispatch_once(&once, ^
    {
        SEL originalFinishLaunchSEL = @selector(setDelegate:);
        SEL extendedFinishLaunchSEL = @selector(setByteBrewDelegate:);
        
        //Original Set delegate method
        Method originalSetDelegateMethod = class_getInstanceMethod(self, originalFinishLaunchSEL);
        
        // Swizzling the method
        Method extendedSetDelegateMethod = class_getInstanceMethod(self, extendedFinishLaunchSEL);
        
        method_exchangeImplementations(originalSetDelegateMethod, extendedSetDelegateMethod);
    });
}

- (void)setByteBrewDelegate:(id<UIApplicationDelegate>)delegate {
    static dispatch_once_t once;
    dispatch_once(&once, ^
    {
        NSLog(@"ByteBrew Swizzling didFinishLaunchingWithOptions");
        Class delegateClass = [delegate class];
        Class byteApplicationClass = [self class];
        
        SEL originalFinishLaunchSEL = @selector(application:didFinishLaunchingWithOptions:);
        SEL extendedFinishLaunchSEL = @selector(extendedApplication:didFinishLaunchingWithOptions:);
        
        //Original App delegate method
        Method originalFinishLaunchMethod;
        
        // Swizzling the method
        Method extendedFinishLaunchMethod = class_getInstanceMethod(byteApplicationClass, extendedFinishLaunchSEL);
        
        
        if(class_getInstanceMethod(delegateClass, originalFinishLaunchSEL) != nil) {
            class_addMethod(delegateClass, extendedFinishLaunchSEL, method_getImplementation(extendedFinishLaunchMethod), method_getTypeEncoding(extendedFinishLaunchMethod));

            extendedFinishLaunchMethod = class_getInstanceMethod(delegateClass, extendedFinishLaunchSEL);
            
            originalFinishLaunchMethod = class_getInstanceMethod(delegateClass, originalFinishLaunchSEL);
            
            method_exchangeImplementations(originalFinishLaunchMethod, extendedFinishLaunchMethod);
            
            NSLog(@"ByteBrew Push Notifications: Finished Swizzling current didFinishLaunchingWithOptions implementation");

        } else {
            class_addMethod(delegateClass, originalFinishLaunchSEL, method_getImplementation(extendedFinishLaunchMethod), method_getTypeEncoding(extendedFinishLaunchMethod));
            
            NSLog(@"ByteBrew Push Notifications: No current implementation adding custom didFinishLaunchingWithOptions");

        }
        
        [self setByteBrewDelegate:delegate];
    });
}

- (BOOL)extendedApplication:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> *)launchOptions {
    NSLog(@"Setting Up ByteBrew Push");
    
    //We start a small part of push notifications to basically swizzle small parts for grabbing push payloads and for useful analytics
    //Other Parts of the SDK will be initialized when the scene or SDKs start
    [ByteBrewNativeiOSPlugin LowLevelPushStart];
    
    return [self extendedApplication:application didFinishLaunchingWithOptions:launchOptions];
}

@end
