import { enableProdMode } from '@angular/core';
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { NativeModule } from './native.module';

enableProdMode();
platformNativeScriptDynamic().bootstrapModule(NativeModule);
