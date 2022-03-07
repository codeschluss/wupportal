import { Component } from '@angular/core';
import { BlogpostModel } from '../../../../core';
import { BaseCard } from '../base.card';

@Component({
  selector: 'blogpost-card',
  styleUrls: ['../base.card.sass', 'blogpost.card.sass'],
  templateUrl: 'blogpost.card.html'
})

export class BlogpostCardComponent
  extends BaseCard<BlogpostModel> { }
