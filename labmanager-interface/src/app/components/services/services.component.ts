import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination-service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  publicLinks = [];

  constructor(private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.getAllExaminations();
  }

  getAllExaminations() {
    if (localStorage.getItem('labId') != null && localStorage.getItem('labId') != undefined) {
      this.examinationService.getAllLabExaminations(localStorage.getItem('labId') || '')
      .subscribe((result: any[]) => {
        console.log(result);
        this.publicLinks = result;
      })
    }
  }
}
