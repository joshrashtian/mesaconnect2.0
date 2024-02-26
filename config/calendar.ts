import React from "react";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export class calendar {
  one: Date;
  two: Date;

  constructor(time1: Date, time2: Date) {
    this.one = time1;
    this.two = time2;
  }

  timeOne() {
    return this.one;
  }
  timeTwo() {
    return this.two;
  }

  oneToString() {
    return this.one.toDateString();
  }

  twoToString() {
    return this.two.toDateString();
  }

  differHourMin() {
    let hourDifference = this.two.getHours() - this.one.getHours();
    let minDifference;

    if (this.one.getMinutes() > this.two.getMinutes()) {
      minDifference = this.two.getMinutes() + 60 - this.one.getMinutes();
      hourDifference--;
    } else {
      minDifference = this.two.getMinutes() - this.one.getMinutes();
    }
    return `${hourDifference}:${minDifference}`;
  }

  differHours() {
    return this.two.getHours() - this.one.getHours();
  }

  differMin() {
    let minDifference;
    if (this.one.getMinutes() > this.two.getMinutes()) {
      minDifference = this.two.getMinutes() + 60 - this.one.getMinutes();
    } else {
      minDifference = this.two.getMinutes() - this.one.getMinutes();
    }
    return `${minDifference < 10 ? `0${minDifference}` : minDifference}`;
  }
}
