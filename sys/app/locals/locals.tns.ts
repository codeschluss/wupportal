import * as GeoLocation from 'nativescript-geolocation';
import * as SocialShare from 'nativescript-social-share';
import * as FileSystem from 'tns-core-modules/file-system';

export { NativeScriptCommonModule as AppCommonModule } from 'nativescript-angular/common';
export { NativeScriptRouterModule as AppRouterModule } from 'nativescript-angular/router';
export { getRootView } from 'tns-core-modules/application';
export { fromBase64 } from 'tns-core-modules/image-source';
export { alert, confirm } from 'tns-core-modules/ui/dialogs';
export { eachDescendant } from 'tns-core-modules/ui/page';
export { openUrl } from 'tns-core-modules/utils/utils';
export { FileSystem };
export { GeoLocation };
export { SocialShare };
