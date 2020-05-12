import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';

export default class FullCalendar extends LightningElement {

  renderedCallback() {
    if (!this.fullCalendarJsInitialised) {
      this.initializeFullCalendar();
    }
    this.fullCalendarJsInitialised = true;

  }

  async initializeFullCalendar() {
    try {
      await this.loadScripts();

      const ele = this.template.querySelector('div.fullcalendar');

      const calendar = new window.FullCalendar.Calendar(ele, {
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        plugins: ['interaction', 'dayGrid', 'timeGrid'],
        defaultView: 'dayGridWeek',
        defaultDate: '2019-01-12',
        // defaultDate: new Date(), // default day is today
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
          {
            title: 'All Day Event',
            start: '2019-01-01'
          },
          {
            title: 'Long Event',
            start: '2019-01-07',
            end: '2019-01-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2019-01-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2019-01-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2019-01-11',
            end: '2019-01-13'
          },
          {
            title: 'Meeting',
            start: '2019-01-12T10:30:00',
            end: '2019-01-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2019-01-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2019-01-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2019-01-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2019-01-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2019-01-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2019-01-28'
          }
        ]
      });

      calendar.render();
    } catch (error) {
      console.error('Could not initialize full calendar', error);
    }
  }

  /**
   * @retuns {Promise}
   */
  async loadScripts() {
    try {
      console.log(FullCalendarJS)
      await loadStyle(this, `${FullCalendarJS}/core/main.css`);
      await loadStyle(this, `${FullCalendarJS}/daygrid/main.css`);
      await loadStyle(this, `${FullCalendarJS}/timegrid/main.css`);
      await loadStyle(this, `${FullCalendarJS}/list/main.css`);

      await loadScript(this, `${FullCalendarJS}/core/main.js`);
      await loadScript(this, `${FullCalendarJS}/interaction/main.js`);
      await loadScript(this, `${FullCalendarJS}/daygrid/main.js`);
      await loadScript(this, `${FullCalendarJS}/timegrid/main.js`);
      await loadScript(this, `${FullCalendarJS}/list/main.js`);

    } catch (error) {
      console.error('Could not load scripts', error);
      throw error;
    }
  }
}