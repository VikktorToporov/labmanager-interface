import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() title = '';
  @Input() icon = '../../../assets/check-list.png';
  @Input() link: string = null;
  @Input() text: string = null;
  @Input() price: number;

  constructor() { }

  ngOnInit(): void {
  }

}
