import {
  intervalToDuration as distance,
  formatDuration,
  isBefore,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";

const form = document.forms[0];
const lista = document.querySelector("ul");
const clean = document.querySelector("#clean");

function cleanHandler(e) {
  e.preventDefault();
  dates = dates.filter((date) => isBefore(new Date(), parseISO(date.date)));

  localStorage.setItem("dates", JSON.stringify(dates));
  uploadTimer();
}

let dates = [];

const storagedDates = JSON.parse(localStorage.getItem("dates"));

if (storagedDates) {
  dates = storagedDates;
}

clean.addEventListener("click", cleanHandler);

function newDateHandler(e) {
  e.preventDefault();
  let { date, name } = form;
  date = date.value;
  name = name.value;
  /*   if (!date || !name) {
    alert("Debes introducir un numbre y una fecha válidos");
    return;
  } */

  dates.push({ name, date });

  localStorage.setItem("dates", JSON.stringify(dates));
  uploadTimer();
}

form.addEventListener("submit", newDateHandler);

function uploadTimer() {
  lista.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (const date of dates) {
    const newDate = document.createElement("li");
    newDate.textContent = getDateString(date);
    fragment.append(newDate);
  }
  lista.append(fragment);
}

function getDateString({ date, name }) {
  if (isBefore(parseISO(date), new Date())) {
    return `No queda nada para ${name}`;
  }
  let interval = distance({
    start: new Date(),
    end: new Date(date),
  });

  const intervalString = formatDuration(interval, { locale: es });

  return `Quedan ${intervalString} para ${name}`;
}

setInterval(uploadTimer, 1000);

uploadTimer();
