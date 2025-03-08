import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';

import { waitForElemTrigger } from '../../utils';

import FlipDown from '../../../assets/flipdown/src/flipdown.js';

@Component({
  selector: 'app-flipdown',
  templateUrl: './flipdown.component.html',
  styleUrls: [
    './flipdown.component.scss',
    '../../../assets/flipdown/src/flipdown.css'
  ],
  // Disable encapsulation to apply style in ./flipclock.component.scss to
  // to dynamically generated components (i.e. flipdown) 
  encapsulation: ViewEncapsulation.None
})
export class FlipDownComponent implements OnInit, OnChanges {
  @Input() time_unix: number;
  uuid: string;

  constructor() {
    this.generateUUID();
  }

  ngOnInit(): void {
    // var aYearsWorth = (new Date().getTime() / 1000) + 31536000;
    this.createTimer(this.uuid, this.time_unix);
  }

  // Updates the time displayed in 'flipdown'
  ngOnChanges(changes: SimpleChanges) {
    let time_unix: number;

    // Prevent triggering updation on Instatiation of element
    if (changes.time_unix.previousValue != undefined) {
      time_unix = changes.time_unix.currentValue;

      // Delete existing 'flipdown' element
      this.removeTimer(this.uuid);
      // Create new 'flipdown' with updated 'time_unix'
      this.createTimer(this.uuid, time_unix);
    }
  }

  // Removes the element with the ID passed as parameter
  removeTimer(id: string) {
    const clock = document.getElementById(id);
    clock.parentNode.removeChild(clock);
  }

  addDate(id: string, time_unix: number) {
    const mainDiv = document.getElementById(`countdown-${ this.uuid }`);
    var date = document.createElement("div"); 

    let dateString = new Date(time_unix * 1000).toLocaleString();

    date.innerHTML = `This Event was scheduled to start at ${ dateString } (${Intl.DateTimeFormat().resolvedOptions().timeZone})`

    // Set ID for newClock
    date.id = id;

    // add required classes to classList
    date.classList.add("after-end");

    // append newClock to mainDiv
    mainDiv.appendChild(date);
  }

  // Callback Function to call after the timer runs out
  afterEnding(id: string, time_unix: number) {
    this.removeTimer(id);
    this.addDate(id, time_unix);
  }

  // Dynamically creates and injects 'flipdown' element
  createTimer(id: string, time_unix: number) {
    waitForElemTrigger(`countdown-${ this.uuid }`, (elemID) => {
      const mainDiv = document.getElementById(`countdown-${ this.uuid }`);
      var newClock = document.createElement("div"); 

      // Style attributes of the generated element
      const clockStyle = {
        margin: "2em",
      }

      // add required classes to classList
      newClock.classList.add("flipdown");
      // Apply style
      for (let style in clockStyle) {
        newClock.style[style] = clockStyle[style];
      }
      // Set ID for newClock
      newClock.id = id;

      // append newClock to mainDiv
      mainDiv.appendChild(newClock);

      new FlipDown(time_unix, id)
      // Start Countdown
      .start()
      // After it ends
      .ifEnded(() => {
        this.afterEnding(id, time_unix);
      });

    });
  }

  generateUUID(): void {
    this.uuid = this.makeUUID(5);
  }

  // Generate a random string of specified length
  makeUUID(length): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

