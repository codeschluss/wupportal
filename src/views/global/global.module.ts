import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelModule } from '../../core';
import { PartsModule } from '../parts/module';
import { FooterComponent } from './footer/footer.component';
import { GlobalComponent } from './global.component';
import { HeaderComponent } from './header/header.component';

const components: Type<any>[] = [
  FooterComponent,
  GlobalComponent,
  HeaderComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  LabelModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatProgressBarModule,
  MatToolbarModule,
  PartsModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...materials,
    CommonModule,
    RouterModule
  ]
})

export class GlobalModule { }
