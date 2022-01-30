import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  publicLinks = [
    {
      title: 'Vaccination',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
    {
      title: 'COVID-19 Test',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
    {
      title: 'Some Test',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
    {
      title: 'Another Test',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
    {
      title: 'Vaccination',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
    {
      title: 'COVID-19 Test',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
    {
      title: 'Some Test',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
    {
      title: 'Another Test',
      icon: '../../../assets/check-list.png',
      link: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vitae nisl vitae iaculis.',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
