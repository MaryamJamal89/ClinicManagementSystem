"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var angular_1 = require("@fullcalendar/angular");
var daygrid_1 = require("@fullcalendar/daygrid");
var timegrid_1 = require("@fullcalendar/timegrid");
var list_1 = require("@fullcalendar/list");
var interaction_1 = require("@fullcalendar/interaction"); // a plugin!
var datepicker_1 = require("@angular/material/datepicker");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var error_component_1 = require("./error/error.component");
var doctor_dashboard_component_1 = require("./doctor/doctor-dashboard/doctor-dashboard.component");
var prescription_add_component_1 = require("./doctor/prescription-add/prescription-add.component");
var header_component_1 = require("./components/header/header.component");
var add_appointment_component_1 = require("./receptionist/add-appointment/add-appointment.component");
var add_doctor_component_1 = require("./receptionist/add-doctor/add-doctor.component");
var add_patient_component_1 = require("./receptionist/add-patient/add-patient.component");
var add_receptionist_component_1 = require("./receptionist/add-receptionist/add-receptionist.component");
var print_invoice_component_1 = require("./receptionist/print-invoice/print-invoice.component");
var footer_component_1 = require("./components/footer/footer.component");
var receptionist_header_component_1 = require("./components/receptionist-header/receptionist-header.component");
var doctor_service_1 = require("./doctor.service");
var main_slidebar_component_1 = require("./receptionist/main-slidebar/main-slidebar.component");
var receptionist_dashboard_component_1 = require("./receptionist/receptionist-dashboard/receptionist-dashboard.component");
var search_patient_component_1 = require("./receptionist/search-patient/search-patient.component");
angular_1.FullCalendarModule.registerPlugins([
    daygrid_1["default"],
    timegrid_1["default"],
    list_1["default"],
    interaction_1["default"]
]);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                error_component_1.ErrorComponent,
                doctor_dashboard_component_1.DoctorDashboardComponent,
                prescription_add_component_1.PrescriptionAddComponent,
                header_component_1.HeaderComponent,
                add_appointment_component_1.AddAppointmentComponent,
                add_doctor_component_1.AddDoctorComponent,
                add_patient_component_1.AddPatientComponent,
                add_receptionist_component_1.AddReceptionistComponent,
                print_invoice_component_1.PrintInvoiceComponent,
                footer_component_1.FooterComponent,
                receptionist_header_component_1.ReceptionistHeaderComponent,
                main_slidebar_component_1.MainSlidebarComponent,
                receptionist_dashboard_component_1.ReceptionistDashboardComponent,
                search_patient_component_1.SearchPatientComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                angular_1.FullCalendarModule,
                http_1.HttpClientModule,
                datepicker_1.MatDatepickerModule,
                forms_1.FormsModule,
            ],
            exports: [
                datepicker_1.MatDatepickerModule,
                forms_1.FormsModule,
            ],
            providers: [doctor_service_1.DoctorService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
