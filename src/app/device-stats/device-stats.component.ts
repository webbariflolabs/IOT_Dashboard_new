import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { Chart, ChartTypeRegistry } from 'chart.js';
import { WebsocketService } from '../websocket.service';
import { CustomDatefilterComponent } from '../custom-datefilter/custom-datefilter.component';
import { AuthenticationService } from '../authentication.service';
import { CustomDownloadComponent } from '../custom-download/custom-download.component';
import { DataSharingService } from '../data-sharing.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-device-stats',
  templateUrl: './device-stats.component.html',
  styleUrls: ['./device-stats.component.css']
})
export class DeviceStatsComponent implements OnInit, OnDestroy,AfterViewInit{
  events: string[] = [];
  opened: boolean = true;
  LinechartInstance!: Chart;
  
  private webSocketSubscription: Subscription | undefined;

  subMenuStates: { [key: string]: boolean } = {};


  accountId: string[] = [];
  accountName: string[] = [];
  @ViewChildren('canvasElement') canvasElements!: QueryList<ElementRef>;

  // Array to store Chart instances
  charts: Chart[] = [];


  constructor(public dialog: MatDialog, private router: Router,private webSocketService: WebsocketService, private auth : AuthenticationService, private dataSharingService:DataSharingService) {
    window.onload=()=>{
      console.log('LOADED')
    }
    
    

  }

  updateInterval=20;
  numberElements=200;
  updateCount=0;



  title = 'WebSocketMqtt';

jsonData: any;
dataList:any=[]
  chart: any;
  mqttData:any;

  chart1: Chart | undefined;
  chart2: Chart | undefined;
  chart3: Chart | undefined;
  chart4: Chart | undefined;
  chart5: Chart | undefined;
  chart6: Chart | undefined;
  // Update chart data


 
  // Other methods...


receivedData:any;

  userStoreData:any;
  userNameProfile:any;
  isWebSocketOn= true;
  isWebSocketConnected:any;
  
   ngOnInit(): void {

  
    
    
      this.webSocketSubscription =  this.webSocketService.jsonData$.subscribe((data: any) => {
        this.jsonData = data;
    
        // Update chart data for each canvas
        this.updateChartData(this.jsonData.Ph, 0, this.jsonData.Time, 'Ph','blue');
        this.updateChartData(this.jsonData.voltage, 1, this.jsonData.Time,'Voltage','red');
        this.updateChartData(this.jsonData.Current, 2, this.jsonData.Time,'Current','black');
        this.updateChartData(this.jsonData.ORP, 3, this.jsonData.Time,'ORP','orange');
        this.updateChartData(this.jsonData.CPU_TEMPERATURE, 4, this.jsonData.Time,'Temperature','green');
        this.updateChartData(this.jsonData.DO, 5, this.jsonData.Time,'DO','violet');
      });
    


    this.dataSharingService.data$.subscribe((data) => {
        if (data) {
          this.receivedData = data;
          this.updateChartData(this.receivedData.data.Ph, 0, this.receivedData.time, 'Ph','blue');
          this.updateChartData(this.receivedData.data.voltage, 1, this.receivedData.time,'Voltage','red');
          this.updateChartData(this.receivedData.data.Current, 2, this.receivedData.time,'Current','black');
          this.updateChartData(this.receivedData.data.ORP, 3, this.receivedData.time,'ORP','orange');
          this.updateChartData(this.receivedData.data.CPU_TEMPERATURE, 4, this.receivedData.time,'Temperature','green');
          this.updateChartData(this.receivedData.data.DO, 5, this.receivedData.time,'DO','violet');
        }
      });

    
   
  // Initialize the chart
  this.userStoreData=localStorage.getItem('userData')
  const userDataObject = JSON.parse(this.userStoreData);
  this.userNameProfile=userDataObject.userName
  

  
    
  // this.initChart();


 }







 ngAfterViewInit(): void {
  // Initialize Chart instances after the view is initialized
  this.canvasElements.forEach((canvasElement, index) => {
    const chart = new Chart(canvasElement.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Sample Ph',
            data: [],
            borderColor: '',
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Store the chart instance in the array
    this.charts[index] = chart;
  });
}

// Update chart data
updateChartData(datadevice: any, chartIndex: number, dataTime:any, label: string, bordercolor: string) {
  if (this.charts[chartIndex]) {
    this.charts[chartIndex].data.labels = dataTime;
    this.charts[chartIndex].data.datasets[0].data = datadevice;
    this.charts[chartIndex].data.datasets[0].label = label;
    this.charts[chartIndex].data.datasets[0].borderColor = bordercolor;
    this.charts[chartIndex].update(); // Update the chart
  }
}

ngOnDestroy() {
  // Destroy all chart instances when the component is destroyed


  this.charts.forEach(chart => {
    if (chart) {
      chart.destroy();
    }
  });


   
}



sendMessageToServer(message: string) {
this.webSocketService.sendMessage(message);
}



onBackStats():void{
  this.router.navigate(['./user-account-devices'])
}


openDialog7(): void {
  const dialogRef = this.dialog.open(CardComponent, {
    width: '250px',
    data: { accountId: this.accountId, accountName: this.accountName },
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed')
    this.accountId = result;
    this.accountName = result;
    
  });

  
  
}

onLogout():void{
 this.router.navigate(['/login'])

}


onLogout1():void{
 this.router.navigate(['/login'])

}




onRefresh():void{
  window.location.reload()
}




toggleSubMenu(subMenuKey: string): void {
  this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
}

isSubMenuOpen(subMenuKey: string): boolean {
  return this.subMenuStates[subMenuKey] || false;
}


onClick7(): void {
  this.router.navigate(['./edit5']);
}

onClick8(): void {
  this.router.navigate(['./stat']);
}


 onSelectChange(event: Event):void{

 
  const selectedValue = (event.target as HTMLSelectElement).value;
  if (selectedValue === 'custom') {
    // Open the custom date dialog
 const dialogRef= this.dialog.open(CustomDatefilterComponent, {
      width:'600px',
      height:'300px',
      data: localStorage.getItem('setdeviceId')
    })

    dialogRef.afterClosed().subscribe(() => {
      // Handle the condition or data received from the dialog
   
        // Condition is true, do something
        if (this.webSocketSubscription) {
          this.webSocketSubscription.unsubscribe();
        }
      
    });
  
  
  
  
  
  
  
  }
  else{
    const fixedDetails = {device_id:localStorage.getItem('setdeviceId'),user_given_day:parseInt(selectedValue)}
    this.auth.onDateFilter(fixedDetails).subscribe(response=>
      {console.log(response)
      this.jsonData= response
      
      if(this.webSocketSubscription){
        this.webSocketSubscription.unsubscribe();
      }



      this.updateChartData(this.jsonData.data.Ph, 0, this.jsonData.time, 'Ph','blue');
      this.updateChartData(this.jsonData.data.voltage, 1, this.jsonData.time,'Voltage','red');
      this.updateChartData(this.jsonData.data.Current, 2, this.jsonData.time,'Current','black');
      this.updateChartData(this.jsonData.data.ORP, 3, this.jsonData.time,'ORP','orange');
      this.updateChartData(this.jsonData.data.CPU_TEMPERATURE, 4, this.jsonData.time,'Temperature','green');
      this.updateChartData(this.jsonData.data.DO, 5, this.jsonData.time,'DO','violet');
      this.isWebSocketConnected = true;
    
    }, error=>
      console.log(error))
  }
}

onDownloadData(event:Event, type:any){
  const selectedValue = (event.target as HTMLSelectElement).value;
  if (selectedValue === 'custom') {
    // Open the custom date dialog
  this.dialog.open(CustomDownloadComponent, {
      width:'600px',
      height:'300px',
      data: {id:localStorage.getItem('setdeviceId'),type}
    })
  }
  else{
    const downloadDate = {device_id:localStorage.getItem('setdeviceId'),data_type:type,user_given_day:selectedValue}
    this.auth.downloadCsvFile(downloadDate).subscribe((data: Blob) => {
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
}


//  initChart() {
//   this.chart = new Chart('canvas', {
//     type: 'line',
//     data: {
//       labels: ['January', 'February', 'March', 'April', 'May', 'ffgf'],
//       datasets: [
//         {
//           label: 'Sample Data 1',
//            data: [10,20,40,30,50],
//           borderColor: '#007bff',
//           fill: false,
//         },
//         {
//           label: 'Sample Data 2',
//           data: [10,30,40,20,60],
//           borderColor: '#ff0000',
//           fill: false,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//     },
//   });
// }










// updateChartData(datadevice:any){
//   if (this.chart) {
//     // Destroy the existing chart
//     this.chart.destroy();
//   }
//   this.chart = new Chart('canvas1', {
//     type: 'line',
//     data: {
//       labels: datadevice.Time,
//       datasets: [
//         {
//           label: 'Sample Ph',
//            data: datadevice.Ph,
//           borderColor: '#007bff',
//           fill: false,
//           tension: 0.4, 
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//     },
//   });

//   this.chart = new Chart('canvas2', {
//     type: 'line',
//     data: {
//       labels: datadevice.Time,
//       datasets: [
//         {
//           label: 'Voltage',
//           data: datadevice.voltage,
//           borderColor: '#ff0000',
//           fill: false,
//           tension: 0.4,
//         },

//       ],
//     },
//     options: {
//       responsive: true,
//     },
//   });



//   this.chart = new Chart('canvas3', {
//     type: 'line',
//     data: {
//       labels: datadevice.Time,
//       datasets: [
//         {
//           label: 'DO',
//           data: datadevice.DO,
//           borderColor: '#ff0998',
//           fill: false,
//           tension: 0.4,
//         },

//       ],
//     },
//     options: {
//       responsive: true,
//     },
//   });

 
//   this.chart = new Chart('canvas4', {
//     type: 'line',
//     data: {
//       labels: datadevice.Time,
//       datasets: [
//         {
//           label: 'Current',
//           data: datadevice.Current,
//           borderColor: 'black',
//           fill: false,
//           tension: 0.4,
//         },

//       ],
//     },
//     options: {
//       responsive: true,
//     },
//   });

 
//   this.chart = new Chart('canvas5', {
//     type: 'line',
//     data: {
//       labels: datadevice.Time,
//       datasets: [
//         {
//           label: 'Temperature',
//           data: datadevice.CPU_TEMPERATURE,
//           borderColor: 'green',
//           fill: false,
//           tension: 0.4,
//         },

//       ],
//     },
//     options: {
//       responsive: true,
//     },
//   });

 
//   this.chart = new Chart('canvas6', {
//     type: 'line',
//     data: {
//       labels: datadevice.Time,
//       datasets: [
//         {
//           label: 'ORP',
//           data: datadevice.ORP,
//           borderColor: 'violet',
//           fill: false,
//           tension: 0.4,
//         },

//       ],
//     },
//     options: {
//       responsive: true,
//     },
//   });


// }

// Update chart data

    
    
  
  
  






