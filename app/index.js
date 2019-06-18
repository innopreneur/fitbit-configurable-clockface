import clock from "clock";
import document from "document";
import * as simpleSettings from "./device-settings";

// Update the clock every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
let hourHandRect = document.getElementById("hourHand");
let minHandRect = document.getElementById("minuteHand");
let secHandRect = document.getElementById("secondHand");
let dials = document.getElementsByClassName("dial");
let background = document.getElementById("background");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

/* -------- SETTINGS -------- */
function settingsCallback(data) {
  if (!data) {
    return;
  }
  if (data.hourHandColor) {
    hourHandRect.style.fill = data.hourHandColor;
  }
  if (data.minuteHandColor) {
    minHandRect.style.fill = data.minuteHandColor;
  }
  if (data.secondHandColor) {
    secHandRect.style.fill = data.secondHandColor;
  }
  if(data.dialColor) {
    dials.forEach(item => {
      item.style.fill = data.dialColor;
    });
  }
  if(data.backgroundColor) {
    console.log(data.backgroundColor)
    background.style.fill = data.backgroundColor;
  }
}

simpleSettings.initialize(settingsCallback);

// Update the clock every tick event
clock.ontick = () => updateClock();