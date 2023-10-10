import { Component , Inject} from '@angular/core';
import { from } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';


@Component({
  selector: 'app-custom-datefilter',
  templateUrl: './custom-datefilter.component.html',
  styleUrls: ['./custom-datefilter.component.css']
})
export class CustomDatefilterComponent {
  fromDate: any;
  toDate: any;

  constructor(@Inject (MAT_DIALOG_DATA) public data:Data,private auth:AuthenticationService, private dataSharingService:DataSharingService, private dialog:MatDialogRef<CustomDatefilterComponent>){}

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
    const dateDetails= {device_id:this.data,from_date:from_date,to_date}
    console.log(from_date);
    console.log(to_date);
    await this.auth.onCustomFilter(dateDetails).subscribe(response=>
      {console.log(response)
      this.dataSharingService.setCustomDateData(response)
      },
      error=>
      console.log(error))
  this.dialog.close()
      
  }

}
