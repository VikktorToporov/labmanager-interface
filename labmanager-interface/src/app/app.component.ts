import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  labName: string = '';
  logged = false;

  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.logged = true;
    }
    
    if (localStorage.getItem('labName')) {
      this.labName += localStorage.getItem('labName');
    }
    
  }
}
