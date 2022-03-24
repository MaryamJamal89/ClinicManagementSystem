"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctorDashboardComponent = void 0;
var core_1 = require("@angular/core");
var chart_js_1 = require("../../../../node_modules/chart.js");
chart_js_1.Chart.register.apply(chart_js_1.Chart, chart_js_1.registerables);
var appointment_1 = require("src/app/_models/appointment");
var daygrid_1 = require("@fullcalendar/daygrid"); //< import. it
var DoctorDashboardComponent = /** @class */ (function () {
    function DoctorDashboardComponent(docSrv) {
        this.docSrv = docSrv;
        this.appointments = [];
        this.newAppointment = new appointment_1.Appointment("0", "0", "0", new Date(), 1, "Cash", 1000, "x");
        this.calendarPlugins = [daygrid_1["default"]]; // important!
        //INITIAL_EVENTS: EventInput[] = [];
        this.calendarVisible = true;
        this.calendarOptions = {};
        this.currentEvents = [];
        this.arr = [];
    }
    DoctorDashboardComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    DoctorDashboardComponent.prototype.getData = function () {
        var _this = this;
        this.docSrv.getAllAppointments().subscribe({
            next: function (a) {
                _this.appointments = a;
                for (var i = 0; i < _this.appointments.length; i++) {
                    _this.arr.push({
                        title: _this.appointments[i].service.name,
                        date: _this.appointments[i].date
                    });
                }
                setTimeout(function () {
                    _this.calendarOptions = {
                        headerToolbar: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        },
                        initialView: 'dayGridMonth',
                        //initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                        weekends: true,
                        editable: true,
                        selectable: true,
                        selectMirror: true,
                        dayMaxEvents: true,
                        select: _this.handleDateSelect.bind(_this),
                        eventClick: _this.handleEventClick.bind(_this),
                        eventsSet: _this.handleEvents.bind(_this),
                        events: _this.arr
                    };
                });
                console.log(_this.appointments);
            }
        });
    };
    //TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
    DoctorDashboardComponent.prototype.handleCalendarToggle = function () {
        this.calendarVisible = !this.calendarVisible;
    };
    DoctorDashboardComponent.prototype.handleWeekendsToggle = function () {
        var calendarOptions = this.calendarOptions;
        calendarOptions.weekends = !calendarOptions.weekends;
    };
    DoctorDashboardComponent.prototype.handleDateSelect = function (selectInfo) {
        var title = prompt('Please enter Service name');
        var paymentMethod = prompt('Please enter paymentMethod');
        var s = prompt('Please enter Fees') || 0;
        var fees = +s;
        var calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection
        if (title && paymentMethod && fees) {
            // this.newAppointment.serviceName=title
            calendarApi.addEvent({
                title: title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
            this.docSrv.addAppointment(new appointment_1.Appointment("0", "0", "0", new Date(selectInfo.startStr), 1, paymentMethod, fees, title));
            this.appointments.forEach(function (element) {
                console.log(element);
            });
        }
    };
    DoctorDashboardComponent.prototype.handleEventClick = function (clickInfo) {
        if (confirm("Are you sure you want to delete the event '" + clickInfo.event.title + "'")) {
            clickInfo.event.remove();
        }
    };
    DoctorDashboardComponent.prototype.handleEvents = function (events) {
        this.currentEvents = events;
    };
    DoctorDashboardComponent = __decorate([
        core_1.Component({
            selector: 'pm-doctor-dashboard',
            templateUrl: './doctor-dashboard.component.html',
            styleUrls: ['./doctor-dashboard.component.css']
        })
    ], DoctorDashboardComponent);
    return DoctorDashboardComponent;
}());
exports.DoctorDashboardComponent = DoctorDashboardComponent;
