import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Route } from '@angular/router';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { Observable } from 'rxjs';
import { BlogpostProvider, ImageModel, LabelResolver, RoutingComponent, TopicModel, TopicProvider } from '../../core';
import { FeedbackPieceComponent } from '../parts/pieces/feedback/feedback.piece';

@Component({
  styleUrls: ['ublog.component.sass'],
  templateUrl: 'ublog.component.html'
})

export class UblogComponent
  extends RoutingComponent {

  public config: CKEditor5.Config = {
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    toolbar: {
      items: [
        'heading',
        // 'alignment',
        // 'fontSize',
        '|',
        'bold',
        'italic',
        // 'underline',
        // 'code',
        '|',
        // 'strikethrough',
        // 'subscript',
        // 'superscript',
        // '|',
        'bulletedList',
        'numberedList',
        'indent',
        'outdent',
        '|',
        'link',
        'blockQuote',
        // 'codeBlock',
        'insertTable',
        // 'horizontalLine',
        '|',
        'undo',
        'redo'
      ]
    }
  };

  public editor: CKEditor5.EditorConstructor = InlineEditor;

  public formGroup: FormGroup;

  public topics: Observable<TopicModel[]>;

  public get image(): FormControl {
    return this.formGroup.get('titleImage') as FormControl;
  }

  public get valid(): boolean {
    return this.formGroup.valid;
  }

  protected get routing(): Route {
    return {
      path: '**',
      pathMatch: 'full'
    };
  }

  public constructor(
    private blogpostProvider: BlogpostProvider,
    private labelResolver: LabelResolver,
    private topicProvider: TopicProvider,
    public sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  public ngOnInit(): void {
    this.config.placeholder = this.labelResolver.lookup('content');
    this.topics = this.topicProvider.readAll();

    this.formGroup = new FormGroup({
      author: new FormControl(null, [
        Validators.required
      ]),
      content: new FormControl(null, [
        Validators.required,
        Validators.minLength(64)
      ]),
      mailAddress: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      privacy: new FormControl(false, [
        Validators.requiredTrue
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      titleImage: new FormControl(null, [
        Validators.nullValidator
      ]),
      topicId: new FormControl(null)
    });
  }

  public selectFile(event): void {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (event) => this.image.patchValue(new ImageModel({
        imageData: btoa(event.target.result.toString()),
        mimeType: file.type,
        name: file.name
      }));

      reader.readAsBinaryString(file);
    }
  }

  public submit(): void {
    this.blogpostProvider.create(this.formGroup.value)
    .subscribe({
      next: () => {
        this.formGroup.reset();
        this.snackBar.openFromComponent(FeedbackPieceComponent, {
        data: {
          message: 'blogSuccessfullySubmitted'
        }
      });
      }
    });
  }

}
