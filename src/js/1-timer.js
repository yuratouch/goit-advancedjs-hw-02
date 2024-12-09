import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

class Timer {
  constructor({
    startButtonSelector,
    datePickerSelector,
    timeElementsSelectors,
  }) {
    this.startButton = document.querySelector(startButtonSelector);
    this.datePickerElement = document.querySelector(datePickerSelector);
    this.timeElements = {
      days: document.querySelector(timeElementsSelectors.days),
      hours: document.querySelector(timeElementsSelectors.hours),
      minutes: document.querySelector(timeElementsSelectors.minutes),
      seconds: document.querySelector(timeElementsSelectors.seconds),
    };

    this.userSelectedDate = 0;
    this.timerInterval = null;

    this.iziToastErrorOptions = {
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topCenter',
    };

    this.flatpickrOptions = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: selectedDates => this.onCloseHandler(selectedDates),
    };

    flatpickr(this.datePickerElement, this.flatpickrOptions);
    this.initEventListeners();
  }

  initEventListeners() {
    this.startButton.addEventListener('click', () =>
      this.startTimer(this.userSelectedDate)
    );
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    return {
      days: Math.floor(ms / day),
      hours: Math.floor((ms % day) / hour),
      minutes: Math.floor(((ms % day) % hour) / minute),
      seconds: Math.floor((((ms % day) % hour) % minute) / second),
    };
  }

  renderTime(timeData) {
    const timeDifference = timeData - Date.now();
    const convertedTimeDifference = this.convertMs(timeDifference);

    if (timeDifference > 0) {
      for (const key in convertedTimeDifference) {
        this.timeElements[key].innerHTML = convertedTimeDifference[key]
          .toString()
          .padStart(2, '0');
      }
    } else {
      this.stopTimer();
    }
  }

  startTimer(selectedDate) {
    this.startButton.disabled = true;
    this.datePickerElement.disabled = true;

    this.timerInterval = setInterval(() => {
      this.renderTime(selectedDate);
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    for (const key in this.timeElements) {
      this.timeElements[key].innerHTML = '00';
    }

    this.datePickerElement.disabled = false;
  }

  onCloseHandler(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      this.userSelectedDate = selectedDates[0].getTime();
      this.startButton.disabled = false;

      this.renderTime(this.userSelectedDate);
    } else {
      this.startButton.disabled = true;
      iziToast.error(this.iziToastErrorOptions);
    }
  }
}

const timer = new Timer({
  startButtonSelector: '[data-start]',
  datePickerSelector: '#datetime-picker',
  timeElementsSelectors: {
    days: '[data-days]',
    hours: '[data-hours]',
    minutes: '[data-minutes]',
    seconds: '[data-seconds]',
  },
});
