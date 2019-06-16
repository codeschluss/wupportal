import { enableProdMode } from '@angular/core';
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { NativeModule } from './native.module.tns';

enableProdMode();
platformNativeScriptDynamic({ createFrameOnBootstrap: true })
  .bootstrapModule(NativeModule);
