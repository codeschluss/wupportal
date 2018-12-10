import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LanguageModel } from 'src/realm/language/language.model';
import { LanguageProvider } from 'src/realm/language/language.provider';

@Component({
    selector: 'languagechooser-dialog',
    templateUrl: 'languagechooser.component.html',
  })
  export class LangaugeChooserDialogComponent {

    public text: string;
    public languages;

    constructor(
        public dialogRef: MatDialogRef<LangaugeChooserDialogComponent>,
        private languageProvider: LanguageProvider
      ) {
        this.setLanguages();
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

   public getTextContent(): string {
    return 'placeholder text';
   }

   //   Just Prototyping
    changeLanguage(languge: LanguageModel) {
        console.log('language changed to: ' + languge.locale);
    }

    setLanguages(): void {
        this.languageProvider.readAll().then(langs => this.languages = langs);
    }



}
