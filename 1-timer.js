import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as i,i as n}from"./assets/vendor-Dov3POoy.js";class o{constructor({startButtonSelector:t,datePickerSelector:r,timeElementsSelectors:e}){this.startButton=document.querySelector(t),this.datePickerElement=document.querySelector(r),this.timeElements={days:document.querySelector(e.days),hours:document.querySelector(e.hours),minutes:document.querySelector(e.minutes),seconds:document.querySelector(e.seconds)},this.userSelectedDate=0,this.timerInterval=null,this.iziToastErrorOptions={title:"Error",message:"Please choose a date in the future!",position:"topCenter"},this.flatpickrOptions={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:s=>this.onCloseHandler(s)},i(this.datePickerElement,this.flatpickrOptions),this.initEventListeners()}initEventListeners(){this.startButton.addEventListener("click",()=>this.startTimer(this.userSelectedDate))}convertMs(t){return{days:Math.floor(t/864e5),hours:Math.floor(t%864e5/36e5),minutes:Math.floor(t%864e5%36e5/6e4),seconds:Math.floor(t%864e5%36e5%6e4/1e3)}}renderTime(t){const r=t-Date.now(),e=this.convertMs(r);if(r>0)for(const s in e)this.timeElements[s].innerHTML=e[s].toString().padStart(2,"0");else this.stopTimer()}startTimer(t){this.startButton.disabled=!0,this.datePickerElement.disabled=!0,this.timerInterval=setInterval(()=>{this.renderTime(t)},1e3)}stopTimer(){this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null);for(const t in this.timeElements)this.timeElements[t].innerHTML="00";this.datePickerElement.disabled=!1}onCloseHandler(t){t[0].getTime()>Date.now()?(this.userSelectedDate=t[0].getTime(),this.startButton.disabled=!1,this.renderTime(this.userSelectedDate)):(this.startButton.disabled=!0,n.error(this.iziToastErrorOptions))}}new o({startButtonSelector:"[data-start]",datePickerSelector:"#datetime-picker",timeElementsSelectors:{days:"[data-days]",hours:"[data-hours]",minutes:"[data-minutes]",seconds:"[data-seconds]"}});
//# sourceMappingURL=1-timer.js.map