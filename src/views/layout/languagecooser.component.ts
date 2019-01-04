import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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
        private languageProvider: LanguageProvider,
        // private session: SessionProvider,
        ) {
        this.initLanguages();
      }

    close(): void {
      this.dialogRef.close();
    }

   public getTextContent(): string {
    return 'placeholder text';
   }

   //   Just Prototyping
    changeLanguage(locale: string) {

      // this.session.changeLanguage(locale);
      // location.reload();
    }

    private initLanguages(): void {
        this.languageProvider.readAll().subscribe(langs => {
          this.languages = langs;
        });
    }



}
