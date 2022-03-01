import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public communityForm: FormGroup;



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
    this.communityForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      title: ['',Validators.required],
      about: ['', Validators.required]
    })
  }

  onSendForm(){
    console.log(this.communityForm);
  }

}
