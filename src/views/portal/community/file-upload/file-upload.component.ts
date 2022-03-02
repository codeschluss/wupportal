import { Component, OnInit } from "@angular/core";
import { BlogpostProvider } from "src/core";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['file-upload.component.sass']
})

export class FileUploadComponent implements OnInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  base64textString: string;
  finalBase64Source: string;
  finalBaseArray: string[] = [];


  constructor(
    private blogPostProvider: BlogpostProvider) {
   }

  ngOnInit(): void {
  }


  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
   this.base64textString= btoa(binaryString);
   this.finalBase64Source = 'data:image/png;base64,' + this.base64textString;
   this.finalBaseArray.push(this.finalBase64Source);
  //  this.imageModel.imageData = this.finalBase64Source;
  //  this.imageBaseArray.push(this.imageModel);
  }

  onUploaded(){

    //this.blogPostProvider.pasteImages(this.imageModel.id,this.imageBaseArray);
  }
}
