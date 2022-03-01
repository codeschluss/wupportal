import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogpostProvider, RoutingComponent, TopicModel, TopicProvider } from '../../../core';

@Component({
  styleUrls: ['community.form.sass'],
  templateUrl: 'community.form.html'
})

export class CommunityFormComponent
  extends RoutingComponent {

  public topics: Observable<TopicModel[]>;
  communityForm: FormGroup;

  protected get routing(): Route {
    return {
      path: 'blogpost'
    };
  }

  public constructor(
    private blogpostProvider: BlogpostProvider,
    private topicProvider: TopicProvider,
    private fb: FormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this.topics = this.topicProvider.readAll();
    this.communityForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'titel': new FormControl(null, Validators.required),
      'about': new FormControl(null, Validators.required)
    })
  }

  onSendForm(){
    console.log(this.communityForm);
  }

}
