import { Component, OnInit } from "@angular/core";
import { FileUploadService } from "./file-upload.service";

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

  // Inject service
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
      this.loading = !this.loading;
      this.fileUploadService.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {
                  this.loading = false; // Flag variable
              }
          }
      );
  }

//   handleFileSelect(evt){
//     var files = evt.target.files;
//     var file = files[0];

//   if (files && file) {
//       var reader = new FileReader();

//       reader.onload =this._handleReaderLoaded.bind(this);

//       reader.readAsBinaryString(file);
//   }
// }


// _handleReaderLoaded(readerEvt) {
//    var binaryString = readerEvt.target.result;
//           this.base64textString= btoa(binaryString);
//           console.log(btoa(binaryString));
//   }
}
