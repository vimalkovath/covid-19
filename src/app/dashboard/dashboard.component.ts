import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private patientApi: ApiService,
    public navCtrl: NavController
     ) { }

  patientsAllData;
  patientsData;
  patientsRecoveredData;
  patientHptlData;
  patientDeathData;
  patientsSummary;



  ngOnInit() {
    this.patientApi.GeAllPatients().subscribe(data => {
      this.patientsSummary = data["data"];
      console.log(this.patientsAllData);

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

    });
  }


  navigate(to) {
    this.navCtrl.navigateRoot('/'+to);
  }

}



