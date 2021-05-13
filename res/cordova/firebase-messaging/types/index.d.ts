interface FirebaseMessagingChannel {
  description: string;
  id: string;
  name: string;
}

interface FirebaseMessagingCreateChannelOptions {
  badge?: boolean;
  description?: string;
  id: string;
  importance: number;
  light?: boolean;
  lightColor?: number;
  name: string;
  sound?: string;
  vibration?: boolean | number[];
}

interface CordovaPluginFirebaseMessaging {
  subscribe(topic: string): Promise<void>;
  unsubscribe(topic: string): Promise<void>;
  clearNotifications(callack: Function, error: Function): void;
  createChannel(options: FirebaseMessagingCreateChannelOptions): Promise<void>;
  deleteChannel(channelId: string): Promise<void>;
  deleteToken(): Promise<void>;
  findChannel(channelId: string): Promise<FirebaseMessagingChannel>;
  getBadge(): Promise<number>;
  getToken(type?: 'apns-buffer' | 'apns-string'): Promise<string>;
  listChannels(): Promise<FirebaseMessagingChannel[]>;
  onBackgroundMessage(callack: Function, error: Function): void;
  onMessage(callack: Function, error: Function): void;
  onTokenRefresh(callback: Function, error: Function): void;
  requestPermission(options?: { forceShow: boolean }): Promise<any>;
  setBadge(value: number): Promise<any>;
}

interface CordovaPluginFirebase {
  messaging: CordovaPluginFirebaseMessaging;
}

interface CordovaPlugins {
  firebase: CordovaPluginFirebase;
}
