import { enableProdMode } from '@angular/core';
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import 'nativescript-theme-core';
import { NativeModule } from './native.module.tns';

enableProdMode();
platformNativeScriptDynamic().bootstrapModule(NativeModule);
