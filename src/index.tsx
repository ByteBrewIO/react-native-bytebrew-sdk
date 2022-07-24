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

export function multiply(a: number, b: number): Promise<number> {
  return BytebrewSdk.multiply(a, b);
}
