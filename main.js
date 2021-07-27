import { intervalToDuration as distance, formatDuration } from 'date-fns';
import {es} from "date-fns/locale"


function uploadTimer(){
let interval = distance({start: new Date(), end:new Date("06 Aug 2021 15:00:00 GMT+1")}/* , {locale: es, addSuffix: true} */)

const intervalString = formatDuration(interval, {locale: es})
const titulo = document.querySelector("h1")

titulo.textContent = "Quedan " + intervalString
}

setInterval(uploadTimer, 1000)

uploadTimer()