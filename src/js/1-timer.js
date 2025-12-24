// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Знаходжу імпут вибору часу
const datetimePicker = document.querySelector("#datetime-picker");

// Знаходжу кнопку
// Роблю кнопку не робочою та додаю напівпрозорість
const button = document.querySelector("button");
button.disabled = true;
button.style.opacity = 0.5;

// Знаходжу вимір часу в тексті 
// Роблю літери великими
const label = document.querySelectorAll(".label");
label.forEach(label =>{ 
    label.textContent = label.textContent.toUpperCase();
});

// Знаходжу цифри в тексті 
// Задаю розмір 40px
const value = document.querySelectorAll(".value")
value.forEach(value =>{
    value.style.fontSize = "40px";
});

//
const timer = document.querySelector(".timer");
timer.style.display = "flex";
timer.style.gap = "10px";

//
const fields = document.querySelectorAll(".field");
fields.forEach(field => {
    field.style.display = "flex";
    field.style.flexDirection = "column";
    field.style.alignItems = "center";
});


// Знаходжу всі елементи часу
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEL = document.querySelector("[data-seconds]");


////////////////////////////////////////////////
//==============================================
////////////////////////////////////////////////

// Накладаю flatpickr на імпут
const fp = flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        userSelectedDate = selectedDates;
        if (selectedDates[0] <= new Date()) {
            window.alert("Please choose a date in the future");
            button.disabled = true;
            button.style.opacity = 0.5;
        } else { 
            button.disabled = false;
            button.style.opacity = 1;
        };
  },
});

// Тут зберігаю дату та час який обрав користувач в імпуті
let userSelectedDate = "";

////////////////////////////////////////////////
//==============================================
////////////////////////////////////////////////

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timerId = null;

button.addEventListener("click", () => {
    if (!userSelectedDate) return;

  button.disabled = true;
  button.style.opacity = 0.5;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const setTime = userSelectedDate[0] - currentTime;

    if (setTime <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(setTime);
    updateTimer(time);
  }, 1000);
});

////////////////////////////////////////////////
//==============================================
////////////////////////////////////////////////

function functionAddLeadingZero(value) { 
    return String(value).padStart(2, "0");
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = functionAddLeadingZero(days);
  hoursEl.textContent = functionAddLeadingZero(hours);
  minutesEl.textContent = functionAddLeadingZero(minutes);
  secondsEL.textContent = functionAddLeadingZero(seconds);
}