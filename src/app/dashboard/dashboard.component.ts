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



  ngOnInit() {
    this.patientApi.GeAllPatients().subscribe(data => {

      this.patientsAllData = data["data"];
      console.log(this.patientsAllData);

    });
  }


  navigate() {
    this.navCtrl.navigateRoot('/home');
  }

}



