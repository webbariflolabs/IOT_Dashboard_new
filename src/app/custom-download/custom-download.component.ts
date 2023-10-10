import { Component , Inject} from '@angular/core';
import { from } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-custom-download',
  templateUrl: './custom-download.component.html',
  styleUrls: ['./custom-download.component.css']
})
export class CustomDownloadComponent {
  fromDate: any;
  toDate: any;

  constructor(@Inject (MAT_DIALOG_DATA) public data:Data,private auth:AuthenticationService){}

 formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }
  
  

  async onFilter(){
    const from_date = this.formatDate(this.fromDate);
    const to_date = this.formatDate(this.toDate);
    const dateDetails= {device_id:this.data['id'],from_date:from_date,to_date, data_type:this.data['type']}
    console.log(from_date);
    console.log(to_date);
    await this.auth.onDownloadDate(dateDetails).subscribe((data: Blob) => {
      // Create a blob URL
      const fileName = 'example.csv'; // Replace with the desired file name
      const blobUrl = window.URL.createObjectURL(data);
  
      // Create an anchor element
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = fileName;
  
      // Programmatically trigger a click event to initiate the download
      anchor.click();
  
      // Clean up by revoking the blob URL
      window.URL.revokeObjectURL(blobUrl);
    });
      
  }

}
