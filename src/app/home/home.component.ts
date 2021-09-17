import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.introduction();
  }

  introduction() {
    const intro = `Hey I'm Satya`;
    const introDetails = `I’m an Full Stack Developer, and I specialize in efficient angular apps and CSS & HTML that just work across all platforms and browsers. I care deeply about building interfaces that are usable and pleasant for the most number of people possible`;
    $('#blinker-intro').addClass('active');
    for(let i=0; i<intro.length; i++) {
      setTimeout(() => {
        $('#intro').text(intro.slice(0, i+1));
      }, i * 300);
    }
    setTimeout(() => {
      $('#blinker-intro').removeClass('active');
      $('#blinker-intro-details').addClass('active');
    }, intro.length * 300);
    for(let i=0; i<introDetails.length; i++) {
      setTimeout(() => {
        $('#intro-details').text(introDetails.slice(0, i+1));
      }, (intro.length * 300) + (i * 100));
    }
  }

}
