import { Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { AlertController, ToastController,NavController } from '@ionic/angular';

import { ApiService } from './../api.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  yourLocation = '123 Test Street';
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels;
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [{ data: [], label: 'Total' }];

  barChartLabels1;
  values2;
  barChartData2 = [{ data: [], label: 'Total' }];

  doughnutChartLabels = [];
  doughnutChartData = [];
  doughnutChartType = 'doughnut';

  pieChartLabels = [];
  pieChartData = [];
  pieChartType = 'pie';

  // line chart
  public lineChartData = [
    { data: [], label: ' report' },
  ];
  public lineChartLabels = [];
  // public lineChartOptions;
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  
  lineChartOptions: any = { legend: { display: true, labels: { fontColor: 'black' } }};


  // init start
  patientsData;
  patientsAllData;
  patientsRecoveredData;
  patientHptlData;
  patientDeathData;

  keys;
  stateData;

  allState;
  allstatus;
  values;
  allReported;

  state_status;

  ngOnInit() {

    // patientId: 1
    // reportedOn: "30/01/2020"
    // onsetEstimate: ""
    // ageEstimate: "20"
    // gender: "female"
    // city: "Thrissur"
    // district: "Thrissur"
    // state: "Kerala"
    // status: "Recovered"
    // notes: "Student from Wuhan"
    // contractedFrom: ""
    this.patientApi.GeAllPatients().subscribe(data => {

      this.patientsAllData = data["data"]["rawPatientData"];
      console.log(this.patientsAllData);

      this.patientsData = this.patientsAllData.filter(
        patients => patients['reportedOn'] !== null);

      console.log(this.patientsData.length);
      this.patientsRecoveredData = this.patientsData.filter(
        recovered => recovered['status'] === 'Recovered');

      this.patientHptlData = this.patientsData.filter(
        recovered => recovered['status'] === 'Hospitalized');

      this.patientDeathData = this.patientsData.filter(
        recovered => recovered['status'] === 'Deceased');



      this.allState = _.countBy(this.patientsAllData, "state");
      this.allstatus = _.countBy(this.patientsAllData, "status");
      this.allReported = _.countBy(this.patientsAllData, "reportedOn");

      // bar chart
      this.barChartLabels = _.keys(this.allState);
      this.values = _.values(this.allState);
      this.barChartData[0].data = this.values;

      // bar chart
      // this.barChartLabels1 = _.keys(this.allReported);
      // this.values2 = _.values(this.allReported);
      // this.barChartData2[0].data = this.values2;

      // line chart
      this.lineChartLabels = _.keys(this.allReported);
      this.values2 = _.values(this.allReported);
      this.lineChartData[0].data = this.values2;

      //  status
      this.doughnutChartData = _.values(this.allstatus);
      this.doughnutChartLabels = _.keys(this.allstatus);

      this.pieChartData = _.values(this.allstatus);
      this.pieChartLabels = _.keys(this.allstatus);

    });

  }




  onDivClick(state) {
    console.log("DIV is clicked!", state);

    this.stateData = this.patientsData.filter(
      statedata => statedata['Detected State'] === state);
    console.log(this.stateData);

    this.state_status = _.countBy(this.stateData, "status");
  }




  onChartClick(e) {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value)

        this.onChartClickTrigger(label);
        

      }
    }
  }

  onChartClickTrigger(search) 
  {
  this.patientsAllData = this.patientsAllData.filter(
    patients => patients['state'] === search );

  this.patientsData = this.patientsAllData.filter(
    patients => patients['reportedOn'] !== null);

  console.log(this.patientsData.length);
  this.patientsRecoveredData = this.patientsData.filter(
    recovered => recovered['status'] === 'Recovered');

  this.patientHptlData = this.patientsData.filter(
    recovered => recovered['status'] === 'Hospitalized');

  this.patientDeathData = this.patientsData.filter(
    recovered => recovered['status'] === 'Deceased');



  this.allState = _.countBy(this.patientsAllData, "district");
  this.allstatus = _.countBy(this.patientsAllData, "status");
  this.allReported = _.countBy(this.patientsAllData, "reportedOn");

  // bar chart
  this.barChartLabels = _.keys(this.allState);
  this.values = _.values(this.allState);
  this.barChartData[0].data = this.values;

  // bar chart
  // this.barChartLabels1 = _.keys(this.allReported);
  // this.values2 = _.values(this.allReported);
  // this.barChartData2[0].data = this.values2;

  // line chart
  this.lineChartLabels = _.keys(this.allReported);
  this.values2 = _.values(this.allReported);
  this.lineChartData[0].data = this.values2;

  //  status
  this.doughnutChartData = _.values(this.allstatus);
  this.doughnutChartLabels = _.keys(this.allstatus);

  this.pieChartData = _.values(this.allstatus);
  this.pieChartLabels = _.keys(this.allstatus);
}

onReset(){

  this.patientApi.GeAllPatients().subscribe(data => {

    this.patientsAllData = data["data"]["rawPatientData"];
    console.log(this.patientsAllData);

    this.patientsData = this.patientsAllData.filter(
      patients => patients['reportedOn'] !== null);

    console.log(this.patientsData.length);
    this.patientsRecoveredData = this.patientsData.filter(
      recovered => recovered['status'] === 'Recovered');

    this.patientHptlData = this.patientsData.filter(
      recovered => recovered['status'] === 'Hospitalized');

    this.patientDeathData = this.patientsData.filter(
      recovered => recovered['status'] === 'Deceased');



    this.allState = _.countBy(this.patientsAllData, "state");
    this.allstatus = _.countBy(this.patientsAllData, "status");
    this.allReported = _.countBy(this.patientsAllData, "reportedOn");

    // bar chart
    this.barChartLabels = _.keys(this.allState);
    this.values = _.values(this.allState);
    this.barChartData[0].data = this.values;

    // bar chart
    // this.barChartLabels1 = _.keys(this.allReported);
    // this.values2 = _.values(this.allReported);
    // this.barChartData2[0].data = this.values2;

    // line chart
    this.lineChartLabels = _.keys(this.allReported);
    this.values2 = _.values(this.allReported);
    this.lineChartData[0].data = this.values2;

    //  status
    this.doughnutChartData = _.values(this.allstatus);
    this.doughnutChartLabels = _.keys(this.allstatus);

    this.pieChartData = _.values(this.allstatus);
    this.pieChartLabels = _.keys(this.allstatus);

  });
}

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  navigate(to) {
    this.navCtrl.navigateRoot('/'+to);
  }

  constructor(
    private patientApi: ApiService,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public alertCtrl: AlertController, ) { }


}
