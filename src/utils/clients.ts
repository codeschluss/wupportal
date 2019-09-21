import { openUrl } from '../views/shared/shared.imports';
import { ClientPackage } from './package';

declare const android: any;

export function WebChromeClientFactory(): any {
  return android.webkit.WebChromeClient.extend({
    onGeolocationPermissionsShowPrompt: (url: string, callback: any) => {
      if (url.startsWith(ClientPackage.config.defaults.appUrl)) {
        callback.invoke(url, true, false);
      }
    }
  });
}

export function WebViewClientFactory(onRoute?: (url: string) => void): any {
  return android.webkit.WebViewClient.extend({
    shouldOverrideUrlLoading: (_: any, data: any) => {
      const url = typeof data === 'string' ? data : data.getUrl().toString();

      if (onRoute && url.startsWith(ClientPackage.config.defaults.appUrl)) {
        onRoute(url.replace(ClientPackage.config.defaults.appUrl, ''));
      } else {
        openUrl(url);
      }

      return true;
    }
  });
}
