import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Route } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BlogpostModel, BlogpostProvider, ImageModel, RoutingComponent, TopicModel, TopicProvider } from '../../../core';

@Component({
  styleUrls: ['community.form.sass'],
  templateUrl: 'community.form.html'
})

export class CommunityFormComponent
  extends RoutingComponent {

  public topics: Observable<TopicModel[]>;
  public communityForm: FormGroup;
  public checkedBox = false;
  images: ImageModel[] = [];

  protected get routing(): Route {
    return {
      path: 'blogpost'
    };
  }

  public constructor(
    private blogpostProvider: BlogpostProvider,
    private topicProvider: TopicProvider,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer
  ) {
    super();
  }

  public ngOnInit(): void {
    this.topics = this.topicProvider.readAll();
    this.communityForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      title: ['',Validators.required],
      topic: ['', Validators.required],
      content: [''],
      checkBox: [false,Validators.requiredTrue]
    })
  }

  onSendForm(){
    console.log(this.communityForm);
    this.blogpostProvider.create({
      author: this.communityForm.get('name').value,
      mailAddress: this.communityForm.get('email').value,
      title: this.communityForm.get('title').value,
      topic: this.communityForm.get('topic').value,
      content: this.communityForm.get('content').value,
    }).pipe(
      switchMap((result: BlogpostModel) => this.blogpostProvider.pasteImages(result.id,this.images))
    )
    .subscribe();
  }

  onChecked(value: boolean){
    this.checkedBox = !value;
  }

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      //reader.onload = (event) => this._handleReaderLoaded.bind(this);
      reader.onload = (event) => this.images.push(new ImageModel({
        imageData: btoa(event.target.result.toString()),
        mimeType: 'image/png'
      }));

      reader.readAsBinaryString(file);
    }
  }

  onDelete(index: number){
    this.images.splice(index,1);
  }

}
