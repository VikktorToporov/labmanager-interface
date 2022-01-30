import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() title = '';
  @Input() icon = '';
  @Input() link: string | null = null;
  @Input() text: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
