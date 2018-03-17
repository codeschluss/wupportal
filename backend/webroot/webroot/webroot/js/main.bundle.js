webpackJsonp(["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./app/app-router.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRouterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_views_mapping__ = __webpack_require__("./app/views/mapping/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_views_admin_login_login_form__ = __webpack_require__("./app/views/admin/login/login.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_views_admin_admin_component__ = __webpack_require__("./app/views/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_views_admin_users_user_form__ = __webpack_require__("./app/views/admin/users/user.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_views_admin_organisations_organisation_form__ = __webpack_require__("./app/views/admin/organisations/organisation.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_views_admin_organisations_organisation_admin__ = __webpack_require__("./app/views/admin/organisations/organisation.admin.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_views_admin_activities_activity_form__ = __webpack_require__("./app/views/admin/activities/activity.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_views_admin_activities_activity_table__ = __webpack_require__("./app/views/admin/activities/activity.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_views_admin_users_user_table__ = __webpack_require__("./app/views/admin/users/user.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_views_admin_addresses_address_table__ = __webpack_require__("./app/views/admin/addresses/address.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_views_admin_addresses_address_form__ = __webpack_require__("./app/views/admin/addresses/address.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_views_admin_organisations_organisation_table__ = __webpack_require__("./app/views/admin/organisations/organisation.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_views_admin_configs_config_form__ = __webpack_require__("./app/views/admin/configs/config.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_views_admin_users_register_form__ = __webpack_require__("./app/views/admin/users/register.form.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppRouterModule = (function () {
    function AppRouterModule() {
    }
    AppRouterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot([
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_2_app_views_mapping__["a" /* MappingComponent */] },
                    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3_app_views_admin_login_login_form__["a" /* LoginFormComponent */] },
                    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_16_app_views_admin_users_register_form__["a" /* RegisterFormComponent */] },
                    {
                        path: 'admin', component: __WEBPACK_IMPORTED_MODULE_4_app_views_admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_15_app_services_authentication_service__["a" /* AuthenticationService */]], children: [
                            { path: '', component: __WEBPACK_IMPORTED_MODULE_9_app_views_admin_activities_activity_table__["a" /* ActivityTableComponent */], outlet: 'table' },
                            { path: 'activities', component: __WEBPACK_IMPORTED_MODULE_9_app_views_admin_activities_activity_table__["a" /* ActivityTableComponent */], outlet: 'table' },
                            { path: 'users', component: __WEBPACK_IMPORTED_MODULE_10_app_views_admin_users_user_table__["a" /* UserTableComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_15_app_services_authentication_service__["a" /* AuthenticationService */]], outlet: 'table' },
                            { path: 'addresses', component: __WEBPACK_IMPORTED_MODULE_11_app_views_admin_addresses_address_table__["a" /* AddressTableComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_15_app_services_authentication_service__["a" /* AuthenticationService */]], outlet: 'table' },
                            { path: 'configurations', component: __WEBPACK_IMPORTED_MODULE_14_app_views_admin_configs_config_form__["a" /* ConfigFormComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_15_app_services_authentication_service__["a" /* AuthenticationService */]], outlet: 'table' },
                            { path: 'organisations', component: __WEBPACK_IMPORTED_MODULE_13_app_views_admin_organisations_organisation_table__["a" /* OrganisationsTableComponent */], outlet: 'table' },
                            { path: 'organisation-admin/:id', component: __WEBPACK_IMPORTED_MODULE_7_app_views_admin_organisations_organisation_admin__["a" /* OrganisationAdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_15_app_services_authentication_service__["a" /* AuthenticationService */]], outlet: 'table' },
                            { path: 'account', component: __WEBPACK_IMPORTED_MODULE_5_app_views_admin_users_user_form__["a" /* UserFormComponent */], outlet: 'table' }
                        ]
                    },
                    { path: 'activity/edit/:id', component: __WEBPACK_IMPORTED_MODULE_8_app_views_admin_activities_activity_form__["a" /* ActivityFormComponent */] },
                    { path: 'organisation/edit/:id', component: __WEBPACK_IMPORTED_MODULE_6_app_views_admin_organisations_organisation_form__["a" /* OrganisationFormComponent */] },
                    { path: 'address/edit/:id', component: __WEBPACK_IMPORTED_MODULE_12_app_views_admin_addresses_address_form__["a" /* AddressFormComponent */] },
                ])],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRouterModule);
    return AppRouterModule;
}());



/***/ }),

/***/ "./app/app.component.css":
/***/ (function(module, exports) {

module.exports = "filter-component {\r\n\tbottom: 0px;\r\n\tleft: 0px;\r\n\tposition: absolute;\r\n\ttop: 0px;\r\n\tz-index: 5;\r\n}\r\n\r\nmapping-component {\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tposition: absolute;\r\n\tright: 0;\r\n\ttop: 0;\r\n}\r\n\r\n.edit-container {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-orient: vertical;\r\n\t-webkit-box-direction: normal;\r\n\t    -ms-flex-direction: column;\r\n\t        flex-direction: column;\r\n}\r\n\r\n.edit-container>* {\r\n\twidth: 90%;\r\n}\r\n\r\n.edit-form {\r\n\tmin-width: 150px;\r\n\tmax-width: 500px;\r\n\twidth: 100%;\r\n}\r\n\r\n.edit-form-full-width {\r\n\twidth: 75%;\r\n}\r\n\r\n.edit-form-three-column-width {\r\n\twidth: 25%;\r\n}\r\n\r\nmat-chip {\r\n\tmax-width: 200px;\r\n}\r\n\r\n#temp-footer {\r\n\tmargin-top: 35px;\r\n\tfont-size: 12px;\r\n\tfont-family: Roboto, \"Helvetica Neue\", sans-serif;\r\n}\r\n"

/***/ }),

/***/ "./app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <filter-component></filter-component>\r\n<mapping-component></mapping-component> -->\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_views_details__ = __webpack_require__("./app/views/details/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_views_mapping__ = __webpack_require__("./app/views/mapping/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_activity_service__ = __webpack_require__("./app/services/activity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_location__ = __webpack_require__("./app/services/location.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_nominatim__ = __webpack_require__("./app/services/nominatim.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { FilterComponent } from 'app/views/filter';




var AppComponent = (function () {
    function AppComponent(iconRegistry, activityService, 
        // private categoryService: CategoryService,
        // private configurationService: ConfigurationService,
        locationService, nominatimService) {
        this.iconRegistry = iconRegistry;
        this.activityService = activityService;
        this.locationService = locationService;
        this.nominatimService = nominatimService;
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        // this.filterComponent.selection.subscribe((i) => console.log(i));
        // this.filterComponent.selection.subscribe((i) => console.log(i));
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // this.activityService.disconnect();
        // this.categoryService.disconnect();
        // this.configurationService.disconnect();
        // this.locationService.disconnect();
        // this.organisationService.disconnect();
        // this.suburbService.disconnect();
        // this.targetGroupService.disconnect();
    };
    AppComponent.prototype.ngOnInit = function () {
        // this.filterComponent.selectables = this.activityService.list();
        // this.mappingComponent.selectables = this.activityService.list();
        // this.activityService.connect();
        // this.categoryService.connect();
        // this.configurationService.connect();
        // this.locationService.connect();
        // this.organisationService.connect();
        // this.suburbService.connect();
        // this.targetGroupService.connect();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_app_views_details__["a" /* DetailsComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_app_views_details__["a" /* DetailsComponent */])
    ], AppComponent.prototype, "detailsComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_app_views_mapping__["a" /* MappingComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_app_views_mapping__["a" /* MappingComponent */])
    ], AppComponent.prototype, "mappingComponent", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatIconRegistry */],
                __WEBPACK_IMPORTED_MODULE_4_app_services_activity_service__["a" /* ActivityService */],
                __WEBPACK_IMPORTED_MODULE_5_app_services_location__["a" /* LocationService */],
                __WEBPACK_IMPORTED_MODULE_6_app_services_nominatim__["a" /* NominatimService */]
            ],
            selector: 'app-root',
            styles: [__webpack_require__("./app/app.component.css")],
            template: __webpack_require__("./app/app.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatIconRegistry */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_activity_service__["a" /* ActivityService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_location__["a" /* LocationService */],
            __WEBPACK_IMPORTED_MODULE_6_app_services_nominatim__["a" /* NominatimService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__ = __webpack_require__("./node_modules/ngx-openlayers/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_openlayers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_moment_adapter__ = __webpack_require__("./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_tooltip__ = __webpack_require__("./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_radio__ = __webpack_require__("./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_app_component__ = __webpack_require__("./app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_app_router_module__ = __webpack_require__("./app/app-router.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_views_details__ = __webpack_require__("./app/views/details/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_views_filter__ = __webpack_require__("./app/views/filter/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_views_mapping__ = __webpack_require__("./app/views/mapping/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_views_admin_users_user_table__ = __webpack_require__("./app/views/admin/users/user.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_views_admin_activities_activity_table__ = __webpack_require__("./app/views/admin/activities/activity.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_app_views_admin_organisations_organisation_table__ = __webpack_require__("./app/views/admin/organisations/organisation.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_app_views_admin_provider_provider_table__ = __webpack_require__("./app/views/admin/provider/provider.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_views_admin_provider_provider_approval_table__ = __webpack_require__("./app/views/admin/provider/provider-approval.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_app_views_admin_provider_provider_request_table__ = __webpack_require__("./app/views/admin/provider/provider-request.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_app_views_admin_login_login_form__ = __webpack_require__("./app/views/admin/login/login.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_app_views_admin_admin_component__ = __webpack_require__("./app/views/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_app_views_admin_users_user_form__ = __webpack_require__("./app/views/admin/users/user.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_app_views_admin_organisations_organisation_form__ = __webpack_require__("./app/views/admin/organisations/organisation.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_app_views_admin_organisations_organisation_update__ = __webpack_require__("./app/views/admin/organisations/organisation.update.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_app_views_admin_organisations_organisation_admin__ = __webpack_require__("./app/views/admin/organisations/organisation.admin.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_app_views_admin_activities_activity_form__ = __webpack_require__("./app/views/admin/activities/activity.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_app_views_admin_users_register_form__ = __webpack_require__("./app/views/admin/users/register.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_app_services_activity_service__ = __webpack_require__("./app/services/activity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_app_services_location__ = __webpack_require__("./app/services/location.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_app_services_nominatim__ = __webpack_require__("./app/services/nominatim.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_app_views_admin_dialog_popup_suburb_selection__ = __webpack_require__("./app/views/admin/dialog/popup.suburb.selection.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_app_views_admin_addresses_address_create_form__ = __webpack_require__("./app/views/admin/addresses/address.create.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_app_views_admin_addresses_address_form__ = __webpack_require__("./app/views/admin/addresses/address.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_app_views_admin_addresses_address_table__ = __webpack_require__("./app/views/admin/addresses/address.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_app_views_admin_configs_config_form__ = __webpack_require__("./app/views/admin/configs/config.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_app_views_admin_dialog_delete_dialog__ = __webpack_require__("./app/views/admin/dialog/delete.dialog.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_app_views_admin_actions_delete_action__ = __webpack_require__("./app/views/admin/actions/delete.action.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_app_views_admin_dialog_organisation_selection_dialog__ = __webpack_require__("./app/views/admin/dialog/organisation-selection.dialog.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_app_views_admin_addresses_address_autocomplete__ = __webpack_require__("./app/views/admin/addresses/address.autocomplete.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_app_views_admin_table_paginator_labels__ = __webpack_require__("./app/views/admin/table/paginator.labels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_app_views_admin_activities_activity_detail__ = __webpack_require__("./app/views/admin/activities/activity.detail.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_app_views_admin_organisations_organisation_detail__ = __webpack_require__("./app/views/admin/organisations/organisation.detail.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// HttpModule is deprecated














































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_11_app_app_component__["a" /* AppComponent */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11_app_app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_13_app_views_details__["a" /* DetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_14_app_views_filter__["a" /* FilterComponent */],
                __WEBPACK_IMPORTED_MODULE_15_app_views_mapping__["a" /* MappingComponent */],
                __WEBPACK_IMPORTED_MODULE_45_app_views_admin_addresses_address_autocomplete__["a" /* AddressAutocompleteComponent */],
                __WEBPACK_IMPORTED_MODULE_16_app_views_admin_users_user_table__["a" /* UserTableComponent */],
                __WEBPACK_IMPORTED_MODULE_18_app_views_admin_organisations_organisation_table__["a" /* OrganisationsTableComponent */],
                __WEBPACK_IMPORTED_MODULE_40_app_views_admin_addresses_address_table__["a" /* AddressTableComponent */],
                __WEBPACK_IMPORTED_MODULE_17_app_views_admin_activities_activity_table__["a" /* ActivityTableComponent */],
                __WEBPACK_IMPORTED_MODULE_19_app_views_admin_provider_provider_table__["a" /* ProviderTableComponent */],
                __WEBPACK_IMPORTED_MODULE_20_app_views_admin_provider_provider_approval_table__["a" /* ProviderApprovalTableComponent */],
                __WEBPACK_IMPORTED_MODULE_21_app_views_admin_provider_provider_request_table__["a" /* ProviderRequestTableComponent */],
                __WEBPACK_IMPORTED_MODULE_22_app_views_admin_login_login_form__["a" /* LoginFormComponent */],
                __WEBPACK_IMPORTED_MODULE_29_app_views_admin_users_register_form__["a" /* RegisterFormComponent */],
                __WEBPACK_IMPORTED_MODULE_23_app_views_admin_admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_28_app_views_admin_activities_activity_form__["a" /* ActivityFormComponent */],
                __WEBPACK_IMPORTED_MODULE_25_app_views_admin_organisations_organisation_form__["a" /* OrganisationFormComponent */],
                __WEBPACK_IMPORTED_MODULE_26_app_views_admin_organisations_organisation_update__["a" /* OrganisationUpdateComponent */],
                __WEBPACK_IMPORTED_MODULE_27_app_views_admin_organisations_organisation_admin__["a" /* OrganisationAdminComponent */],
                __WEBPACK_IMPORTED_MODULE_24_app_views_admin_users_user_form__["a" /* UserFormComponent */],
                __WEBPACK_IMPORTED_MODULE_47_app_views_admin_activities_activity_detail__["a" /* ActivityDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_48_app_views_admin_organisations_organisation_detail__["a" /* OrganisationDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_37_app_views_admin_dialog_popup_suburb_selection__["a" /* SuburbSelectionComponent */],
                __WEBPACK_IMPORTED_MODULE_38_app_views_admin_addresses_address_create_form__["a" /* AddressCreateFormComponent */],
                __WEBPACK_IMPORTED_MODULE_39_app_views_admin_addresses_address_form__["a" /* AddressFormComponent */],
                __WEBPACK_IMPORTED_MODULE_41_app_views_admin_configs_config_form__["a" /* ConfigFormComponent */],
                __WEBPACK_IMPORTED_MODULE_42_app_views_admin_dialog_delete_dialog__["a" /* DeleteDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_43_app_views_admin_actions_delete_action__["a" /* DeleteActionComponent */],
                __WEBPACK_IMPORTED_MODULE_44_app_views_admin_dialog_organisation_selection_dialog__["a" /* OrganisationSelectionComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__["AngularOpenlayersModule"],
                // HttpModule is deprecated
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12_app_app_router_module__["a" /* AppRouterModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["g" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["o" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["h" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["r" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["t" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["p" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["G" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["D" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["H" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["z" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["f" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["y" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["m" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["j" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["u" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["k" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material_moment_adapter__["a" /* MatMomentDateModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material_tooltip__["a" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material_radio__["a" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["i" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["E" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["q" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["B" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["f" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["t" /* MatInputModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_30_app_services_activity_service__["a" /* ActivityService */],
                __WEBPACK_IMPORTED_MODULE_31_app_services_provider_service__["a" /* ProviderService */],
                __WEBPACK_IMPORTED_MODULE_32_app_services_location__["a" /* LocationService */],
                __WEBPACK_IMPORTED_MODULE_33_app_services_nominatim__["a" /* NominatimService */],
                __WEBPACK_IMPORTED_MODULE_36_app_services_constants__["a" /* Constants */],
                __WEBPACK_IMPORTED_MODULE_34_app_services_validation_service__["a" /* ValidationService */],
                __WEBPACK_IMPORTED_MODULE_35_app_services_authentication_service__["a" /* AuthenticationService */],
                { provide: __WEBPACK_IMPORTED_MODULE_10__angular_material__["x" /* MatPaginatorIntl */], useClass: __WEBPACK_IMPORTED_MODULE_46_app_views_admin_table_paginator_labels__["a" /* PaginatorLabels */] }
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_37_app_views_admin_dialog_popup_suburb_selection__["a" /* SuburbSelectionComponent */],
                __WEBPACK_IMPORTED_MODULE_38_app_views_admin_addresses_address_create_form__["a" /* AddressCreateFormComponent */],
                __WEBPACK_IMPORTED_MODULE_42_app_views_admin_dialog_delete_dialog__["a" /* DeleteDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_44_app_views_admin_dialog_organisation_selection_dialog__["a" /* OrganisationSelectionComponent */]
            ], exports: [
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["v" /* MatNativeDateModule */],
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./app/models/activity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Activity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_models_category__ = __webpack_require__("./app/models/category.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_models_model__ = __webpack_require__("./app/models/model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_models_provider__ = __webpack_require__("./app/models/provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_models_schedule__ = __webpack_require__("./app/models/schedule.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json ? json.id : '') || this;
        _this.name = '';
        _this.description = '';
        _this.show_user = false;
        _this.address_id = '';
        _this.address = new __WEBPACK_IMPORTED_MODULE_0_app_models_address__["a" /* Address */]({});
        _this.provider_id = '';
        _this.provider = new __WEBPACK_IMPORTED_MODULE_3_app_models_provider__["a" /* Provider */]({});
        _this.category_id = '';
        _this.category = new __WEBPACK_IMPORTED_MODULE_1_app_models_category__["a" /* Category */]();
        _this.schedules = [];
        _this.tags = [];
        _this.target_groups = [];
        if (json) {
            if (json.name) {
                _this.name = json.name;
            }
            if (json.description) {
                _this.description = json.description;
            }
            if (json.show_user) {
                _this.show_user = json.show_user;
            }
            if (json.address_id) {
                _this.address_id = json.address_id;
            }
            if (json.address) {
                _this.address = new __WEBPACK_IMPORTED_MODULE_0_app_models_address__["a" /* Address */](json.address);
            }
            if (json.provider_id) {
                _this.provider_id = json.provider_id;
            }
            if (json.provider) {
                _this.provider = new __WEBPACK_IMPORTED_MODULE_3_app_models_provider__["a" /* Provider */](json.provider);
            }
            if (json.category_id) {
                _this.category_id = json.category_id;
            }
            if (json.category) {
                _this.category = new __WEBPACK_IMPORTED_MODULE_1_app_models_category__["a" /* Category */](json.category);
            }
            if (json.schedules && json.schedules.length) {
                _this.schedules = _this.buildScheduleArray(json.schedules);
            }
            if (json.tags) {
                _this.tags = json.tags;
            }
            if (json.target_groups) {
                _this.target_groups = json.target_groups;
            }
            // if (json.translations) { this.translations = json.translations; }
        }
        return _this;
    }
    // public translations: Translation[] = null;
    Activity.prototype.buildScheduleArray = function (dates) {
        var scheduleArray = [];
        for (var _i = 0, dates_1 = dates; _i < dates_1.length; _i++) {
            var date = dates_1[_i];
            scheduleArray.push(new __WEBPACK_IMPORTED_MODULE_4_app_models_schedule__["a" /* Schedule */](date));
        }
        return scheduleArray;
    };
    return Activity;
}(__WEBPACK_IMPORTED_MODULE_2_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/address.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_model__ = __webpack_require__("./app/models/model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_models_suburb__ = __webpack_require__("./app/models/suburb.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Address = (function (_super) {
    __extends(Address, _super);
    function Address(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json.id) || this;
        _this.latitude = json.latitude && json.latitude || 0;
        _this.longitude = json.longitude && json.longitude || 0;
        _this.house_number = json.house_number && json.house_number || '0';
        _this.place = json.place && json.place || '';
        _this.postal_code = json.postal_code && json.postal_code || '';
        _this.street = json.street && json.street || '';
        _this.suburb_id = json.suburb_id && json.suburb_id || '';
        _this.suburb = json.suburb && new __WEBPACK_IMPORTED_MODULE_1_app_models_suburb__["a" /* Suburb */](json.suburb) || new __WEBPACK_IMPORTED_MODULE_1_app_models_suburb__["a" /* Suburb */]();
        return _this;
    }
    Object.defineProperty(Address.prototype, "toString", {
        get: function () {
            return this.isValid()
                ? (this.street + ' ' +
                    this.house_number + ' ' +
                    this.postal_code + ' ' +
                    this.place + ' ' +
                    (this.suburb ? this.suburb.name : ''))
                : '';
        },
        enumerable: true,
        configurable: true
    });
    Address.prototype.compareTo = function (address) {
        return address.street.toLocaleLowerCase().localeCompare(this.street.toLocaleLowerCase()) === 0 &&
            address.house_number.toLocaleLowerCase().localeCompare(this.house_number.toLocaleLowerCase()) === 0 &&
            address.postal_code.toLocaleLowerCase().localeCompare(this.postal_code.toLocaleLowerCase()) === 0 &&
            address.place.toLocaleLowerCase().localeCompare(this.place.toLocaleLowerCase()) === 0;
    };
    Address.prototype.isValid = function () {
        return this.place &&
            this.postal_code &&
            this.street &&
            this.house_number !== '0';
    };
    return Address;
}(__WEBPACK_IMPORTED_MODULE_0_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/category.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_model__ = __webpack_require__("./app/models/model.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Category = (function (_super) {
    __extends(Category, _super);
    function Category(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json.id ? json.id : '') || this;
        _this.name = '';
        _this.description = '';
        _this.color = '';
        _this.name = json.name || '';
        _this.color = json.color || '';
        _this.description = json.description || '';
        return _this;
    }
    return Category;
}(__WEBPACK_IMPORTED_MODULE_0_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Model; });
var Model = (function () {
    function Model(id) {
        if (id === void 0) { id = ''; }
        this.id = '';
        this.id = id && id || '';
    }
    return Model;
}());



/***/ }),

/***/ "./app/models/organisation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Organisation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_models_model__ = __webpack_require__("./app/models/model.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Organisation = (function (_super) {
    __extends(Organisation, _super);
    function Organisation(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json.id) || this;
        _this.name = '';
        _this.description = '';
        _this.website = '';
        _this.mail = '';
        _this.phone = '';
        _this.image = null;
        _this.address_id = '';
        _this.address = new __WEBPACK_IMPORTED_MODULE_0_app_models_address__["a" /* Address */]({});
        _this.name = json.name && json.name || '';
        _this.description = json.description && json.description || '';
        _this.website = json.website && json.website || '';
        _this.mail = json.mail && json.mail || '';
        _this.phone = json.phone && json.phone || '';
        _this.image = json.image && json.image || null;
        _this.address_id = json.address_id && json.address_id || {};
        if (json.address) {
            _this.address = new __WEBPACK_IMPORTED_MODULE_0_app_models_address__["a" /* Address */](json.address);
        }
        return _this;
    }
    return Organisation;
}(__WEBPACK_IMPORTED_MODULE_1_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/provider.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Provider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_model__ = __webpack_require__("./app/models/model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_models_organisation__ = __webpack_require__("./app/models/organisation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_models_user__ = __webpack_require__("./app/models/user.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Provider = (function (_super) {
    __extends(Provider, _super);
    function Provider(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json.id) || this;
        _this.admin = json.admin && json.admin || false;
        _this.approved = json.approved && json.approved || false;
        _this.organisation_id = json.organisation_id && json.organisation_id || '';
        _this.user_id = json.user_id && json.user_id || '';
        _this.organisation = json.organisation && new __WEBPACK_IMPORTED_MODULE_1_app_models_organisation__["a" /* Organisation */](json.organisation) || null;
        _this.user = json.user && new __WEBPACK_IMPORTED_MODULE_2_app_models_user__["a" /* User */](json.user) || null;
        return _this;
    }
    return Provider;
}(__WEBPACK_IMPORTED_MODULE_0_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/schedule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Schedule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_model__ = __webpack_require__("./app/models/model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Schedule = (function (_super) {
    __extends(Schedule, _super);
    function Schedule(json) {
        var _this = _super.call(this, json.id) || this;
        _this.start_date = __WEBPACK_IMPORTED_MODULE_1_moment__().format('YYYY-MM-DD HH:mm:ss');
        _this.end_date = __WEBPACK_IMPORTED_MODULE_1_moment__().format('YYYY-MM-DD HH:mm:ss');
        _this.start_date = __WEBPACK_IMPORTED_MODULE_1_moment__(json.start_date).format('YYYY-MM-DD HH:mm:ss');
        _this.end_date = __WEBPACK_IMPORTED_MODULE_1_moment__(json.end_date).format('YYYY-MM-DD HH:mm:ss');
        return _this;
    }
    Object.defineProperty(Schedule.prototype, "startTime", {
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_1_moment__(this.start_date).format();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "endTime", {
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_1_moment__(this.end_date).format();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "startTimeHour", {
        set: function (time) {
            this.start_date = __WEBPACK_IMPORTED_MODULE_1_moment__(this.start_date).set({ hour: time }).format('YYYY-MM-DD HH:mm:ss');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "startTimeMinute", {
        set: function (time) {
            this.start_date = __WEBPACK_IMPORTED_MODULE_1_moment__(this.start_date).set({ minute: time }).format('YYYY-MM-DD HH:mm:ss');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "endTimeHour", {
        set: function (time) {
            this.end_date = __WEBPACK_IMPORTED_MODULE_1_moment__(this.end_date).set({ hour: time }).format('YYYY-MM-DD HH:mm:ss');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "endTimeMinute", {
        set: function (time) {
            this.end_date = __WEBPACK_IMPORTED_MODULE_1_moment__(this.end_date).set({ minute: time }).format('YYYY-MM-DD HH:mm:ss');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "startDate", {
        get: function () {
            return this.start_date;
        },
        set: function (date) {
            var startDate = __WEBPACK_IMPORTED_MODULE_1_moment__(date);
            this.start_date = __WEBPACK_IMPORTED_MODULE_1_moment__(this.start_date)
                .set({ year: startDate.year(), month: startDate.month(), date: startDate.date() })
                .format('YYYY-MM-DD HH:mm:ss');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "endDate", {
        get: function () {
            return this.end_date;
        },
        set: function (date) {
            var endDate = __WEBPACK_IMPORTED_MODULE_1_moment__(date);
            this.end_date = __WEBPACK_IMPORTED_MODULE_1_moment__(this.end_date)
                .set({ year: endDate.year(), month: endDate.month(), date: endDate.date() })
                .format('YYYY-MM-DD HH:mm:ss');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "toString", {
        get: function () {
            if (this.start_date && this.end_date) {
                return __WEBPACK_IMPORTED_MODULE_1_moment__(this.start_date).locale('de').format('YYYY-MM-DD HH:mm')
                    + ' - ' + __WEBPACK_IMPORTED_MODULE_1_moment__(this.end_date).locale('de').format('YYYY-MM-DD H:mm');
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Schedule.prototype.compareTo = function (schedule) {
        if (this.toString.localeCompare(schedule.toString)) {
            return true;
        }
        return false;
    };
    return Schedule;
}(__WEBPACK_IMPORTED_MODULE_0_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/suburb.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Suburb; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_model__ = __webpack_require__("./app/models/model.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Suburb = (function (_super) {
    __extends(Suburb, _super);
    function Suburb(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json.id) || this;
        _this.name = json.name && json.name || '';
        return _this;
    }
    return Suburb;
}(__WEBPACK_IMPORTED_MODULE_0_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/table.state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableState; });
var TableState = (function () {
    function TableState(pageSize, pageSizeOptions) {
        this.filter = '';
        this.page = 1;
        this.pageSize = pageSize;
        this.sort = { active: '', direction: '' };
    }
    TableState.prototype.setPagination = function (pageEvent) {
        this.page = pageEvent.pageIndex + 1;
        this.pageSize = pageEvent.pageSize;
    };
    TableState.prototype.setFilter = function (filter) {
        this.filter = filter;
    };
    TableState.prototype.setSorting = function (active, direction) {
        if (active && direction) {
            this.sort.active = active;
            this.sort.direction = direction;
        }
    };
    return TableState;
}());



/***/ }),

/***/ "./app/models/tag.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tag; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_model__ = __webpack_require__("./app/models/model.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json.id) || this;
        _this.name = '';
        _this.description = '';
        _this.name = json.name && json.name || '';
        _this.description = json.description && json.description || '';
        return _this;
    }
    return Tag;
}(__WEBPACK_IMPORTED_MODULE_0_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/models/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_models_model__ = __webpack_require__("./app/models/model.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var User = (function (_super) {
    __extends(User, _super);
    function User(json) {
        if (json === void 0) { json = {}; }
        var _this = _super.call(this, json.id) || this;
        // calculated field
        _this.orgaAdmin = false;
        _this.superuser = json.superuser && json.superuser || false;
        _this.username = json.username && json.username || '';
        _this.password = json.password && json.password || '';
        _this.fullname = json.fullname && json.fullname || '';
        _this.phone = json.phone && json.phone || '';
        _this.providers = json.providers && json.providers || new Array();
        _this.setOrgaAdmin();
        return _this;
    }
    User.prototype.setOrgaAdmin = function () {
        var _this = this;
        this.providers.forEach(function (provider) {
            if (provider.admin) {
                _this.orgaAdmin = true;
            }
        });
    };
    User.prototype.getAdminOrgas = function () {
        var adminOrgas = new Array();
        this.providers.forEach(function (provider) {
            if (provider.admin) {
                adminOrgas.push(provider.organisation);
            }
        });
        return adminOrgas;
    };
    return User;
}(__WEBPACK_IMPORTED_MODULE_0_app_models_model__["a" /* Model */]));



/***/ }),

/***/ "./app/services/activity.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ActivityService = (function (_super) {
    __extends(ActivityService, _super);
    function ActivityService(http, authService) {
        var _this = _super.call(this, http, 'activities', authService) || this;
        _this.http = http;
        _this.authService = authService;
        return _this;
    }
    ActivityService.prototype.getByProviders = function (tableState, providers) {
        var request = Object.assign(tableState, this.createProvidersParam(providers));
        return this.http.post(this.baseUrl + 'getByProviders', JSON.stringify(request), {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        }).map(function (res) { return res; });
    };
    ActivityService.prototype.createProvidersParam = function (providers) {
        var providersParam = { 'providers': [] };
        providersParam.providers = providers;
        return providersParam;
    };
    ActivityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_app_services_authentication_service__["a" /* AuthenticationService */]])
    ], ActivityService);
    return ActivityService;
}(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service__["a" /* DataService */]));



/***/ }),

/***/ "./app/services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_models_user__ = __webpack_require__("./app/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthenticationService = (function () {
    function AuthenticationService(router, http, constants) {
        this.router = router;
        this.http = http;
        this.constants = constants;
        this.credentials = '';
        this.currentUser = null;
    }
    AuthenticationService.prototype.canActivate = function (route, state) {
        if (state.url.includes(this.constants.userURL)) {
            return this.handleSuperUserRoute();
        }
        if (state.url.includes(this.constants.orgaAdminURL)) {
            return this.handleOrgaAdminRoute();
        }
        return this.handleProviderRoutes();
    };
    AuthenticationService.prototype.login = function (username, pwd) {
        var _this = this;
        var password = this.getPwd(pwd);
        var credentials = btoa(username + ':' + password);
        return this.http.post('/api/users/login', null, {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic ' + credentials)
        })
            .map(function (resp) { return resp; }) // TODO: Check for internal server errors
            .map(function (response) {
            return response.success
                ? _this.handleSuccessLogin(response, credentials)
                : false;
        });
    };
    AuthenticationService.prototype.handleSuccessLogin = function (response, credentials) {
        if (response.data) {
            this.credentials = credentials;
            this.currentUser = new __WEBPACK_IMPORTED_MODULE_3_app_models_user__["a" /* User */](response.data);
            return true;
        }
        return false;
    };
    AuthenticationService.prototype.logout = function () {
        this.currentUser = null;
        this.credentials = '';
    };
    AuthenticationService.prototype.handleProviderRoutes = function () {
        return this.currentUser
            ? true
            : this.handleRedirect();
    };
    AuthenticationService.prototype.handleSuperUserRoute = function () {
        return this.isSuperUser()
            ? true
            : this.handleRedirect();
    };
    AuthenticationService.prototype.handleOrgaAdminRoute = function () {
        return this.isOrganisationAdmin() || this.isSuperUser()
            ? true
            : this.handleRedirect();
    };
    AuthenticationService.prototype.handleRedirect = function () {
        this.redirectToLogin();
        return false;
    };
    AuthenticationService.prototype.redirectToLogin = function () {
        this.router.navigate(['/login']);
    };
    AuthenticationService.prototype.isSuperUser = function () {
        return this.currentUser
            ? this.currentUser.superuser
            : false;
    };
    AuthenticationService.prototype.isOrganisationAdmin = function () {
        return this.currentUser
            ? this.currentUser.orgaAdmin
            : false;
    };
    AuthenticationService.prototype.basicAuthString = function () {
        return 'Basic ' + this.credentials;
    };
    AuthenticationService.prototype.getPwd = function (password) {
        if (password) {
            return password;
        }
        else {
            return this.credentials ? atob(this.credentials).split(':')[1] : '';
        }
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_constants__["a" /* Constants */]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./app/services/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Constants = (function () {
    function Constants() {
        // --------------------------
        // STATIC
        // --------------------------
        this.weekDaysArray = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
        this.rythm = 'Rythmus';
        this.from = 'von';
        this.to = 'bis';
        this.at = 'am';
        this.unique = 'einmalig';
        this.day = 'Tag';
        this.week = 'Woche';
        this.month = 'Monat';
        this.year = 'Jahr';
        this.daily = 'täglich';
        this.weekly = 'wöchentlich';
        this.weekdays = 'Wochentage';
        this.monthly = 'monatlich';
        this.yearly = 'jährlich';
        this.countryCode = 'de';
        // --------------------------
        // LABELS
        // --------------------------
        this.close = 'Schließen';
        this.back = 'Zurück';
        this.newElement = 'Neu';
        this.cancel = 'Abbrechen';
        this.newEntry = 'Neuen Eintrag anlegen';
        this.login = 'anmelden';
        this.loginTitle = 'Login';
        this.register = 'registrieren';
        this.userName = 'Username';
        this.password = 'Passwort';
        this.newPassword = 'Neues Passwort';
        this.confirmPassword = 'Passwort wiederholen';
        this.registration = 'Registrierung';
        this.filter = 'Filter';
        this.configuration = 'Einstellungen';
        this.requests = 'Anfragen';
        this.showMembers = 'Mitglieder anzeigen';
        this.showRequests = 'Anfragen anzeigen';
        this.declineRequest = 'Anfrage ablehnen';
        this.approveRequest = 'Anfrage bestätigen';
        this.createdAt = 'Erstellt';
        this.save = 'Speichern';
        this.select = 'Auswählen';
        this.delete = 'Löschen';
        this.deleteAll = 'Alle Einträge löschen';
        this.change = 'Ändern';
        this.edit = 'Bearbeiten';
        this.chosen = 'Ausgewählt';
        this.choose = 'wählen Sie';
        this.create = 'Erstelle';
        this.calculate = 'Errechne';
        this.frequently = 'Regelmäßig';
        this.next = 'weiter';
        this.previous = 'vorherige';
        this.approved = 'Bestätigt';
        this.coreData = 'Stammdaten';
        this.metaData = 'Metadaten';
        this.own = 'Eigene';
        this.no = 'Nein';
        this.yes = 'Ja';
        this.ok = 'OK';
        this.deleteMessage = 'Möchten Sie den folgenden Eintrag wirklich löschen?';
        this.isRequiredMessage = 'Feld darf nicht leer sein';
        this.emailFormatMessage = 'Feld muss Email Format haben';
        this.notSamePasswordMessage = 'Passwörter stimmen nicht überein';
        this.orAreEmptyMessage = 'oder sind leer';
        this.begin = 'Anfang';
        this.end = 'Ende';
        this.last = 'letzten';
        this.deleteFromOrganisation = 'Aus Organisation entfernen';
        this.wrongCredentialsMessage = 'Kein Nutzer mit diesem Password gefunden';
        this.multipleOrganisationMessage = 'Sie sind Administrator für mehere Organisationen';
        this.pleaseSelectMessage = 'Bitte wählen Sie eine aus:';
        this.publicUser = 'Soll der Name des Anbieters veröffentlicht werden?';
        this.dateTimeQuestion = 'Wann findet Ihre Veranstaltung statt?';
        this.placeQuestion = 'Wo findet Ihre Veranstaltung statt?';
        this.pleaseControl = 'Bitte kontrollieren Sie Ihre Angaben';
        this.scheduleListExplanation = 'Sie können an dieser Stelle auch Anpssungen vornehmen, ' +
            'indem Sie auf den jeweiligen	termin klicken.';
        this.chooseOrganisationForActivity = 'Im Namen welcher Organisation soll die Veranstaltung angelegt werden';
        this.tagsHint = 'Schlagworte bitte mit Komma trennen';
        this.scheduleInfo = 'Bei eintägigen Veranstaltungen bitte zwei mal' +
            'das gleiche Datum angeben.Für regelmäßige Veranstaltungen bitte das Datum	des ersten und des' +
            'letzten Termins angeben.Sie können die Termine anschließend noch einmal kontrollieren und verändern.';
        this.followingWeekdays = 'an folgenden Wochentagen';
        this.everyMonth = 'eines jeden Monats';
        this.every = 'Jede(n/s)';
        this.suffixAmount = 'te(n/s)';
        this.suffixNumber = 'ten';
        this.website = 'Webseite';
        this.description = 'Beschreibung';
        this.nameString = 'Name';
        this.fullname = 'Vor- und Nachname';
        this.phone = 'Telefon';
        this.mail = 'Email';
        this.address = 'Adresse';
        this.addressManagement = 'Adressverwaltung';
        this.street = 'Straße';
        this.postalCode = 'PLZ';
        this.place = 'Ort';
        this.houseNumber = 'Hausnummer';
        this.quarter = 'Quartier';
        this.longitude = 'Längengrad';
        this.latitude = 'Breitengrad';
        this.dates = 'Termine';
        this.date = 'Termin';
        this.noFutureDates = 'Keine zukünftigen Termine';
        this.title = 'Titel';
        this.tags = 'Tags';
        this.targetGroups = 'Zielgruppen';
        this.category = 'Kategorie';
        this.organisations = 'Organisationen';
        this.organisation = 'Organisation';
        this.organisationAdmin = 'Organisation verwalten';
        this.users = 'Anbieter';
        this.user = 'Anbieter';
        this.members = 'Mitglieder';
        this.activities = 'Aktivitäten';
        this.activity = 'Aktivität';
        this.account = 'Konto';
        this.admin = 'Admin';
        this.userManagement = 'Nutzerverwaltung';
        this.error = 'Fehler';
        this.done = 'Erledigt';
        this.summary = 'Zusammenfassung';
        this.infos = 'Infos';
        this.warning = 'Achtung!';
        this.configWarning = 'Durch Veränderungen in diesem Bereich verändern Sie die öffentliche Darstellung dieses Portals!';
        this.mapcenterLongitude = 'Längengrad für Kartenmittelpunkt';
        this.mapcenterLatitude = 'Breitengrad für Kartenmittelpunkt';
        this.zoomfactor = 'Zoomfaktor für Karte';
        this.mapProjection = 'Kartenprojektion';
        this.portalName = 'Name dieses Portals';
        this.portalSubtitle = 'Unterschrift dieses Portalnamens';
        // --------------------------
        // TABLE
        // --------------------------
        this.defaultPageSize = 25;
        this.pageSizeOptions = [5, 10, 25, 50, 100];
        // --------------------------
        // URLs
        // --------------------------
        this.userURL = '(table:users)';
        this.orgaAdminURL = '(table:organisation-admin)';
    }
    Constants.nextPageLabel = 'Nächste Seite';
    Constants.previousPageLabel = 'Vorherige Seite';
    Constants.itemsPerPageLabel = 'Einträge pro Seite';
    Constants.of = 'von';
    Constants = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], Constants);
    return Constants;
}());



/***/ }),

/***/ "./app/services/data.service.factory.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return UserService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return TagService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return TargetGroupService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return OrganisationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ScheduleService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SuburbService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CategoryService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ConfigurationService; });
/* harmony export (immutable) */ __webpack_exports__["d"] = DataServiceFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");


var UserService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('users');
var TagService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('tags');
var TargetGroupService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('target_groups');
var OrganisationService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('organisations');
var AddressService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('addresses');
var ScheduleService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('schedules');
var SuburbService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('suburbs');
var CategoryService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('categories');
var ConfigurationService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('configurations');
function DataServiceFactory(service) {
    var repository = service.toString().replace('InjectionToken ', '');
    return function (http, authService) {
        return new __WEBPACK_IMPORTED_MODULE_1_app_services_data_service__["a" /* DataService */](http, repository, authService);
    };
}


/***/ }),

/***/ "./app/services/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_skip__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/skip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataService = (function () {
    function DataService(http, repository, authService) {
        this.http = http;
        this.repository = repository;
        this.authService = authService;
        this.endpoint = '/api/';
        this.baseUrl = this.endpoint + repository + '/';
    }
    DataService.prototype.add = function (record) {
        return this.http.post(this.baseUrl, JSON.stringify(record), {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        });
    };
    DataService.prototype.delete = function (recordID) {
        return this.http.delete(this.baseUrl + recordID, {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        });
    };
    DataService.prototype.edit = function (record) {
        return this.http.patch(this.baseUrl + record.id + '/', JSON.stringify(record), {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        });
    };
    DataService.prototype.get = function (id) {
        return this.http.get(this.baseUrl + id, {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        }).map(function (i) { return i; });
    };
    DataService.prototype.list = function (request) {
        return this.http.post(this.baseUrl + 'list', JSON.stringify(request), {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        }).map(function (res) { return res; });
    };
    DataService.prototype.getAll = function () {
        return this.http.get(this.baseUrl, {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        });
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], String, __WEBPACK_IMPORTED_MODULE_5_app_services_authentication_service__["a" /* AuthenticationService */]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./app/services/location.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_service__ = __webpack_require__("./app/services/service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LocationService = (function (_super) {
    __extends(LocationService, _super);
    function LocationService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = null;
        return _this;
    }
    LocationService.prototype.add = function (item) { return; };
    LocationService.prototype.delete = function (item) { return; };
    LocationService.prototype.edit = function (item) { return; };
    LocationService.prototype.get = function (query) {
        if (query === void 0) { query = null; }
        var address = new __WEBPACK_IMPORTED_MODULE_3_app_models_address__["a" /* Address */]({});
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                if (pos.coords.latitude === 0 || pos.coords.longitude === 0) {
                    return;
                }
                address.latitude = pos.coords.latitude;
                address.longitude = pos.coords.longitude;
            });
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of(address);
    };
    LocationService.prototype.list = function () { return null; };
    LocationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])()
    ], LocationService);
    return LocationService;
}(__WEBPACK_IMPORTED_MODULE_4_app_services_service__["a" /* Service */]));



/***/ }),

/***/ "./app/services/nominatim.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NominatimService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_service__ = __webpack_require__("./app/services/service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NominatimService = (function (_super) {
    __extends(NominatimService, _super);
    function NominatimService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseURL = '';
        _this.url = 'https://nominatim.openstreetmap.org/search/';
        _this.format = '?format=json&addressdetails=1';
        return _this;
    }
    NominatimService.prototype.add = function (item) { return; };
    NominatimService.prototype.delete = function (item) { return; };
    NominatimService.prototype.edit = function (item) { return; };
    NominatimService.prototype.get = function (query) {
        return this.http.get(this.url + query + this.format)
            .map(function (res) { return res.shift(); }).map(function (i) {
            var address = new __WEBPACK_IMPORTED_MODULE_2_app_models_address__["a" /* Address */]({});
            address.suburb = null;
            if (i) {
                address.latitude = i['lat'];
                address.longitude = i['lon'];
                address.house_number = i['address']['house_number'] ? i['address']['house_number'] : '';
                address.place = i['address']['city'];
                if (address.place == null) {
                    address.place = i['address']['county'] ? i['address']['county'] : '';
                }
                address.postal_code = i['address']['postcode'] ? i['address']['postcode'] : '';
                address.street = i['address']['road'];
                if (address.street == null) {
                    address.street = i['address']['construction'];
                }
                if (address.street == null) {
                    address.street = i['address']['pedestrian'] ? i['address']['pedestrian'] : '';
                }
            }
            console.log(address);
            return address;
        });
    };
    NominatimService.prototype.list = function () { return null; };
    NominatimService.prototype.getUrl = function () {
        return this.url;
    };
    NominatimService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
    ], NominatimService);
    return NominatimService;
}(__WEBPACK_IMPORTED_MODULE_3_app_services_service__["a" /* Service */]));



/***/ }),

/***/ "./app/services/provider.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProviderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProviderService = (function (_super) {
    __extends(ProviderService, _super);
    function ProviderService(http, authService) {
        var _this = _super.call(this, http, 'providers', authService) || this;
        _this.http = http;
        _this.authService = authService;
        return _this;
    }
    ProviderService.prototype.getByOrganisation = function (organisationID, tableState) {
        var request = tableState
            && Object.assign(tableState, this.createProvidersParam(organisationID))
            || this.createProvidersParam(organisationID);
        return this.http.post(this.baseUrl + 'getByOrganisation', JSON.stringify(request), {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        }).map(function (res) { return res; });
    };
    ProviderService.prototype.createProvidersParam = function (organisationID) {
        var orgaParam = { 'organisation': '' };
        orgaParam.organisation = organisationID;
        return orgaParam;
    };
    ProviderService.prototype.getByUser = function (userID, admin) {
        var request = admin
            && Object.assign(this.createAdminParam(admin), this.createUserParam(userID))
            || this.createUserParam(userID);
        return this.http.post(this.baseUrl + 'getByUser', JSON.stringify(request), {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('Authorization', this.authService.basicAuthString())
        }).map(function (res) { return res; });
    };
    ProviderService.prototype.createUserParam = function (userID) {
        var userParam = { 'user': '' };
        userParam.user = userID;
        return userParam;
    };
    ProviderService.prototype.createAdminParam = function (admin) {
        var adminParam = { 'admin': '' };
        adminParam.admin = admin;
        return adminParam;
    };
    ProviderService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_app_services_authentication_service__["a" /* AuthenticationService */]])
    ], ProviderService);
    return ProviderService;
}(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service__["a" /* DataService */]));



/***/ }),

/***/ "./app/services/service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_skip__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/skip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Service = (function () {
    function Service(http) {
        this.http = http;
        this.baseURL = '/api/';
    }
    Service.prototype.add = function (item) {
        this.http.put(this.getUrl() + '/add/' + item.id, JSON.stringify(item))
            .subscribe();
    };
    Service.prototype.delete = function (item) {
        this.http.delete(this.getUrl() + '/delete/' + item.id)
            .subscribe();
    };
    Service.prototype.edit = function (item) {
        this.http.post(this.getUrl() + '/edit/', JSON.stringify(item))
            .subscribe();
    };
    Service.prototype.get = function (id) {
        return this.http.get(this.getUrl() + id).map(function (i) { return i; });
    };
    Service.prototype.list = function () {
        return this.http.get(this.getUrl()).map(function (i) { return i; });
    };
    Service.prototype.getUrl = function () {
        return this.baseURL + this.url;
    };
    Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], Service);
    return Service;
}());



/***/ }),

/***/ "./app/services/validation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationService; });
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    ValidationService.prototype.passwordMatch = function (g) {
        return g.get('passwordCtrl').value === g.get('confirmPasswordCtrl').value
            ? null : { 'notEquivalent': true };
    };
    return ValidationService;
}());



/***/ }),

/***/ "./app/views/admin/actions/delete.action.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteActionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_views_admin_dialog_delete_dialog__ = __webpack_require__("./app/views/admin/dialog/delete.dialog.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DeleteActionComponent = (function () {
    function DeleteActionComponent(constants, deleteDialog) {
        this.constants = constants;
        this.deleteDialog = deleteDialog;
        this.onDelete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    DeleteActionComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.deleteDialog.open(__WEBPACK_IMPORTED_MODULE_3_app_views_admin_dialog_delete_dialog__["a" /* DeleteDialogComponent */], {
            width: '250px',
            data: {
                name: this.nameToDelete,
                message: this.constants.deleteMessage,
                id: this.recordID
            }
        });
        dialogRef.afterClosed().subscribe(function (deleted) {
            if (deleted) {
                _this.onDelete.emit(_this.recordID);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], DeleteActionComponent.prototype, "recordID", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], DeleteActionComponent.prototype, "nameToDelete", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], DeleteActionComponent.prototype, "onDelete", void 0);
    DeleteActionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'delete-action',
            template: "\n\t\t<button mat-button color=\"warn\" type=\"button\"\n\t\t\t(click)=\"openDialog()\">\n\t\t\t<i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n\t\t</button>\n\t"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatDialog */]])
    ], DeleteActionComponent);
    return DeleteActionComponent;
}());



/***/ }),

/***/ "./app/views/admin/activities/activity.detail.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"activity && activity.provider && activity.provider.organisation\">\r\n\t<mat-card-header>\r\n\t\t<mat-card-title>\r\n\t\t\t<h3>{{constants.coreData}}</h3>\r\n\t\t</mat-card-title>\r\n\t</mat-card-header>\r\n\t<mat-card-content>\r\n\t\t<div>{{constants.title}} :\r\n\t\t\t<b>{{activity.name}}</b>\r\n\t\t</div>\r\n\t\t<div>{{constants.organisation}} :\r\n\t\t\t<b *ngIf=\"activity.provider\">{{activity.provider.organisation.name}}</b>\r\n\t\t\t<div>{{activity.provider.organisation.mail ? constants.mail + ':' + activity.provider.organisation.mail : ''}}</div>\r\n\t\t\t<div>{{activity.provider.organisation.phone ? constants.phone + ': ' + activity.provider.organisation.phone : ''}}</div>\r\n\t\t</div>\r\n\t\t<div>{{constants.description}} :\r\n\t\t\t<b>{{activity.description}}</b>\r\n\t\t</div>\r\n\t\t{{constants.publicUser}}\r\n\t\t<div *ngIf=\"activity.show_user && user\">\r\n\t\t\t<b>{{constants.yes}}</b>\r\n\t\t\t<div>{{user.fullname ? constants.nameString + ': ' : ''}}\r\n\t\t\t\t<b>{{user.fullname ? user.fullname : ''}}</b>\r\n\t\t\t</div>\r\n\t\t\t<div>{{user.username ? constants.user + ': ' : ''}}\r\n\t\t\t\t<b>{{user.username ? user.username : ''}}</b>\r\n\t\t\t</div>\r\n\t\t\t<div>{{user.phone ? constants.phone + ': ' : ''}}\r\n\t\t\t\t<b>{{user.phone ? user.phone : ''}}</b>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div *ngIf=\"!activity.show_user\">\r\n\t\t\t<b>{{constants.no}}</b>\r\n\t\t</div>\r\n\t\t<div>{{constants.address}} :\r\n\t\t\t<b *ngIf=\"activity.address\">{{activity.address.toString}}</b>\r\n\t\t</div>\r\n\t\t<h3>{{constants.metaData}}</h3>\r\n\t\t<div>{{constants.category}} :\r\n\t\t\t<b *ngIf=\"activity.category\">{{activity.category.name}}</b>\r\n\t\t</div>\r\n\t\t<span>\r\n\t\t\t<mat-list role=\"list\">\r\n\t\t\t\t<mat-list-item role=\"listitem\" *ngFor=\"let targetGroup of activity.targetGropus\">{{targetGroup.name}}</mat-list-item>\r\n\t\t\t</mat-list>\r\n\t\t</span>\r\n\t\t<span>\r\n\t\t\t<mat-chip-list class=\"mat-chip-list-stacked\">\r\n\t\t\t\t<mat-chip selected=\"true\" *ngFor=\"let tag of activity.tags\">#{{tag.name}}</mat-chip>\r\n\t\t\t</mat-chip-list>\r\n\t\t</span>\r\n\t\t<h3>{{constants.dates}}</h3>\r\n\t\t<mat-list role=\"list\">\r\n\t\t\t<mat-list-item role=\"listitem\" *ngFor=\"let schedule of activity.schedules\">{{schedule.toString}}</mat-list-item>\r\n\t\t</mat-list>\r\n\t</mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/activities/activity.detail.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_models_activity__ = __webpack_require__("./app/models/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_models_user__ = __webpack_require__("./app/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ActivityDetailComponent = (function () {
    function ActivityDetailComponent(constants) {
        this.constants = constants;
    }
    ActivityDetailComponent.prototype.ngOnChanges = function (changes) {
        if (changes.activity) {
            var activity = changes.activity;
            this.activity = activity.currentValue;
        }
        if (this.user && changes.user) {
            var user = changes.user;
            this.user = user.currentValue;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_app_models_activity__["a" /* Activity */])
    ], ActivityDetailComponent.prototype, "activity", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_app_models_user__["a" /* User */])
    ], ActivityDetailComponent.prototype, "user", void 0);
    ActivityDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-detail',
            template: __webpack_require__("./app/views/admin/activities/activity.detail.html"),
            styles: [__webpack_require__("./app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_services_constants__["a" /* Constants */]])
    ], ActivityDetailComponent);
    return ActivityDetailComponent;
}());



/***/ }),

/***/ "./app/views/admin/activities/activity.form.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"edit-container\" *ngIf=\"activity\">\r\n\t<h2>{{ activity.name }}</h2>\r\n\t<form #activityForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\t\t<mat-card class=\"activity-edit-card\">\r\n\t\t\t<mat-horizontal-stepper linear=\"true\">\r\n\t\t\t\t<mat-step [stepControl]=\"firstFormGroup\">\r\n\t\t\t\t\t<form [formGroup]=\"firstFormGroup\">\r\n\t\t\t\t\t\t<mat-card>\r\n\t\t\t\t\t\t\t<ng-template matStepLabel>{{constants.coreData}}</ng-template>\r\n\t\t\t\t\t\t\t<h2>{{constants.coreData}}</h2>\r\n\t\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t\t<input matInput type=\"text\" formControlName=\"nameCtrl\" placeholder={{constants.title}} name=\"name\" value={{activity.name}}\r\n\t\t\t\t\t\t\t\t required id=\"activity_name_field\">\r\n\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t\t<textarea matInput type=\"text\" formControlName=\"descriptionCtrl\" placeholder=\"{{constants.description}}\" name=\"description\"\r\n\t\t\t\t\t\t\t\t value={{activity.description}} id=\"activity_description_field\"></textarea>\r\n\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t<h2>{{constants.chooseOrganisationForActivity}}</h2>\r\n\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t<mat-select required placeholder={{constants.organisation}} formControlName=\"providerCtrl\" name=\"activity_provider_id\">\r\n\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let provider of providers\" [value]=\"provider.id\">{{provider.organisation ? provider.organisation.name : ''}}</mat-option>\r\n\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t<mat-checkbox *ngIf=\"activity.provider && activity.provider.organisation\" formControlName=\"showUserCtrl\" name=\"showUser\">{{constants.publicUser}}</mat-checkbox>\r\n\r\n\t\t\t\t\t\t\t<h2 class=\"edit-form-three-column-width\" matTooltip='Durch Klicken entfernen Sie die Schlagworte'>{{constants.tags}}</h2>\r\n\t\t\t\t\t\t\t<mat-form-field class=\"tags-chip-list\" style=\"width:100%;\">\r\n\t\t\t\t\t\t\t\t<mat-chip-list #chipList>\r\n\t\t\t\t\t\t\t\t\t<mat-chip *ngFor=\"let tag of activity.tags\" selectable=\"true\" removable=\"true\">\r\n\t\t\t\t\t\t\t\t\t\t{{tag.name + ' '}}\r\n\t\t\t\t\t\t\t\t\t\t<i (click)=\"removeTag(tag)\" class=\"fa fa-trash-o\" aria-hidden=\"true\" style=\"color:red;\"></i>\r\n\t\t\t\t\t\t\t\t\t</mat-chip>\r\n\t\t\t\t\t\t\t\t\t<input placeholder={{constants.tags}} [matChipInputFor]=\"chipList\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" matChipInputAddOnBlur=\"true\"\r\n\t\t\t\t\t\t\t\t\t (matChipInputTokenEnd)=\"addTag($event)\" />\r\n\t\t\t\t\t\t\t\t</mat-chip-list>\r\n\t\t\t\t\t\t\t</mat-form-field>\r\n\r\n\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t<mat-select required placeholder={{constants.category}} formControlName=\"categoryCtrl\" name=\"activity_category\">\r\n\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let category of categories\" [value]=\"category.id\">{{category.name}}</mat-option>\r\n\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t</mat-form-field>\r\n\r\n\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t<mat-select placeholder={{constants.targetGroups}} formControlName=\"targetGroupCtrl\" name=\"activity_targetGroups\" multiple>\r\n\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let targetGroup of targetGroups\" [value]=\"targetGroup.id\">{{targetGroup.name}}</mat-option>\r\n\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" matStepperNext>{{constants.next}}</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</mat-card>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</mat-step>\r\n\r\n\t\t\t\t<mat-step [stepControl]=\"secondFormGroup\">\r\n\t\t\t\t\t<ng-template matStepLabel>{{constants.address}}</ng-template>\r\n\t\t\t\t\t<h2>{{constants.placeQuestion}}</h2>\r\n\t\t\t\t\t<form [formGroup]=\"secondFormGroup\">\r\n\t\t\t\t\t\t<mat-card class=\"address-card\" *ngIf=\"activity.address\">\r\n\t\t\t\t\t\t\t<div *ngIf=\"secondFormGroup.invalid\">\r\n\t\t\t\t\t\t\t\t<address-autocomplete-form #addressAutocompleteComponent [initialAddress]=\"activity.address\"></address-autocomplete-form>\r\n\t\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" (click)=\"addressSubmit()\">{{constants.ok}}</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div *ngIf=\"!secondFormGroup.invalid\">\r\n\t\t\t\t\t\t\t\t{{activity.address.toString}}\r\n\t\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" (click)=\"resetAddress()\">{{constants.change}}</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</mat-card>\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button matStepperPrevious>{{constants.previous}}</button>\r\n\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" [disabled]=\"secondFormGroup.invalid\" matStepperNext>{{constants.next}}</button>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</mat-step>\r\n\r\n\t\t\t\t<mat-step [stepControl]=\"thirdFormGroup\">\r\n\t\t\t\t\t<ng-template matStepLabel>{{constants.dates}}</ng-template>\r\n\t\t\t\t\t<h2>{{constants.dateTimeQuestion}}</h2>\r\n\t\t\t\t\t<form [formGroup]=\"thirdFormGroup\">\r\n\t\t\t\t\t\t<mat-card class=\"schedule-card\">\r\n\t\t\t\t\t\t\t<div *ngIf=\"!activity.schedules.length\">\r\n\t\t\t\t\t\t\t\t<mat-grid-list cols=\"5\" rowHeight=\"100px\">\r\n\t\t\t\t\t\t\t\t\t<mat-grid-tile colspan=\"2\" rowspan=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<mat-form-field style=\"width:50px; margin:2px\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" pattern=\"([01]?[0-9]|2[0-3])\" placeholder={{constants.from}} formControlName=\"startTimeHourCtrl\"\r\n\t\t\t\t\t\t\t\t\t\t\t name=\"start_time_hour\" id=\"activity_start_time_hour\">\r\n\t\t\t\t\t\t\t\t\t\t\t<span matSuffix>:</span>\r\n\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t<mat-form-field style=\"width:50px; margin:2px\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" pattern=\"[0-5]?[0-9]\" formControlName=\"startTimeMinuteCtrl\" name=\"start_time_minute\" id=\"activity_start_time_minute\">\r\n\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t<mat-form-field style=\"width:50px; margin:2px\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" pattern=\"([01]?[0-9]|2[0-3])\" placeholder={{constants.to}} formControlName=\"endTimeHourCtrl\"\r\n\t\t\t\t\t\t\t\t\t\t\t name=\"end_time_hour\" id=\"activity_end_time_hour\">\r\n\t\t\t\t\t\t\t\t\t\t\t<span matSuffix>:</span>\r\n\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t<mat-form-field style=\"width:50px; margin:2px\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" pattern=\"[0-5]?[0-9]\" formControlName=\"endTimeMinuteCtrl\" name=\"end_time_minute\" id=\"activity_end_time_minute\">\r\n\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t</mat-grid-tile>\r\n\t\t\t\t\t\t\t\t\t<mat-grid-tile colspan=\"2\" rowspan=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input matInput style=\"width:50px;\" [matDatepicker]=\"pickerStartDate\" formControlName=\"startDateCtrl\" placeholder={{constants.begin}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t name=\"schedule_start_by\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"pickerStartDate\"></mat-datepicker-toggle>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker #pickerStartDate></mat-datepicker>\r\n\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input matInput style=\"width:50px;\" [matDatepicker]=\"pickerEndDate\" formControlName=\"endDateCtrl\" placeholder={{constants.end}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t name=\"schedule_end_by\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"pickerEndDate\"></mat-datepicker-toggle>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker #pickerEndDate></mat-datepicker>\r\n\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</mat-grid-tile>\r\n\r\n\t\t\t\t\t\t\t\t\t<mat-grid-tile colspan=\"1\" rowspan=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<h3>{{ constants.infos }}</h3>\r\n\t\t\t\t\t\t\t\t\t</mat-grid-tile>\r\n\r\n\t\t\t\t\t\t\t\t\t<mat-grid-tile colspan=\"1\" rowspan=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<mat-form-field style=\"width: 50%\">\r\n\t\t\t\t\t\t\t\t\t\t\t<mat-select formControlName=\"rythmUnitCtrl\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-option value=\"unique\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.unique}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-option value=\"days\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.daily}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-option value=\"weeks\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.weekly}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-option value=\"months\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.monthly}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-option value=\"years\">{{constants.yearly}}</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t</mat-grid-tile>\r\n\r\n\t\t\t\t\t\t\t\t\t<mat-grid-tile colspan=\"3\" rowspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t\t<div *ngIf=\"thirdFormGroup.controls.rythmUnitCtrl.value != 'unique'\">\r\n\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span matPrefix>{{constants.every}} &nbsp;</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-select formControlName=\"rythmPeriodCtrl\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let day of [1,2,3,4,5,6,7,8,9,10,11,12,13,14]\" [value]=\"day\">{{day}}</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span matSuffix>{{constants.suffixAmount}} &nbsp;</span>\r\n\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t<div [ngSwitch]=\"thirdFormGroup.controls.rythmUnitCtrl.value\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngSwitchCase=\"'days'\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.day}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngSwitchCase=\"'weeks'\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span> Woche </span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span matPrefix>{{constants.followingWeekdays}}: </span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-select placeholder={{constants.weekdays}} formControlName=\"weekdaysCtrl\" multiple>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let weekDayIndex of [0,1,2,3,4,5,6]\" [value]=\"weekDayIndex\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.weekDaysArray[weekDayIndex]}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngSwitchCase=\"'months'\" style=\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\t\t\t\t\t\t\twidth: 25%;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{constants.month}}</div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-radio-group formControlName=\"monthlyRecurrenceCtrl\" style=\"margin: 5px; text-align: center;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-radio-button value=\"monthDate\" style=\"margin-top: 5px;\">{{constants.at}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-select formControlName=\"monthDateCtrl\" style=\"width: 100px\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let day of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]\" [value]=\"day\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{day}}{{constants.suffixNumber}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.everyMonth}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-radio-button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-radio-button value=\"weekDay\" style=\"margin-top: 5px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tjeden\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-select formControlName=\"weekdayNumberCtrl\" style=\"width: 100px\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let day of [1,2,3,4,5]\" [value]=\"day\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{day == 5 ? constants.last : day + constants.suffixNumber}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-select placeholder={{constants.weekDaysArray[0]}} formControlName=\"weekdaysCtrl\" multiple>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let weekDayIndex of [0,1,2,3,4,5,6]\" [value]=\"weekDayIndex\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.weekDaysArray[weekDayIndex]}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-radio-button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-radio-group>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngSwitchCase=\"'years'\">{{constants.year}}</span>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</mat-grid-tile>\r\n\r\n\t\t\t\t\t\t\t\t\t<mat-grid-tile colspan=\"1\" rowspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t\t{{constants.scheduleInfo}}\r\n\t\t\t\t\t\t\t\t\t</mat-grid-tile>\r\n\t\t\t\t\t\t\t\t\t<mat-grid-tile colspan=\"1\" rowspan=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<button mat-raised-button type=\"button\" color=\"primary\" (click)=\"generateSchedules()\" mat-button>{{constants.create}} {{constants.dates}}</button>\r\n\t\t\t\t\t\t\t\t\t</mat-grid-tile>\r\n\r\n\t\t\t\t\t\t\t\t</mat-grid-list>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div *ngIf=\"activity.schedules.length\" style=\"overflow: hidden;\">\r\n\t\t\t\t\t\t\t\t<div style=\"overflow-y: scroll; height: 400px;\">\r\n\t\t\t\t\t\t\t\t\t<h2>{{constants.pleaseControl}} {{constants.scheduleListExplanation}}\r\n\t\t\t\t\t\t\t\t\t</h2>\r\n\t\t\t\t\t\t\t\t\t<mat-accordion>\r\n\t\t\t\t\t\t\t\t\t\t<div *ngFor=\"let schedule of activity.schedules; index as i\">\r\n\t\t\t\t\t\t\t\t\t\t\t<mat-expansion-panel [expanded]=\"panelNumber === i\" (opened)=\"declerateDateForms(i)\" hideToggle=\"true\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<mat-expansion-panel-header>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-panel-title>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{ activity.schedules[i].toString }}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-panel-title>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-panel-description>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{constants.change}}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-panel-description>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</mat-expansion-panel-header>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input matInput [matDatepicker]=\"pickerStartDate\" name=\"schedule_start_by\" [formControl]=\"currentStartDate\" placeholder={{constants.from}}>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"pickerStartDate\"></mat-datepicker-toggle>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker #pickerStartDate></mat-datepicker>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" name=\"curr_start_time_hour\" [formControl]=\"currentStartTimeHour\" id=\"currentStratTimeHour\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>:\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" name=\"curr_start_time_minute\" [formControl]=\"currentStartTimeMinute\" id=\"currentStratTimeMinute\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input matInput [matDatepicker]=\"pickerEndDate\" name=\"schedule_end_by\" [formControl]=\"currentEndDate\" placeholder={{constants.to}}>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"pickerEndDate\"></mat-datepicker-toggle>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-datepicker #pickerEndDate></mat-datepicker>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" name=\"curr_end_time_hour\" [formControl]=\"currentEndTimeHour\" id=\"currentEndTimeHour\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input matInput type=\"number\" name=\"curr_end_time_minute\" [formControl]=\"currentEndTimeMinute\" id=\"currentEndTimeMinute\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button mat-raised-button type=\"button\" (click)=\"changeDate(i)\">{{constants.change}}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button mat-raised-button type=\"button\" (click)=\"removeDateEntry(i)\">{{constants.delete}}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</mat-expansion-panel>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</mat-accordion>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t<button mat-raised-button color=\"warn\" type=\"button\" (click)=\"removeCompleteSchedule()\">{{constants.deleteAll}}</button>\r\n\t\t\t\t\t\t\t\t\t<button mat-raised-button type=\"button\" (click)=\"addOneSchedule()\">{{constants.create + ' ' + constants.date}}</button>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</mat-card>\r\n\t\t\t\t\t\t<button type=\"button\" mat-button matStepperPrevious>{{constants.previous}}</button>\r\n\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" [disabled]=\"thirdFormGroup.invalid\" matStepperNext>{{constants.next}}</button>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</mat-step>\r\n\r\n\t\t\t\t<mat-step>\r\n\t\t\t\t\t<ng-template matStepLabel>{{constants.summary}}</ng-template>\r\n\t\t\t\t\t<h2>{{constants.pleaseControl}}</h2>\r\n\t\t\t\t\t<activity-detail *ngIf=\"activity && user\" [user]=\"user\" [activity]=\"activity\"></activity-detail>\r\n\t\t\t\t\t<div>\r\n\t\t\t\t\t\t<button type=\"button\" mat-button matStepperPrevious>{{constants.previous}}</button>\r\n\t\t\t\t\t\t<button mat-raised-button color=\"primary\" type=\"submit\">{{constants.save}}</button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</mat-step>\r\n\t\t\t</mat-horizontal-stepper>\r\n\t\t\t<button mat-raised-button color=\"warn\" type=\"button\" (click)=\"back()\">{{constants.cancel}}</button>\r\n\t\t</mat-card>\r\n\t</form>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/activities/activity.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_keycodes__ = __webpack_require__("./node_modules/@angular/cdk/esm5/keycodes.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_models_activity__ = __webpack_require__("./app/models/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_models_tag__ = __webpack_require__("./app/models/tag.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_models_schedule__ = __webpack_require__("./app/models/schedule.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_models_user__ = __webpack_require__("./app/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_app_views_admin_addresses_address_autocomplete__ = __webpack_require__("./app/views/admin/addresses/address.autocomplete.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_app_services_activity_service__ = __webpack_require__("./app/services/activity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_material_moment_adapter__ = __webpack_require__("./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_rrule__ = __webpack_require__("./node_modules/rrule/lib/rrule.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_rrule___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_rrule__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

























// @Author: Pseipel
var ActivityFormComponent = (function () {
    function ActivityFormComponent(adapter, activityService, providerService, userService, addressService, scheduleService, tagService, targetGroupService, categoriesService, authService, location, route, constants, _formBuilder, validation) {
        var _this = this;
        this.adapter = adapter;
        this.activityService = activityService;
        this.providerService = providerService;
        this.userService = userService;
        this.addressService = addressService;
        this.scheduleService = scheduleService;
        this.tagService = tagService;
        this.targetGroupService = targetGroupService;
        this.categoriesService = categoriesService;
        this.authService = authService;
        this.location = location;
        this.route = route;
        this.constants = constants;
        this._formBuilder = _formBuilder;
        this.validation = validation;
        this.providers = [];
        this.user = new __WEBPACK_IMPORTED_MODULE_12_app_models_user__["a" /* User */]();
        this.separatorKeysCodes = [__WEBPACK_IMPORTED_MODULE_5__angular_cdk_keycodes__["g" /* ENTER */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_keycodes__["c" /* COMMA */]];
        this.targetGroupService.getAll().subscribe(function (data) { return _this.targetGroups = data.records; });
        this.categoriesService.getAll().subscribe(function (data) { return _this.categories = data.records; });
    }
    ActivityFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adapter.setLocale(this.constants.countryCode);
        this.providerService
            .getByUser(this.authService.currentUser.id)
            .map(function (data) { return data.records; })
            .subscribe(function (providers) { return providers.map(function (provider) {
            if (provider.approved) {
                _this.providers.push(provider);
            }
        }); });
        this.route.paramMap
            .switchMap(function (params) {
            if (params.get('id') === 'new') {
                return new __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["a" /* Observable */](function (observer) { return observer.next(new __WEBPACK_IMPORTED_MODULE_9_app_models_activity__["a" /* Activity */]({})); });
            }
            else {
                return _this.activityService.get(params.get('id'));
            }
        })
            .map(function (data) { return new __WEBPACK_IMPORTED_MODULE_9_app_models_activity__["a" /* Activity */](data.records); }).subscribe(function (activity) {
            _this.activity = activity;
            if (_this.activity.provider.id) {
                if (_this.providers.indexOf(_this.activity.provider) === -1) {
                    _this.providers.push(_this.activity.provider);
                }
            }
            _this.declerateDateForms(-1);
            _this.firstFormGroup = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormGroup */]({
                'providerCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.provider_id, [
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required
                ]),
                'nameCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.name, [
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required
                ]),
                'showUserCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.show_user ? _this.activity.show_user : false),
                'descriptionCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.description),
                'tagsCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](''),
                'categoryCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.category.id, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required]),
                'targetGroupCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.target_groups)
            });
            _this.secondFormGroup = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormGroup */]({
                'addressCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.address.isValid(), [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required])
            });
            _this.thirdFormGroup = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormGroup */]({
                'startTimeHourCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.schedules[0] ?
                    __WEBPACK_IMPORTED_MODULE_21_moment__(_this.activity.schedules[0].startTime).hour() : __WEBPACK_IMPORTED_MODULE_21_moment__().hour()),
                'startTimeMinuteCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.schedules[0] ?
                    __WEBPACK_IMPORTED_MODULE_21_moment__(_this.activity.schedules[0].startTime).minute() : __WEBPACK_IMPORTED_MODULE_21_moment__().minute()),
                'endTimeHourCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.schedules[0] ?
                    __WEBPACK_IMPORTED_MODULE_21_moment__(_this.activity.schedules[0].endTime).hour() : __WEBPACK_IMPORTED_MODULE_21_moment__().hour()),
                'endTimeMinuteCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.schedules[0] ?
                    __WEBPACK_IMPORTED_MODULE_21_moment__(_this.activity.schedules[0].endTime).minute() : __WEBPACK_IMPORTED_MODULE_21_moment__().minute()),
                'startDateCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.schedules[0] ?
                    __WEBPACK_IMPORTED_MODULE_21_moment__(_this.activity.schedules[0].startDate) : __WEBPACK_IMPORTED_MODULE_21_moment__()),
                'endDateCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.schedules[0] ?
                    __WEBPACK_IMPORTED_MODULE_21_moment__(_this.activity.schedules[_this.activity.schedules.length - 1].end_date) : __WEBPACK_IMPORTED_MODULE_21_moment__()),
                'rythmPeriodCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](1),
                'weekdaysCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]([1]),
                'weekdayNumberCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](1),
                'monthlyRecurrenceCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]('monthDate'),
                'monthDateCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](1),
                'rythmUnitCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]('unique'),
                'schedulesCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](_this.activity.schedules, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required])
            });
            _this.firstFormGroup.get('nameCtrl').valueChanges.subscribe(function (name) { _this.activity.name = name; });
            _this.firstFormGroup.get('descriptionCtrl').valueChanges.subscribe(function (description) { _this.activity.description = description; });
            _this.firstFormGroup.get('providerCtrl').valueChanges.subscribe(function () {
                return _this.activity.provider = _this.providers.find(function (provider) { return provider.id === _this.firstFormGroup.get('providerCtrl').value; });
            });
            _this.firstFormGroup.get('providerCtrl').valueChanges.subscribe(function (providerID) { _this.activity.provider_id = providerID; });
            _this.firstFormGroup.get('showUserCtrl').valueChanges.subscribe(function (showUser) { _this.activity.show_user = showUser; });
            _this.firstFormGroup.get('categoryCtrl').valueChanges.subscribe(function () {
                return _this.activity.category = _this.categories.find(function (category) { return category.id === _this.firstFormGroup.get('categoryCtrl').value; });
            });
            _this.firstFormGroup.get('categoryCtrl').valueChanges.subscribe(function (catID) { _this.activity.category_id = catID; });
            _this.userService.get(_this.activity.provider.user_id).subscribe(function (user) {
                _this.user = new __WEBPACK_IMPORTED_MODULE_12_app_models_user__["a" /* User */](user.records);
            });
        });
    };
    ActivityFormComponent.prototype.addTag = function (event) {
        var input = event.input;
        var value = event.value;
        var currTag = new __WEBPACK_IMPORTED_MODULE_10_app_models_tag__["a" /* Tag */]();
        currTag.name = value.trim().toLowerCase();
        this.activity.tags.push(currTag);
        if (input) {
            input.value = '';
        }
    };
    ActivityFormComponent.prototype.removeTag = function (tag) {
        var index = this.activity.tags.indexOf(tag);
        if (index >= 0) {
            this.activity.tags.splice(index, 1);
        }
    };
    ActivityFormComponent.prototype.initCtrl = function (array) {
        var ids = [];
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            ids.push(item.id);
        }
        return ids;
    };
    ActivityFormComponent.prototype.generateSchedules = function () {
        var _this = this;
        if (this.thirdFormGroup.get('rythmPeriodCtrl').value > 0 && this.thirdFormGroup.get('rythmUnitCtrl').value !== 'unique') {
            if (!this.activity.schedules) {
                this.activity.schedules = [];
            }
            var startDate = __WEBPACK_IMPORTED_MODULE_21_moment__(this.thirdFormGroup.get('startDateCtrl').value);
            var endDate = __WEBPACK_IMPORTED_MODULE_21_moment__(this.thirdFormGroup.get('endDateCtrl').value);
            var recurrenceRange = { start: startDate, end: endDate };
            var rule = void 0;
            switch (this.thirdFormGroup.get('rythmUnitCtrl').value) {
                case 'years':
                    rule = new __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"]({
                        freq: __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].YEARLY,
                        interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
                        dtstart: startDate.toDate(),
                        until: endDate.toDate()
                    });
                    break;
                case 'months':
                    if (this.thirdFormGroup.get('monthlyRecurrenceCtrl').value === 'monthDate') {
                        if (startDate.date() > this.thirdFormGroup.get('monthDateCtrl').value) {
                            startDate.add(this.thirdFormGroup.get('rythmPeriodCtrl').value, 'month');
                        }
                        startDate.date(this.thirdFormGroup.get('monthDateCtrl').value);
                        rule = new __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"]({
                            freq: __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].MONTHLY,
                            interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
                            dtstart: startDate.toDate(),
                            until: endDate.toDate()
                        });
                    }
                    else {
                        var byweekdayArray = [];
                        for (var i = 0; i < this.thirdFormGroup.get('weekdaysCtrl').value.length; i++) {
                            var weekday = void 0;
                            switch (this.thirdFormGroup.get('weekdaysCtrl').value[i]) {
                                case 0:
                                    weekday = __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].MO;
                                    break;
                                case 1:
                                    weekday = __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].TU;
                                    break;
                                case 2:
                                    weekday = __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].WE;
                                    break;
                                case 3:
                                    weekday = __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].TH;
                                    break;
                                case 4:
                                    weekday = __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].FR;
                                    break;
                                case 5:
                                    weekday = __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].SA;
                                    break;
                                default:
                                    weekday = __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].SU;
                            }
                            byweekdayArray.push(weekday.nth(this.thirdFormGroup.get('weekdayNumberCtrl').value === 5 ? -1 : this.thirdFormGroup.get('weekdayNumberCtrl').value));
                        }
                        rule = new __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"]({
                            freq: __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].MONTHLY,
                            interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
                            byweekday: byweekdayArray,
                            dtstart: startDate.toDate(),
                            until: endDate.toDate()
                        });
                    }
                    break;
                case 'weeks':
                    rule = new __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"]({
                        freq: __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].WEEKLY,
                        interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
                        byweekday: this.thirdFormGroup.get('weekdaysCtrl').value,
                        dtstart: startDate.toDate(),
                        until: endDate.toDate()
                    });
                    break;
                default:
                    rule = new __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"]({
                        freq: __WEBPACK_IMPORTED_MODULE_24_rrule__["RRule"].DAILY,
                        interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
                        dtstart: startDate.toDate(),
                        until: endDate.toDate()
                    });
            }
            var allDates = rule.all();
            allDates.map(function (date) {
                var currSchedule = new __WEBPACK_IMPORTED_MODULE_11_app_models_schedule__["a" /* Schedule */]({});
                currSchedule.startDate = __WEBPACK_IMPORTED_MODULE_21_moment__(date).format();
                currSchedule.startTimeHour = _this.thirdFormGroup.get('startTimeHourCtrl').value;
                currSchedule.startTimeMinute = _this.thirdFormGroup.get('startTimeMinuteCtrl').value;
                currSchedule.endDate = __WEBPACK_IMPORTED_MODULE_21_moment__(date).format();
                currSchedule.endTimeHour = _this.thirdFormGroup.get('endTimeHourCtrl').value;
                currSchedule.endTimeMinute = _this.thirdFormGroup.get('endTimeMinuteCtrl').value;
                _this.activity.schedules.push(currSchedule);
            });
        }
        else {
            var oneTimeSchedule = new __WEBPACK_IMPORTED_MODULE_11_app_models_schedule__["a" /* Schedule */]({});
            oneTimeSchedule.startDate = this.thirdFormGroup.get('startDateCtrl').value;
            oneTimeSchedule.endDate = this.thirdFormGroup.get('endDateCtrl').value;
            oneTimeSchedule.startTimeHour = this.thirdFormGroup.get('startTimeHourCtrl').value;
            oneTimeSchedule.startTimeMinute = this.thirdFormGroup.get('startTimeMinuteCtrl').value;
            oneTimeSchedule.endTimeHour = this.thirdFormGroup.get('endTimeHourCtrl').value;
            oneTimeSchedule.endTimeMinute = this.thirdFormGroup.get('endTimeMinuteCtrl').value;
            this.activity.schedules = [];
            this.activity.schedules.push(oneTimeSchedule);
        }
        this.declerateDateForms(-1);
        this.thirdFormGroup.get('schedulesCtrl').setValue(this.activity.schedules);
    };
    ActivityFormComponent.prototype.addOneSchedule = function () {
        this.activity.schedules.push(new __WEBPACK_IMPORTED_MODULE_11_app_models_schedule__["a" /* Schedule */]({}));
        this.declerateDateForms(this.activity.schedules.length - 1);
    };
    ActivityFormComponent.prototype.declerateDateForms = function (i) {
        if (i >= 0) {
            if (this.activity.schedules[i]) {
                this.currentStartDate = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](__WEBPACK_IMPORTED_MODULE_21_moment__(this.activity.schedules[i].start_date).format());
                this.currentStartTimeHour = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](__WEBPACK_IMPORTED_MODULE_21_moment__(this.activity.schedules[i].startTime).hour());
                this.currentStartTimeMinute = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](__WEBPACK_IMPORTED_MODULE_21_moment__(this.activity.schedules[i].startTime).minute());
                this.currentEndDate = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](__WEBPACK_IMPORTED_MODULE_21_moment__(this.activity.schedules[i].end_date).format());
                this.currentEndTimeHour = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](__WEBPACK_IMPORTED_MODULE_21_moment__(this.activity.schedules[i].endTime).hour());
                this.currentEndTimeMinute = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](__WEBPACK_IMPORTED_MODULE_21_moment__(this.activity.schedules[i].endTime).minute());
            }
            this.panelNumber = i;
        }
        else {
            this.currentStartDate = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]();
            this.currentStartTimeHour = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]();
            this.currentStartTimeMinute = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]();
            this.currentEndDate = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]();
            this.currentEndTimeHour = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]();
            this.currentEndTimeMinute = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]();
        }
    };
    ActivityFormComponent.prototype.changeDate = function (i) {
        this.activity.schedules[i].startDate = this.currentStartDate.value;
        this.activity.schedules[i].startTimeHour = this.currentStartTimeHour.value;
        this.activity.schedules[i].startTimeMinute = this.currentStartTimeMinute.value;
        this.activity.schedules[i].endDate = this.currentEndDate.value;
        this.activity.schedules[i].endTimeHour = this.currentEndTimeHour.value;
        this.activity.schedules[i].endTimeMinute = this.currentEndTimeMinute.value;
        this.panelNumber = -1;
    };
    ActivityFormComponent.prototype.removeDateEntry = function (i) {
        if (!this.toDeleteSchedules) {
            this.toDeleteSchedules = [];
            this.thirdFormGroup.get('startDateCtrl').setValue(__WEBPACK_IMPORTED_MODULE_21_moment__());
        }
        this.toDeleteSchedules.push(this.activity.schedules[i]);
        if (i === 0) {
            this.removeCompleteSchedule();
        }
        else {
            this.activity.schedules.splice(i, 1);
        }
    };
    ActivityFormComponent.prototype.removeCompleteSchedule = function () {
        this.toDeleteSchedules = this.activity.schedules;
        this.activity.schedules = [];
        this.thirdFormGroup.get('schedulesCtrl').setValue(this.activity.schedules);
    };
    ActivityFormComponent.prototype.generateTargetGroupArray = function (idArray) {
        var target_groups = [];
        var _loop_1 = function (id) {
            target_groups.push(this_1.targetGroups.find(function (tg) { return tg.id === id; }));
        };
        var this_1 = this;
        for (var _i = 0, idArray_1 = idArray; _i < idArray_1.length; _i++) {
            var id = idArray_1[_i];
            _loop_1(id);
        }
        return new __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["a" /* Observable */](function (observer) { return observer.next(target_groups); });
    };
    ActivityFormComponent.prototype.handleTags = function () {
        var _this = this;
        var observableTagArray = [];
        this.activity.tags = [];
        var tagsArray = this.firstFormGroup.get('tagsCtrl').value.split(',');
        tagsArray.map(function (tagName) {
            var currTag = new __WEBPACK_IMPORTED_MODULE_10_app_models_tag__["a" /* Tag */]();
            currTag.name = tagName;
            observableTagArray.push(_this.tagService.add(currTag));
        });
        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["a" /* Observable */].forkJoin(observableTagArray);
    };
    ActivityFormComponent.prototype.deleteSchedules = function () {
        if (this.toDeleteSchedules) {
            for (var _i = 0, _a = this.toDeleteSchedules; _i < _a.length; _i++) {
                var schedule = _a[_i];
                if (schedule.id) {
                    this.scheduleService.delete(schedule.id).subscribe();
                }
            }
        }
    };
    ActivityFormComponent.prototype.addressSubmit = function () {
        var _this = this;
        var addressObservable = this.addressAutocomplete.getAddress();
        if (addressObservable) {
            addressObservable.subscribe(function (address) {
                _this.activity.address = address;
                _this.activity.address_id = address.id;
                _this.secondFormGroup.get('addressCtrl').setValue(_this.activity.address);
            });
        }
    };
    ActivityFormComponent.prototype.resetAddress = function () {
        this.activity.address = new __WEBPACK_IMPORTED_MODULE_8_app_models_address__["a" /* Address */]();
        this.secondFormGroup.get('addressCtrl').setValue('');
    };
    ActivityFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.activity.provider = null;
        this.activity.category = null;
        this.activity.address = null;
        this.deleteSchedules();
        this.generateTargetGroupArray(this.firstFormGroup.get('targetGroupCtrl').value).
            subscribe(function (targetGroups) {
            _this.activity.target_groups = targetGroups;
        });
        if (this.activity.id) {
            this.activityService.edit(this.activity).subscribe(function () { return _this.back(); });
        }
        else {
            this.activityService.add(this.activity).subscribe(function () { return _this.back(); });
        }
    };
    ActivityFormComponent.prototype.back = function () {
        this.location.back();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('addressAutocompleteComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_18_app_views_admin_addresses_address_autocomplete__["a" /* AddressAutocompleteComponent */])
    ], ActivityFormComponent.prototype, "addressAutocomplete", void 0);
    ActivityFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-form',
            template: __webpack_require__("./app/views/admin/activities/activity.form.html"),
            styles: [__webpack_require__("./app/app.component.css")],
            providers: [
                __WEBPACK_IMPORTED_MODULE_17_app_services_provider_service__["a" /* ProviderService */],
                __WEBPACK_IMPORTED_MODULE_19_app_services_activity_service__["a" /* ActivityService */],
                { provide: __WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["a" /* AddressService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["a" /* AddressService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["j" /* UserService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["j" /* UserService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["h" /* TagService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["h" /* TagService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["i" /* TargetGroupService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["i" /* TargetGroupService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["b" /* CategoryService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["b" /* CategoryService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["f" /* ScheduleService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["f" /* ScheduleService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_23__angular_material_core__["c" /* DateAdapter */], useClass: __WEBPACK_IMPORTED_MODULE_22__angular_material_moment_adapter__["b" /* MomentDateAdapter */], deps: [__WEBPACK_IMPORTED_MODULE_23__angular_material_core__["g" /* MAT_DATE_LOCALE */]] },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_23__angular_material_core__["f" /* MAT_DATE_FORMATS */], useValue: {
                        parse: {
                            dateInput: 'LL',
                        },
                        display: {
                            dateInput: 'LL',
                            monthYearLabel: 'MMM YYYY',
                            dateA11yLabel: 'LL',
                            monthYearA11yLabel: 'MMMM YYYY',
                        },
                    }
                },
            ]
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["j" /* UserService */])),
        __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["a" /* AddressService */])),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["f" /* ScheduleService */])),
        __param(6, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["h" /* TagService */])),
        __param(7, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["i" /* TargetGroupService */])),
        __param(8, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_13_app_services_data_service_factory__["b" /* CategoryService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_23__angular_material_core__["c" /* DateAdapter */],
            __WEBPACK_IMPORTED_MODULE_19_app_services_activity_service__["a" /* ActivityService */],
            __WEBPACK_IMPORTED_MODULE_17_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_15_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_15_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_15_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_15_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_15_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_15_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_16_app_services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_20_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_14_app_services_validation_service__["a" /* ValidationService */]])
    ], ActivityFormComponent);
    return ActivityFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/activities/activity.table.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"activity-container mat-elevation-z8\">\r\n\r\n\t<mat-sidenav-container class=\"example-container\">\r\n\t\t<mat-sidenav #sidenav mode=\"over\">\r\n\t\t\t<button mat-raised-button type=\"button\"\r\n\t\t\t  color=\"accent\" (click)=\"closeDetails()\">\r\n\t\t\t\t{{constants.close}}\r\n\t\t\t</button>\r\n\t\t\t<activity-detail *ngIf=\"currentDetail\"\r\n\t\t\t  [user]=\"currentUser\" [activity]=\"currentDetail\"></activity-detail>\r\n\t\t</mat-sidenav>\r\n\r\n\t\t<mat-sidenav-content>\r\n\t\t\t<div class=\"activities-table-header\">\r\n\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t<input matInput (keyup)=\"handleFiltered($event)\"\r\n\t\t\t\t\t  placeholder=\"Filter\">\r\n\t\t\t\t</mat-form-field>\r\n\t\t\t\t<button mat-button *ngIf=\"showNewButton\"\r\n\t\t\t\t  routerLink='/activity/edit/new'>\r\n\t\t\t\t\t{{ constants.newEntry }}\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\r\n\t\t\t<mat-table #table [dataSource]=\"dataSource\"\r\n\t\t\t  class=\"activity-table\" matSort\r\n\t\t\t  (matSortChange)=\"handleSorted($event)\"\r\n\t\t\t  matSortActive=\"Activities.name\"\r\n\t\t\t  matSortDirection=\"asc\" matSortDisableClear>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"Activities.name\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t\t\t  mat-sort-header>\r\n\t\t\t\t\t\t{{ constants.nameString }} </mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">{{ row.name }}</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"Categories.name\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t\t\t  mat-sort-header>\r\n\t\t\t\t\t\t{{ constants.category }} </mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">{{ row.category.name }}</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"Organisations.name\">\r\n\t\t\t\t\t<mat-header-cell mat-sort-header\r\n\t\t\t\t\t  *matHeaderCellDef>\r\n\t\t\t\t\t\t{{constants.organisation}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">{{row.provider.organisation.name}}\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"tags\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.tags}}</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">\r\n\t\t\t\t\t\t<mat-chip-list>\r\n\t\t\t\t\t\t\t<span *ngFor=\"let tag of row?.tags\">{{tag.name + ' | '}}</span>\r\n\t\t\t\t\t\t</mat-chip-list>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"target_groups\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.targetGroups}}</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">\r\n\t\t\t\t\t\t<mat-chip-list>\r\n\t\t\t\t\t\t\t<mat-chip *ngFor=\"let targetGroup of row?.target_groups\">{{targetGroup.name}}</mat-chip>\r\n\t\t\t\t\t\t</mat-chip-list>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"action\"\r\n\t\t\t\t  *ngIf=\"actionsVisible()\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t\t{{constants.edit}} / {{constants.delete}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t\t<button mat-button color=\"primary\"\r\n\t\t\t\t\t\t  routerLink='/activity/edit/{{row.id}}'>\r\n\t\t\t\t\t\t\t<i class=\"fa fa-pencil-square-o\"\r\n\t\t\t\t\t\t\t  aria-hidden=\"true\"></i>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t<delete-action [recordID]=\"row.id\"\r\n\t\t\t\t\t\t  [nameToDelete]=\"row.name\"\r\n\t\t\t\t\t\t  (onDelete)=\"onDelete($event)\">\r\n\t\t\t\t\t\t</delete-action>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n\t\t\t\t<mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\t\t\t</mat-table>\r\n\r\n\t\t\t<mat-paginator [pageSize]=\"constants.defaultPageSize\"\r\n\t\t\t  [pageSizeOptions]=\"constants.pageSizeOptions\"\r\n\t\t\t  [length]=\"totalCount\" (page)=\"handlePageChanged($event)\">\r\n\t\t\t</mat-paginator>\r\n\t\t</mat-sidenav-content>\r\n\t</mat-sidenav-container>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/activities/activity.table.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_activity_service__ = __webpack_require__("./app/services/activity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_models_activity__ = __webpack_require__("./app/models/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_models_user__ = __webpack_require__("./app/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_models_schedule__ = __webpack_require__("./app/models/schedule.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_views_admin_table_abstract__ = __webpack_require__("./app/views/admin/table.abstract.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_moment__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};














var ActivityTableComponent = (function (_super) {
    __extends(ActivityTableComponent, _super);
    function ActivityTableComponent(authService, dataService, providerService, userService, constants) {
        var _this = _super.call(this, dataService, constants) || this;
        _this.authService = authService;
        _this.dataService = dataService;
        _this.providerService = providerService;
        _this.userService = userService;
        _this.constants = constants;
        _this.providers = [];
        _this.showActions = false;
        _this.showNewButton = false;
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatTableDataSource */]();
        _this.checkNewButton();
        return _this;
    }
    ActivityTableComponent.prototype.checkNewButton = function () {
        var _this = this;
        if (this.actionsVisible()) {
            this.showNewButton = true;
        }
        else {
            var tmpProvs_1 = 0;
            this.providerService
                .getByUser(this.authService.currentUser.id)
                .map(function (data) { return data.records; })
                .subscribe(function (providers) { return providers.map(function (provider) {
                if (provider.approved || _this.showNewButton) {
                    tmpProvs_1++;
                    _this.showNewButton = true;
                }
            }); });
        }
    };
    ActivityTableComponent.prototype.initColumns = function () {
        this.displayedColumns = [
            'Activities.name',
            'Categories.name',
            'Organisations.name',
            'tags',
            'target_groups'
        ];
        if (this.actionsVisible()) {
            this.displayedColumns.push('action');
        }
    };
    ActivityTableComponent.prototype.actionsVisible = function () {
        return this.showActions || this.authService.isSuperUser();
    };
    ActivityTableComponent.prototype.fetchData = function () {
        var _this = this;
        this.providers.length !== 0
            ? this.dataService.getByProviders(this.tableState, this.providers)
                .subscribe(function (data) { return _this.handleResponse(data); })
            : this.dataService.list(this.tableState)
                .subscribe(function (data) { return _this.handleResponse(data); });
    };
    // only showing dates in the future
    ActivityTableComponent.prototype.toString = function (schdules) {
        if (schdules) {
            for (var _i = 0, schdules_1 = schdules; _i < schdules_1.length; _i++) {
                var schedule = schdules_1[_i];
                var currDate = __WEBPACK_IMPORTED_MODULE_13_moment__(schedule.start_date);
                if (currDate.isAfter(__WEBPACK_IMPORTED_MODULE_13_moment__())) {
                    return new __WEBPACK_IMPORTED_MODULE_8_app_models_schedule__["a" /* Schedule */](schedule).toString;
                }
            }
        }
        return this.constants.noFutureDates;
    };
    ActivityTableComponent.prototype.showDetails = function (row) {
        var _this = this;
        if (this.currentDetail && row.id === this.currentDetail.id) {
            this.sidenav.close();
        }
        else {
            this.currentDetail = new __WEBPACK_IMPORTED_MODULE_6_app_models_activity__["a" /* Activity */](row);
            if (this.currentDetail.show_user) {
                this.userService.get(this.currentDetail.provider.user_id).subscribe(function (user) {
                    _this.currentUser = new __WEBPACK_IMPORTED_MODULE_7_app_models_user__["a" /* User */](user.records);
                });
            }
            this.sidenav.open();
        }
    };
    ActivityTableComponent.prototype.closeDetails = function () {
        this.currentDetail = null;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_7_app_models_user__["a" /* User */]();
        this.sidenav.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], ActivityTableComponent.prototype, "providers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ActivityTableComponent.prototype, "showActions", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sidenav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["A" /* MatSidenav */])
    ], ActivityTableComponent.prototype, "sidenav", void 0);
    ActivityTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-table',
            styles: [__webpack_require__("./app/views/admin/table.abstract.css")],
            template: __webpack_require__("./app/views/admin/activities/activity.table.html"),
            providers: [
                __WEBPACK_IMPORTED_MODULE_5_app_services_provider_service__["a" /* ProviderService */], __WEBPACK_IMPORTED_MODULE_4_app_services_activity_service__["a" /* ActivityService */],
                { provide: __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["j" /* UserService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["j" /* UserService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_11_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["j" /* UserService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_11_app_services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_activity_service__["a" /* ActivityService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_9_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_12_app_services_constants__["a" /* Constants */]])
    ], ActivityTableComponent);
    return ActivityTableComponent;
}(__WEBPACK_IMPORTED_MODULE_10_app_views_admin_table_abstract__["a" /* AbstractTableComponent */]));



/***/ }),

/***/ "./app/views/admin/addresses/address.autocomplete.html":
/***/ (function(module, exports) {

module.exports = "<form>\r\n\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t<input matInput name=\"address\" placeholder={{constants.address}} [matAutocomplete]=\"auto\" [formControl]=\"addressCtrl\">\r\n\t\t<mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"toString\">\r\n\t\t\t<mat-option *ngFor=\"let address of filteredAddresses | async\" [value]=\"address\">\r\n\t\t\t\t{{ address.toString }}\r\n\t\t\t</mat-option>\r\n\t\t</mat-autocomplete>\r\n\t</mat-form-field>\r\n</form>\r\n"

/***/ }),

/***/ "./app/views/admin/addresses/address.autocomplete.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressAutocompleteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_services_nominatim__ = __webpack_require__("./app/services/nominatim.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_views_admin_addresses_address_create_form__ = __webpack_require__("./app/views/admin/addresses/address.create.form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_views_admin_dialog_popup_suburb_selection__ = __webpack_require__("./app/views/admin/dialog/popup.suburb.selection.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};














var AddressAutocompleteComponent = (function () {
    function AddressAutocompleteComponent(addressService, constants, suburbSelectDialog, controlAddressDialog, nominatimService, authService) {
        var _this = this;
        this.addressService = addressService;
        this.constants = constants;
        this.suburbSelectDialog = suburbSelectDialog;
        this.controlAddressDialog = controlAddressDialog;
        this.nominatimService = nominatimService;
        this.authService = authService;
        this.addresses = [];
        this.addressService.getAll()
            .map(function (response) { return response.records.map(function (addressJson) { return new __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */](addressJson); }); })
            .subscribe(function (addresses) {
            _this.addresses = addresses;
        });
    }
    AddressAutocompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addressCtrl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */](this.initialAddress);
        this.filteredAddresses = this.addressCtrl.valueChanges
            .startWith([])
            .map(function (address) { return address && typeof address === 'object' ? new __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */](address).toString : address; })
            .map(function (address) { return address ? _this.filterAddresses(address) : _this.addresses.slice(); });
    };
    AddressAutocompleteComponent.prototype.filterAddresses = function (name) {
        return this.addresses.filter(function (address) {
            return address.toString.toLocaleLowerCase().indexOf(name.toLowerCase()) !== -1;
        });
    };
    AddressAutocompleteComponent.prototype.toString = function (address) {
        if (typeof address === 'string') {
            return address;
        }
        if (typeof address === 'object') {
            return new __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */](address).toString;
        }
    };
    AddressAutocompleteComponent.prototype.getAddress = function () {
        var _this = this;
        var addressValue = this.addressCtrl.value;
        if ((addressValue instanceof __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */] && addressValue.isValid()) ||
            (typeof addressValue === 'string' && addressValue.length >= 5)) {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */].create(function (observer) {
                _this.observer = observer;
                typeof addressValue === 'string'
                    ? _this.handleStringValue(addressValue)
                    : _this.handleObjectValue(addressValue);
            });
        }
    };
    AddressAutocompleteComponent.prototype.handleObjectValue = function (addressObj) {
        addressObj.isValid()
            ? this.observer.next(this.addressCtrl.value)
            : this.observer.next(null);
    };
    AddressAutocompleteComponent.prototype.handleStringValue = function (addressString) {
        var _this = this;
        addressString
            ? this.nominatimService.get(this.addressCtrl.value).subscribe(function (data) {
                var nominatimAddress = new __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */](data);
                nominatimAddress.isValid()
                    ? _this.handleNominatimResponse(nominatimAddress)
                    : _this.handleAddressCreation(nominatimAddress);
            })
            : this.observer.next(null);
    };
    AddressAutocompleteComponent.prototype.handleNominatimResponse = function (nominatimAddress) {
        var existingAddress = this.alreadyExits(nominatimAddress);
        existingAddress
            ? this.observer.next(existingAddress)
            : this.setAddress(nominatimAddress);
    };
    AddressAutocompleteComponent.prototype.alreadyExits = function (address) {
        for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
            var currAddress = _a[_i];
            if (currAddress.compareTo(address)) {
                return currAddress;
            }
        }
        return null;
    };
    AddressAutocompleteComponent.prototype.handleAddressCreation = function (address) {
        var _this = this;
        this.createAddress(address).subscribe(function (addressResponse) {
            var responseAddress = new __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */](addressResponse);
            if (responseAddress.isValid()) {
                _this.setAddress(responseAddress);
            }
        });
    };
    AddressAutocompleteComponent.prototype.setAddress = function (address) {
        var _this = this;
        this.getSuburb(address).subscribe(function (suburb) {
            address.suburb_id = suburb.id;
            address.suburb = null;
            _this.saveAddress(address);
        });
    };
    AddressAutocompleteComponent.prototype.saveAddress = function (address) {
        var _this = this;
        this.addressService.add(address)
            .map(function (response) { return new __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */](response.records); })
            .subscribe(function (savedAddress) {
            _this.observer.next(savedAddress);
        });
    };
    AddressAutocompleteComponent.prototype.createAddress = function (address) {
        var dialogRef = this.controlAddressDialog.open(__WEBPACK_IMPORTED_MODULE_11_app_views_admin_addresses_address_create_form__["a" /* AddressCreateFormComponent */], {
            disableClose: true,
            width: '80%',
            data: {
                message: 'Sie können die eingegebene Addresse hier ändern:',
                address: address,
            }
        });
        return dialogRef.afterClosed();
    };
    AddressAutocompleteComponent.prototype.getSuburb = function (address) {
        var dialogRef = this.suburbSelectDialog.open(__WEBPACK_IMPORTED_MODULE_13_app_views_admin_dialog_popup_suburb_selection__["a" /* SuburbSelectionComponent */], {
            disableClose: true,
            width: '250px',
            data: {
                message: 'Sie haben eine neue Adresse eingegeben. Bitte geben Sie den entsprechenden Stadtteil ein.'
                    + address.toString,
                address: address
            }
        });
        return dialogRef.afterClosed();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_app_models_address__["a" /* Address */])
    ], AddressAutocompleteComponent.prototype, "initialAddress", void 0);
    AddressAutocompleteComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'address-autocomplete-form',
            template: __webpack_require__("./app/views/admin/addresses/address.autocomplete.html"),
            styles: [__webpack_require__("./app/app.component.css")],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["a" /* AddressService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["a" /* AddressService */]), deps: [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        })
        /*
            TODO: Processing is not save! Needs check and let observer give null values
        */
        ,
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["a" /* AddressService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_12_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["l" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["l" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_10_app_services_nominatim__["a" /* NominatimService */],
            __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__["a" /* AuthenticationService */]])
    ], AddressAutocompleteComponent);
    return AddressAutocompleteComponent;
}());



/***/ }),

/***/ "./app/views/admin/addresses/address.create.form.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t{{data.message}}\r\n\t<form #addressForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" class=\"well\">\r\n\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"text\" required [(ngModel)]=\"address.street\" placeholder={{constants.street}} name=\"street\" value={{address.street}}\r\n\t\t\t id=\"address_street_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"text\" [(ngModel)]=\"address.house_number\" placeholder={{constants.houseNumber}} name=\"houseNumber\" value={{address.house_number}}\r\n\t\t\t id=\"address_house_number_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=text [(ngModel)]=\"address.postal_code\" placeholder={{constants.postalCode}} name=\"postal_code\" value={{address.postal_code}}\r\n\t\t\t id=\"address_postal_code_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"text\" required [(ngModel)]=\"address.place\" placeholder={{constants.place}} name=\"place\" value={{address.place}}\r\n\t\t\t id=\"address_place_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"number\" required [(ngModel)]=\"address.latitude\" placeholder={{constants.latitude}} name=\"latitude\"\r\n\t\t\t value={{address.latitude}} id=\"address_latitude_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"number\" required [(ngModel)]=\"address.longitude\" placeholder={{constants.longitude}} name=\"longitude\"\r\n\t\t\t value={{address.longitude}} id=\"address_longitude_field\">\r\n\t\t</mat-form-field>\r\n\t\t<button mat-raised-button (click)=\"onSubmit()\" [disabled]=\"addressForm.invalid\">{{constants.ok}}</button>\r\n\t\t<button mat-raised-button color=\"warn\" (click)=\"cancel()\">{{constants.cancel}}</button>\r\n\t</form>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/addresses/address.create.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressCreateFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AddressCreateFormComponent = (function () {
    function AddressCreateFormComponent(constants, dialogRef, validation, data) {
        this.constants = constants;
        this.dialogRef = dialogRef;
        this.validation = validation;
        this.data = data;
        this.address = this.data.address;
    }
    AddressCreateFormComponent.prototype.onNoClick = function () {
    };
    AddressCreateFormComponent.prototype.cancel = function () {
        this.dialogRef.close(null);
    };
    AddressCreateFormComponent.prototype.onSubmit = function () {
        this.dialogRef.close(this.address);
    };
    AddressCreateFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./app/views/admin/addresses/address.create.form.html"),
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_2_app_services_validation_service__["a" /* ValidationService */], Object])
    ], AddressCreateFormComponent);
    return AddressCreateFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/addresses/address.form.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"address\">\r\n\t<form #addressForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" class=\"well\">\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"text\" required [(ngModel)]=\"address.street\" placeholder={{constants.street}} name=\"street\" value={{address.street}}\r\n\t\t\t id=\"address_street_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"text\" [(ngModel)]=\"address.house_number\" placeholder={{constants.houseNumber}} name=\"houseNumber\" value={{address.house_number}}\r\n\t\t\t id=\"address_house_number_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=text [(ngModel)]=\"address.postal_code\" placeholder={{constants.postalCode}} name=\"postal_code\" value={{address.postal_code}}\r\n\t\t\t id=\"address_postal_code_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"text\" required [(ngModel)]=\"address.place\" placeholder={{constants.place}} name=\"place\" value={{address.place}}\r\n\t\t\t id=\"address_place_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"number\" required [(ngModel)]=\"address.latitude\" placeholder={{constants.latitude}} name=\"latitude\"\r\n\t\t\t value={{address.latitude}} id=\"address_latitude_field\">\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t<input matInput type=\"number\" required [(ngModel)]=\"address.longitude\" placeholder={{constants.longitude}} name=\"longitude\"\r\n\t\t\t value={{address.longitude}} id=\"address_longitude_field\">\r\n\t\t</mat-form-field>\r\n\t\t<div *ngIf=\"address.suburb && address.suburb.name\">{{address.suburb.name + ' '}}\r\n\t\t\t<i (click)=\"resetSuburb()\" class=\"fa fa-trash-o\" aria-hidden=\"true\" style=\"color:red;\"></i>\r\n\t\t</div>\r\n\t\t<mat-form-field *ngIf=\"!address.suburb\">\r\n\t\t\t<mat-select name=\"suburb\" placeholder={{constants.quarter}} [(ngModel)]=\"address.suburb\">\r\n\t\t\t\t<mat-option *ngFor=\"let suburb of suburbs\" [value]=\"suburb\">{{suburb.name}}</mat-option>\r\n\t\t\t</mat-select>\r\n\t\t</mat-form-field>\r\n\t\t<button mat-raised-button (click)=\"onSubmit()\">{{constants.ok}}</button>\r\n\t\t<button mat-raised-button color=\"warn\" type=\"button\" (click)=\"back()\">{{constants.cancel}}</button>\r\n\t</form>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/addresses/address.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var AddressFormComponent = (function () {
    function AddressFormComponent(location, constants, validation, route, addressService, suburbService) {
        this.location = location;
        this.constants = constants;
        this.validation = validation;
        this.route = route;
        this.addressService = addressService;
        this.suburbService = suburbService;
    }
    AddressFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            return _this.addressService.get(params.get('id'));
        }).subscribe(function (address) { return _this.address = new __WEBPACK_IMPORTED_MODULE_8_app_models_address__["a" /* Address */](address.records); });
        this.suburbService.getAll().subscribe(function (response) { return _this.suburbs = response.records; });
    };
    AddressFormComponent.prototype.resetSuburb = function () {
        this.address.suburb = null;
    };
    AddressFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.addressService.edit(this.address).subscribe(function () { return _this.back(); });
    };
    AddressFormComponent.prototype.back = function () {
        this.location.back();
    };
    AddressFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./app/views/admin/addresses/address.form.html"),
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["a" /* AddressService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["a" /* AddressService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["g" /* SuburbService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["g" /* SuburbService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5_app_services_authentication_service__["a" /* AuthenticationService */]] },
            ]
        }),
        __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["a" /* AddressService */])),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7_app_services_data_service_factory__["g" /* SuburbService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_9_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_6_app_services_validation_service__["a" /* ValidationService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__["a" /* DataService */]])
    ], AddressFormComponent);
    return AddressFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/addresses/address.table.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"address-container mat-elevation-z8\">\r\n\r\n\t<div class=\"addresses-table-header\">\r\n\t\t<mat-form-field>\r\n\t\t\t<input matInput (keyup)=\"handleFiltered($event)\"\r\n\t\t\t  placeholder=\"Filter\">\r\n\t\t</mat-form-field>\r\n\t</div>\r\n\r\n\t<mat-table #table [dataSource]=\"dataSource\"\r\n\t  class=\"address-table\" matSort\r\n\t  (matSortChange)=\"handleSorted($event)\"\r\n\t  matSortActive=\"Addresses.street\"\r\n\t  matSortDirection=\"asc\" matSortDisableClear>\r\n\r\n\t\t<ng-container matColumnDef=\"Addresses.street\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t  mat-sort-header>\r\n\t\t\t\t{{constants.street}}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">{{row.street}}</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"Addresses.house_number\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t{{ constants.houseNumber }}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.house_number }}</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"Addresses.postal_code\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t  mat-sort-header>\r\n\t\t\t\t{{constants.postalCode}}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.postal_code }}</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"Addresses.place\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t  mat-sort-header>\r\n\t\t\t\t{{constants.place}}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.place }}</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"Suburbs.name\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t  mat-sort-header>\r\n\t\t\t\t{{constants.quarter}}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.suburb.name }}</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"Addresses.latitude\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t  mat-sort-header>\r\n\t\t\t\t{{constants.latitude}}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.latitude }}</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"Addresses.longitude\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t  mat-sort-header>\r\n\t\t\t\t{{constants.longitude}}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.longitude }}</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"action\">\r\n\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t{{constants.edit}} / {{constants.delete}}\r\n\t\t\t</mat-header-cell>\r\n\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t<button mat-button color=\"primary\"\r\n\t\t\t\t  routerLink='/address/edit/{{row.id}}'>\r\n\t\t\t\t\t<i class=\"fa fa-pencil-square-o\"\r\n\t\t\t\t\t  aria-hidden=\"true\"></i>\r\n\t\t\t\t</button>\r\n\t\t\t\t<delete-action [recordID]=\"row.id\"\r\n\t\t\t\t  [nameToDelete]=\"row.name\" (onDelete)=\"onDelete($event)\">\r\n\t\t\t\t</delete-action>\r\n\t\t\t</mat-cell>\r\n\t\t</ng-container>\r\n\r\n\t\t<mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n\t\t<mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\t</mat-table>\r\n\r\n\t<mat-paginator [pageSize]=\"constants.defaultPageSize\"\r\n\t  [pageSizeOptions]=\"constants.pageSizeOptions\"\r\n\t  [length]=\"totalCount\" (page)=\"handlePageChanged($event)\">\r\n\t</mat-paginator>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/addresses/address.table.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_views_admin_table_abstract__ = __webpack_require__("./app/views/admin/table.abstract.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var AddressTableComponent = (function (_super) {
    __extends(AddressTableComponent, _super);
    function AddressTableComponent(authService, dataService, constants) {
        var _this = _super.call(this, dataService, constants) || this;
        _this.authService = authService;
        _this.dataService = dataService;
        _this.constants = constants;
        _this.providers = [];
        _this.showActions = false;
        _this.showNewButton = false;
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatTableDataSource */]();
        return _this;
    }
    AddressTableComponent.prototype.initColumns = function () {
        this.displayedColumns = [
            'Addresses.street',
            'Addresses.house_number',
            'Addresses.postal_code',
            'Addresses.place',
            'Suburbs.name',
            'Addresses.latitude',
            'Addresses.longitude',
            'action'
        ];
    };
    AddressTableComponent.prototype.newAddress = function () {
    };
    AddressTableComponent.prototype.editAddress = function (row) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], AddressTableComponent.prototype, "providers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AddressTableComponent.prototype, "showActions", void 0);
    AddressTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'address-table',
            styles: [__webpack_require__("./app/views/admin/table.abstract.css")],
            template: __webpack_require__("./app/views/admin/addresses/address.table.html"),
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["a" /* AddressService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["a" /* AddressService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["a" /* AddressService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_7_app_services_constants__["a" /* Constants */]])
    ], AddressTableComponent);
    return AddressTableComponent;
}(__WEBPACK_IMPORTED_MODULE_5_app_views_admin_table_abstract__["a" /* AbstractTableComponent */]));



/***/ }),

/***/ "./app/views/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminComponent = (function () {
    function AdminComponent(location, router, constants, authService) {
        this.location = location;
        this.router = router;
        this.constants = constants;
        this.authService = authService;
        this.routeLinks = [];
        this.activeLinkIndex = 0;
        this.initUserTabs();
        if (this.authService.isOrganisationAdmin()) {
            this.initOrganisationAdmin();
        }
        if (this.authService.isSuperUser()) {
            this.initSuperUserTabs();
        }
    }
    AdminComponent.prototype.initUserTabs = function () {
        this.routeLinks.push({
            label: this.constants.activities,
            link: ['/admin', { outlets: { table: ['activities'] } }],
            index: 0
        });
        this.routeLinks.push({
            label: this.constants.organisations,
            link: ['/admin', { outlets: { table: ['organisations'] } }],
            index: 1
        });
        this.routeLinks.push({
            label: this.constants.account,
            link: ['/admin', { outlets: { table: ['account'] } }],
            index: 2
        });
    };
    AdminComponent.prototype.initOrganisationAdmin = function () {
        this.routeLinks.push({
            label: this.constants.organisationAdmin,
            link: ['/admin', { outlets: { table: ['organisation-admin', 'from-nav'] } }],
            index: 3
        });
    };
    AdminComponent.prototype.initSuperUserTabs = function () {
        this.routeLinks.push({
            label: this.constants.userManagement,
            link: ['/admin', { outlets: { table: ['users'] } }],
            index: 4
        });
        this.routeLinks.push({
            label: this.constants.addressManagement,
            link: ['/admin', { outlets: { table: ['addresses'] } }],
            index: 5
        });
        this.routeLinks.push({
            label: this.constants.configuration,
            link: ['/admin', { outlets: { table: ['configurations'] } }],
            index: 6
        });
    };
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function () {
            _this.activeLinkIndex = _this.routeLinks.indexOf(_this.routeLinks.find(function (tab) { return tab.link === '.' + _this.router.url; }));
        });
    };
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./app/views/admin/admin.html"),
            styles: [__webpack_require__("./app/app.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_authentication_service__["a" /* AuthenticationService */]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./app/views/admin/admin.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"padding: 5px;\">\r\n\t<nav mat-tab-nav-bar>\r\n\t\t<a mat-tab-link *ngFor=\"let routeLink of routeLinks; let i = index;\"\r\n\t\t  [routerLink]=\"routeLink.link\"\r\n\t\t  routerLinkActive #rla=\"routerLinkActive\"\r\n\t\t  [active]=\"rla.isActive\" (click)=\"activeLinkIndex = i\"\r\n\t\t  [routerLinkActiveOptions]=\"{exact: true}\">\r\n\t\t\t{{routeLink.label}}\r\n\t\t</a>\r\n\t</nav>\r\n\t<router-outlet name='table'></router-outlet>\r\n</div>\r\n<div id=\"temp-footer\">\r\n\tProblem/Anregungen hier melden:\r\n\t<a target=\"_blank\" href=\"https://github.com/codeschluss/wupportal/issues\">https://github.com/codeschluss/wupportal/issues</a>\r\n\toder an info@codeschluss.de\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/configs/config.form.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"edit-container\">\r\n\t<h2>{{ constants.configuration }}\r\n\t\t<span style=\"color:red;  font-size: large;\">{{ constants.warning + ' ' + constants.configWarning}} </span>\r\n\t</h2>\r\n\t<form #configForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\t\t<mat-grid-list cols=\"3\" rowHeight=\"100px\">\r\n\t\t\t<div *ngFor=\"let config of configurations;let i = index\">\r\n\t\t\t\t<mat-grid-tile colspan=\"1\" rowspan=\"1\">\r\n\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t<input matInput type=\"text\" name=\"config.{{i}}.value\" [(ngModel)]=config.value placeholder={{constants[config.item]}} required/>\r\n\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t</mat-grid-tile>\r\n\t\t\t</div>\r\n\t\t</mat-grid-list>\r\n\t\t<button mat-raised-button [disabled]=\"!configForm.form.valid\" color=\"primary\" type=\"submit\">{{constants.save}}</button>\r\n\t\t<button mat-raised-button color=\"warn\" type=\"button\" (click)=\"back()\">{{constants.cancel}}</button>\r\n\t</form>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/configs/config.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









// @Author: Pseipel
var ConfigFormComponent = (function () {
    function ConfigFormComponent(location, constants, configurationService) {
        this.location = location;
        this.constants = constants;
        this.configurationService = configurationService;
    }
    ConfigFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configurationService.getAll().subscribe(function (configs) { _this.configurations = configs.records; });
    };
    ConfigFormComponent.prototype.mergeConfigs = function () {
        var _this = this;
        var observableConfigArray = [];
        this.configurations.map(function (config) {
            return observableConfigArray.push(_this.configurationService.edit(config));
        });
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */].forkJoin(observableConfigArray);
    };
    ConfigFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.mergeConfigs().subscribe(function () { return _this.back(); });
    };
    ConfigFormComponent.prototype.back = function () {
        this.location.back();
    };
    ConfigFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'config-form',
            template: __webpack_require__("./app/views/admin/configs/config.form.html"),
            styles: [__webpack_require__("./app/app.component.css")],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__["c" /* ConfigurationService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_8__services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__["c" /* ConfigurationService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_app_services_authentication_service__["a" /* AuthenticationService */]] },
            ]
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__["c" /* ConfigurationService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_6_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_7_app_services_data_service__["a" /* DataService */]])
    ], ConfigFormComponent);
    return ConfigFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/dialog/delete.dialog.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var DeleteDialogComponent = (function () {
    function DeleteDialogComponent(constants, dialogRef, data) {
        this.constants = constants;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DeleteDialogComponent.prototype.onDelete = function () {
        this.dialogRef.close(true);
    };
    DeleteDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close(false);
    };
    DeleteDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: "\n\t<div>{{data.message}}</div>\n\t<h3> {{data.name}} </h3>\n\t<button mat-raised-button color=\"warn\"\n  \t(click)=\"onDelete()\">{{constants.delete}}</button>\n\t<button mat-raised-button (click)=\"onCancel()\">{{constants.cancel}}</button>"
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatDialogRef */], Object])
    ], DeleteDialogComponent);
    return DeleteDialogComponent;
}());



/***/ }),

/***/ "./app/views/admin/dialog/organisation-selection.dialog.html":
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSelect()\">\r\n\t<h3>\r\n\t\t{{constants.multipleOrganisationMessage}}\r\n\t</h3>\r\n\t<div>{{constants.pleaseSelectMessage}}</div>\r\n\t<mat-form-field>\r\n\t\t<mat-select placeholder={{constants.organisations}}\r\n\t\t  [(ngModel)]=\"selectedOrgaID\"\r\n\t\t  name=\"selectedOrganisation\">\r\n\t\t\t<mat-option *ngFor=\"let organisation of data.organisations\"\r\n\t\t\t  [value]=\"organisation.id\">\r\n\t\t\t\t{{organisation.name}}\r\n\t\t\t</mat-option>\r\n\t\t</mat-select>\r\n\t</mat-form-field>\r\n\t<button mat-raised-button type=\"submit\"\r\n\t  color=\"primary\">{{constants.select}}</button>\r\n\t<button mat-raised-button type=\"button\"\r\n\t  (click)=\"onCancel()\">{{constants.back}}</button>\r\n</form>\r\n"

/***/ }),

/***/ "./app/views/admin/dialog/organisation-selection.dialog.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganisationSelectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var OrganisationSelectionComponent = (function () {
    function OrganisationSelectionComponent(constants, dialogRef, data) {
        this.constants = constants;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    OrganisationSelectionComponent.prototype.onSelect = function () {
        this.dialogRef.close(this.selectedOrgaID);
    };
    OrganisationSelectionComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    OrganisationSelectionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./app/views/admin/dialog/organisation-selection.dialog.html")
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatDialogRef */], Object])
    ], OrganisationSelectionComponent);
    return OrganisationSelectionComponent;
}());



/***/ }),

/***/ "./app/views/admin/dialog/popup.suburb.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t{{data.message}}\r\n\t<mat-form-field>\r\n\t\t<mat-select name=\"suburb\" placeholder={{constants.quarter}} [(ngModel)]=\"suburb\" [(value)]=\"suburb\">\r\n\t\t\t<mat-option *ngFor=\"let suburb of suburbs\" [value]=\"suburb\">{{suburb.name}}</mat-option>\r\n\t\t</mat-select>\r\n\t</mat-form-field>\r\n</div>\r\n<button mat-raised-button (click)=\"onSubmit()\">ok</button>\r\n"

/***/ }),

/***/ "./app/views/admin/dialog/popup.suburb.selection.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuburbSelectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var SuburbSelectionComponent = (function () {
    function SuburbSelectionComponent(constants, service, dialogRef, data) {
        var _this = this;
        this.constants = constants;
        this.service = service;
        this.dialogRef = dialogRef;
        this.data = data;
        if (data.address && data.address.suburb) {
            this.suburb = data.address.suburb;
        }
        this.service.getAll().subscribe(function (response) { return _this.suburbs = response.records; });
    }
    SuburbSelectionComponent.prototype.onSubmit = function () {
        this.dialogRef.close(this.suburb);
    };
    SuburbSelectionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./app/views/admin/dialog/popup.suburb.html"),
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["g" /* SuburbService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["g" /* SuburbService */]), deps: [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["g" /* SuburbService */])),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatDialogRef */], Object])
    ], SuburbSelectionComponent);
    return SuburbSelectionComponent;
}());



/***/ }),

/***/ "./app/views/admin/login/login.form.css":
/***/ (function(module, exports) {

module.exports = "/* #login-form {\r\n\tmargin: 0 auto;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n} */\r\n"

/***/ }),

/***/ "./app/views/admin/login/login.form.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n\t<mat-card-header>\r\n\t\t<h2>{{constants.loginTitle}}</h2>\r\n\t</mat-card-header>\r\n\t<form id=\"login-form\" #loginForm=\"ngForm\"\r\n\t  (ngSubmit)=\"login()\">\r\n\t\t<mat-form-field class=\"example-full-width\">\r\n\t\t\t<input matInput placeholder={{constants.mail}}\r\n\t\t\t  [(ngModel)]=\"username\" type=\"text\"\r\n\t\t\t  name=\"userName\" required />\r\n\t\t</mat-form-field>\r\n\t\t<mat-form-field class=\"example-full-width\">\r\n\t\t\t<input matInput placeholder={{constants.password}}\r\n\t\t\t  [(ngModel)]=\"password\" type=\"password\"\r\n\t\t\t  name=\"password\" required />\r\n\t\t</mat-form-field>\r\n\t\t<button mat-raised-button color=\"primary\"\r\n\t\t  [disabled]=\"loginForm.invalid\"\r\n\t\t  type=\"submit\">{{constants.login}}</button>\r\n\t\t<button mat-raised-button color=\"accent\"\r\n\t\t  type=\"button\" routerLink='/register'>{{constants.register}}</button>\r\n\t</form>\r\n\t<mat-error *ngIf=\"error\">\r\n\t\t{{error}}\r\n\t</mat-error>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/login/login.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginFormComponent = (function () {
    function LoginFormComponent(location, router, route, authenticationService, constants) {
        this.location = location;
        this.router = router;
        this.route = route;
        this.authenticationService = authenticationService;
        this.constants = constants;
        this.username = '';
        this.password = '';
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        this.authenticationService.logout();
    };
    LoginFormComponent.prototype.login = function () {
        var _this = this;
        this.authenticationService.login(this.username, this.password)
            .subscribe(function (result) {
            if (result) {
                _this.router.navigate(['/admin']);
            }
            else {
                _this.error = _this.constants.wrongCredentialsMessage;
            }
        });
    };
    LoginFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./app/views/admin/login/login.form.html"),
            styles: [__webpack_require__("./app/views/admin/login/login.form.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3_app_services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_constants__["a" /* Constants */]])
    ], LoginFormComponent);
    return LoginFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/organisations/organisation.admin.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-container\">\r\n\t<mat-card class=\"organisation-edit-card\"\r\n\t  *ngIf=\"organisation && approvedProviders && notApprovedProviders\">\r\n\t\t<mat-card-header>\r\n\t\t\t<h2>{{organisation.name}}</h2>\r\n\t\t</mat-card-header>\r\n\t\t<mat-tab-group>\r\n\t\t\t<mat-tab label={{constants.coreData}}>\r\n\t\t\t\t<!-- Core data -->\r\n\t\t\t\t<organisation-update [organisation]=\"organisation\">\r\n\t\t\t\t</organisation-update>\r\n\t\t\t</mat-tab>\r\n\t\t\t<mat-tab label={{constants.user}}>\r\n\t\t\t\t<!-- Provider user list -->\r\n\t\t\t\t<button type=\"button\" mat-button\r\n\t\t\t\t  color=\"primary\" (click)=\"switch()\">{{switchButtonLabel()}}\r\n\t\t\t\t</button>\r\n\t\t\t\t<div *ngIf=\"showRequests\">\r\n\t\t\t\t\t<provider-approval-table [providers]=\"notApprovedProviders\"\r\n\t\t\t\t\t  (onApproved)=\"onApproved($event)\">\r\n\t\t\t\t\t</provider-approval-table>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div *ngIf=\"!showRequests\">\r\n\t\t\t\t\t<provider-table [providers]=\"approvedProviders\">\r\n\t\t\t\t\t</provider-table>\r\n\t\t\t\t</div>\r\n\t\t\t</mat-tab>\r\n\t\t\t<mat-tab label={{constants.activities}}>\r\n\t\t\t\t<!-- Provider activity list -->\r\n\t\t\t\t<mat-card>\r\n\t\t\t\t\t<mat-card-header>\r\n\t\t\t\t\t\t<mat-card-title>\r\n\t\t\t\t\t\t\t<h2>{{constants.activities}}</h2>\r\n\t\t\t\t\t\t</mat-card-title>\r\n\t\t\t\t\t</mat-card-header>\r\n\t\t\t\t\t<mat-card-content>\r\n\t\t\t\t\t\t<activity-table [showActions]=\"true\"\r\n\t\t\t\t\t\t  [providers]=\"getProviderIDs()\">\r\n\t\t\t\t\t\t</activity-table>\r\n\t\t\t\t\t</mat-card-content>\r\n\t\t\t\t</mat-card>\r\n\t\t\t</mat-tab>\r\n\t\t</mat-tab-group>\r\n\t</mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/organisations/organisation.admin.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganisationAdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_models_organisation__ = __webpack_require__("./app/models/organisation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_views_admin_provider_provider_table__ = __webpack_require__("./app/views/admin/provider/provider.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_views_admin_dialog_organisation_selection_dialog__ = __webpack_require__("./app/views/admin/dialog/organisation-selection.dialog.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var OrganisationAdminComponent = (function () {
    function OrganisationAdminComponent(organisationService, providerService, authService, constants, selectOrgaDialog, location, route) {
        this.organisationService = organisationService;
        this.providerService = providerService;
        this.authService = authService;
        this.constants = constants;
        this.selectOrgaDialog = selectOrgaDialog;
        this.location = location;
        this.route = route;
        this.showRequests = false;
    }
    OrganisationAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .forEach(function (params) {
            return params.get('id') === 'from-nav'
                ? _this.handleFromNavigation()
                : _this.setOrganisationAndProviders(params.get('id'));
        });
    };
    OrganisationAdminComponent.prototype.handleFromNavigation = function () {
        var _this = this;
        this.authService.isSuperUser()
            ? this.organisationService
                .getAll()
                .map(function (data) { return data.records; })
                .subscribe(function (organisations) {
                _this.handleRequestedOrganisations(organisations);
            })
            : this.providerService
                .getByUser(this.authService.currentUser.id, true)
                .map(function (data) { return data.records.map(function (provider) { return provider.organisation; }); })
                .subscribe(function (adminOrganisations) {
                _this.handleRequestedOrganisations(adminOrganisations);
            });
    };
    OrganisationAdminComponent.prototype.handleRequestedOrganisations = function (organisations) {
        organisations.length > 1
            ? this.selectOrganisation(organisations)
            : this.setOrganisationAndProviders(organisations.shift().id);
    };
    OrganisationAdminComponent.prototype.selectOrganisation = function (organisations) {
        var _this = this;
        var dialogRef = this.selectOrgaDialog.open(__WEBPACK_IMPORTED_MODULE_12_app_views_admin_dialog_organisation_selection_dialog__["a" /* OrganisationSelectionComponent */], {
            data: {
                organisations: organisations
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            result
                ? _this.setOrganisationAndProviders(result)
                : _this.location.back();
        });
    };
    OrganisationAdminComponent.prototype.setOrganisationAndProviders = function (organisationID) {
        var _this = this;
        this.getOrganisation(organisationID)
            .subscribe(function (organisation) {
            _this.organisation = organisation;
            _this.setProviders();
        });
    };
    OrganisationAdminComponent.prototype.getOrganisation = function (organisationID) {
        return this.organisationService.get(organisationID)
            .map(function (data) { return new __WEBPACK_IMPORTED_MODULE_9_app_models_organisation__["a" /* Organisation */](data.records); });
    };
    OrganisationAdminComponent.prototype.setProviders = function () {
        var _this = this;
        this.providerService
            .getByOrganisation(this.organisation.id)
            .map(function (data) { return data.records; })
            .subscribe(function (providers) {
            _this.organisationProviders = providers;
            _this.setDataForProviderTables();
            _this.switch();
        });
    };
    OrganisationAdminComponent.prototype.setDataForProviderTables = function () {
        var _this = this;
        this.notApprovedProviders = [];
        this.approvedProviders = [];
        this.organisationProviders
            .forEach(function (provider) {
            provider.approved
                ? _this.approvedProviders.push(provider)
                : _this.notApprovedProviders.push(provider);
        });
    };
    OrganisationAdminComponent.prototype.switch = function () {
        this.showRequests = !this.showRequests;
    };
    OrganisationAdminComponent.prototype.switchButtonLabel = function () {
        return this.showRequests
            ? this.constants.showMembers
            : this.constants.showRequests;
    };
    OrganisationAdminComponent.prototype.onApproved = function () {
        this.setProviders();
    };
    OrganisationAdminComponent.prototype.getProviderIDs = function () {
        return this.organisationProviders
            .map(function (provider) { return provider.id; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_11_app_views_admin_provider_provider_table__["a" /* ProviderTableComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_11_app_views_admin_provider_provider_table__["a" /* ProviderTableComponent */])
    ], OrganisationAdminComponent.prototype, "providerTable", void 0);
    OrganisationAdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'organisation-admin',
            template: __webpack_require__("./app/views/admin/organisations/organisation.admin.html"),
            styles: [__webpack_require__("./app/app.component.css")],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__["e" /* OrganisationService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__["e" /* OrganisationService */]), deps: [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5_app_services_data_service_factory__["e" /* OrganisationService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_8_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_10_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["l" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]])
    ], OrganisationAdminComponent);
    return OrganisationAdminComponent;
}());



/***/ }),

/***/ "./app/views/admin/organisations/organisation.detail.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"organisation\">\r\n\t<mat-card-header>\r\n\t\t<mat-card-title>\r\n\t\t\t<h3>{{constants.coreData}}</h3>\r\n\t\t</mat-card-title>\r\n\t</mat-card-header>\r\n\t<mat-card-content>\r\n\t\t<div>{{constants.title}} :\r\n\t\t\t<b>{{organisation.name}}</b>\r\n\t\t</div>\r\n\t\t<div>{{constants.description}} :\r\n\t\t\t<b>{{organisation.description}}</b>\r\n\t\t</div>\r\n\r\n\t\t<div>{{constants.website}} :\r\n\t\t\t<b>{{organisation.website}}</b>\r\n\t\t</div>\r\n\t\t<div>{{constants.mail}} :\r\n\t\t\t<b>{{organisation.mail}}</b>\r\n\t\t</div>\r\n\t\t<div>{{constants.phone}} :\r\n\t\t\t<b>{{organisation.phone}}</b>\r\n\t\t</div>\r\n\t\t<div>{{constants.address}} :\r\n\t\t\t<b>{{organisation.address.toString}}</b>\r\n\t\t</div>\r\n\t</mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/organisations/organisation.detail.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganisationDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_models_organisation__ = __webpack_require__("./app/models/organisation.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrganisationDetailComponent = (function () {
    function OrganisationDetailComponent(constants) {
        this.constants = constants;
    }
    OrganisationDetailComponent.prototype.ngOnChanges = function (changes) {
        var organisation = changes.organisation;
        this.organisation = organisation.currentValue;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_app_models_organisation__["a" /* Organisation */])
    ], OrganisationDetailComponent.prototype, "organisation", void 0);
    OrganisationDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'organisation-detail',
            template: __webpack_require__("./app/views/admin/organisations/organisation.detail.html"),
            styles: [__webpack_require__("./app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_services_constants__["a" /* Constants */]])
    ], OrganisationDetailComponent);
    return OrganisationDetailComponent;
}());



/***/ }),

/***/ "./app/views/admin/organisations/organisation.form.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-container\" *ngIf=\"organisation\">\r\n\t<mat-card class=\"organisation-edit-card\">\r\n\t\t<form #organisationForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" class=\"well\">\r\n\t\t\t<mat-horizontal-stepper linear=\"true\">\r\n\t\t\t\t<mat-step [stepControl]=\"firstFormGroup\">\r\n\t\t\t\t\t<form [formGroup]=\"firstFormGroup\">\r\n\t\t\t\t\t\t<ng-template matStepLabel>{{constants.coreData}}</ng-template>\r\n\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t<input matInput type=text formControlName=\"nameCtrl\" placeholder={{constants.nameString}} name=\"name\" value={{organisation.name}}\r\n\t\t\t\t\t\t\t required [errorStateMatcher]=\"validation\" id=\"orga_name_field\">\r\n\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t<textarea matInput type=text formControlName=\"descriptionCtrl\" placeholder={{constants.description}} name=\"description\" value={{organisation.description}}\r\n\t\t\t\t\t\t\t id=\"orga_description_field\"></textarea>\r\n\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t<input matInput type=\"email\" formControlName=\"mailCtrl\" placeholder={{constants.mail}} name=\"mail\" value={{organisation.mail}}\r\n\t\t\t\t\t\t\t id=\"orga_mail_field\">\r\n\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t<input matInput type=text formControlName=\"phoneCtrl\" placeholder={{constants.phone}} name=\"telephone\" value={{organisation.phone}}\r\n\t\t\t\t\t\t\t id=\"orga_phone_field\">\r\n\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t<input matInput type=text formControlName=\"webSiteCtrl\" placeholder={{constants.website}} name=\"website\" id=\"orga_website_field\"\r\n\t\t\t\t\t\t\t value={{organisation.website}}>\r\n\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<button type=\"button\" [disabled]=\"firstFormGroup.invalid\" mat-raised-button color=\"primary\" matStepperNext>{{constants.next}}</button>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</mat-step>\r\n\t\t\t\t<mat-step [stepControl]=\"secondFormGroup\">\r\n\t\t\t\t\t<ng-template matStepLabel>{{constants.address}}</ng-template>\r\n\t\t\t\t\t<form [formGroup]=\"secondFormGroup\">\r\n\t\t\t\t\t\t<mat-card class=\"address-card\" *ngIf=\"organisation.address\">\r\n\t\t\t\t\t\t\t<div *ngIf=\"secondFormGroup.invalid\">\r\n\t\t\t\t\t\t\t\t<address-autocomplete-form #addressAutocompleteComponent [initialAddress]=\"organisation.address\"></address-autocomplete-form>\r\n\t\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" (click)=\"addressSubmit()\">{{constants.ok}}</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div *ngIf=\"!secondFormGroup.invalid && organisation.address\">\r\n\t\t\t\t\t\t\t\t{{organisation.address.toString}}\r\n\t\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" (click)=\"resetAddress()\">{{constants.change}}</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</mat-card>\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<button type=\"button\" mat-raised-button matStepperPrevious>{{constants.previous}}</button>\r\n\t\t\t\t\t\t\t<button type=\"button\" [disabled]=\"secondFormGroup.invalid\" mat-raised-button color=\"primary\" matStepperNext>{{constants.next}}</button>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</mat-step>\r\n\t\t\t\t<mat-step [stepControl]=\"thirdFormGroup\">\r\n\t\t\t\t\t<ng-template matStepLabel>{{constants.users}}</ng-template>\r\n\t\t\t\t\t<edit-users #usersTable [organisation]=\"organisation\" (approvedAsAdmin)=\"approvedAsAdmin($event)\" (removedAsAdmin)=\"removedAsAdmin($event)\"></edit-users>\r\n\t\t\t\t\t<div>\r\n\t\t\t\t\t\t<button type=\"button\" mat-raised-button matStepperPrevious>{{constants.previous}}</button>\r\n\t\t\t\t\t\t<button type=\"button\" mat-raised-button color=\"primary\" matStepperNext>{{constants.next}}</button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</mat-step>\r\n\r\n\t\t\t\t<mat-step>\r\n\t\t\t\t\t<ng-template matStepLabel>{{constants.summary}}</ng-template>\r\n\t\t\t\t\t<h2>{{constants.pleaseControl}}</h2>\r\n\t\t\t\t\t<organisation-detail *ngIf=\"organisation && organisation.address\" [organisation]=\"organisation\"></organisation-detail>\r\n\t\t\t\t\t<button type=\"button\" mat-raised-button matStepperPrevious>{{constants.previous}}</button>\r\n\t\t\t\t\t<button mat-raised-button color=\"primary\" type=\"submit\">{{constants.save}}</button>\r\n\t\t\t\t</mat-step>\r\n\t\t\t</mat-horizontal-stepper>\r\n\t\t\t<button type=\"button\" mat-raised-button (click)=\"back()\">{{constants.cancel}}</button>\r\n\t\t</form>\r\n\t</mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/organisations/organisation.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganisationFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_views_admin_addresses_address_autocomplete__ = __webpack_require__("./app/views/admin/addresses/address.autocomplete.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_views_admin_users_user_table__ = __webpack_require__("./app/views/admin/users/user.table.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_models_organisation__ = __webpack_require__("./app/models/organisation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_models_address__ = __webpack_require__("./app/models/address.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_models_provider__ = __webpack_require__("./app/models/provider.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

















var OrganisationFormComponent = (function () {
    function OrganisationFormComponent(organisationService, addressService, providerService, location, route, constants, validation, _formBuilder) {
        this.organisationService = organisationService;
        this.addressService = addressService;
        this.providerService = providerService;
        this.location = location;
        this.route = route;
        this.constants = constants;
        this.validation = validation;
        this._formBuilder = _formBuilder;
        this.adminProviders = new Array();
    }
    OrganisationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.organisation = new __WEBPACK_IMPORTED_MODULE_12_app_models_organisation__["a" /* Organisation */]();
        this.firstFormGroup = this._formBuilder.group({
            nameCtrl: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required]),
            descriptionCtrl: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](''),
            mailCtrl: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](''),
            phoneCtrl: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](''),
            webSiteCtrl: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */]('')
        });
        this.secondFormGroup = this._formBuilder.group({
            addressCtrl: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.organisation.address.isValid(), [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required])
        });
        this.thirdFormGroup = this._formBuilder.group({});
        this.firstFormGroup.get('nameCtrl').valueChanges.subscribe(function (name) { _this.organisation.name = name; });
        this.firstFormGroup.get('descriptionCtrl').valueChanges.subscribe(function (description) { _this.organisation.description = description; });
        this.firstFormGroup.get('mailCtrl').valueChanges.subscribe(function (mail) { _this.organisation.mail = mail; });
        this.firstFormGroup.get('phoneCtrl').valueChanges.subscribe(function (phone) { _this.organisation.phone = phone; });
        this.firstFormGroup.get('webSiteCtrl').valueChanges.subscribe(function (website) { _this.organisation.website = website; });
    };
    OrganisationFormComponent.prototype.addressSubmit = function () {
        var _this = this;
        var addressObservable = this.addressAutocomplete.getAddress();
        if (addressObservable) {
            addressObservable.subscribe(function (address) {
                _this.organisation.address = address;
                _this.organisation.address_id = address.id;
                _this.secondFormGroup.get('addressCtrl').setValue(_this.organisation.address);
            });
        }
    };
    OrganisationFormComponent.prototype.resetAddress = function () {
        this.organisation.address = new __WEBPACK_IMPORTED_MODULE_13_app_models_address__["a" /* Address */]();
        this.secondFormGroup.get('addressCtrl').setValue('');
    };
    OrganisationFormComponent.prototype.approvedAsAdmin = function (event) {
        var provider = new __WEBPACK_IMPORTED_MODULE_16_app_models_provider__["a" /* Provider */]();
        provider.approved = true;
        provider.admin = true;
        provider.user_id = event;
        this.adminProviders.push(provider);
    };
    OrganisationFormComponent.prototype.removedAsAdmin = function (event) {
        var index = this.adminProviders.indexOf(this.adminProviders.find(function (provider) { return provider.user_id === event; }));
        this.adminProviders.splice(index, 1);
    };
    OrganisationFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.organisation.address = null;
        if (this.organisation.id) {
            this.organisationService.edit(this.organisation).subscribe(function () { return _this.back(); });
        }
        else {
            this.organisationService.add(this.organisation).subscribe(function (orga) {
                if (_this.adminProviders.length) {
                    _this.combineProviderSubsribtions(orga.records).subscribe(function () { return _this.back(); });
                }
                else {
                    _this.back();
                }
            });
        }
    };
    OrganisationFormComponent.prototype.combineProviderSubsribtions = function (orga) {
        var observableProviderArray = [];
        for (var _i = 0, _a = this.adminProviders; _i < _a.length; _i++) {
            var provider = _a[_i];
            provider.organisation_id = orga.id;
            observableProviderArray.push(this.providerService.add(provider));
        }
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */].forkJoin(observableProviderArray);
    };
    OrganisationFormComponent.prototype.back = function () {
        this.location.back();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_12_app_models_organisation__["a" /* Organisation */])
    ], OrganisationFormComponent.prototype, "organisation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('addressAutocompleteComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10_app_views_admin_addresses_address_autocomplete__["a" /* AddressAutocompleteComponent */])
    ], OrganisationFormComponent.prototype, "addressAutocomplete", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('userTableComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_11_app_views_admin_users_user_table__["a" /* UserTableComponent */])
    ], OrganisationFormComponent.prototype, "usersTable", void 0);
    OrganisationFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'organisation-form',
            template: __webpack_require__("./app/views/admin/organisations/organisation.form.html"),
            styles: [__webpack_require__("./app/app.component.css")],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["e" /* OrganisationService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["e" /* OrganisationService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["a" /* AddressService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["a" /* AddressService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["e" /* OrganisationService */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["a" /* AddressService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_8_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_15_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_14_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_7_app_services_validation_service__["a" /* ValidationService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormBuilder */]])
    ], OrganisationFormComponent);
    return OrganisationFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/organisations/organisation.table.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"organisation-container mat-elevation-z8\">\r\n\r\n\t<mat-sidenav-container class=\"example-container\">\r\n\t\t<mat-sidenav #sidenav mode=\"over\">\r\n\t\t\t<button mat-raised-button type=\"button\"\r\n\t\t\t  color=\"accent\" (click)=\"closeDetails()\">\r\n\t\t\t\t{{constants.close}}\r\n\t\t\t</button>\r\n\t\t\t<organisation-detail [organisation]=\"currentDetail\">\r\n\t\t\t</organisation-detail>\r\n\t\t</mat-sidenav>\r\n\r\n\t\t<mat-sidenav-content>\r\n\t\t\t<div class=\"organisations-table-header\">\r\n\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t<input matInput (keyup)=\"handleFiltered($event)\"\r\n\t\t\t\t\t  placeholder=\"Filter\">\r\n\t\t\t\t</mat-form-field>\r\n\t\t\t\t<button mat-button *ngIf=\"actionsVisible()\"\r\n\t\t\t\t  routerLink='/organisation/edit/new'>\r\n\t\t\t\t\t{{ constants.newEntry }}\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\r\n\t\t\t<mat-table #table [dataSource]=\"dataSource\"\r\n\t\t\t  class=\"organisation-table\" matSort\r\n\t\t\t  (matSortChange)=\"handleSorted($event)\"\r\n\t\t\t  matSortActive=\"Organisations.name\"\r\n\t\t\t  matSortDirection=\"asc\" matSortDisableClear>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"Organisations.name\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t\t\t  mat-sort-header>\r\n\t\t\t\t\t\t{{constants.nameString}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">{{ row.name }}</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"website\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t\t\t  mat-sort-header>\r\n\t\t\t\t\t\t{{constants.website}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t\t<a target=\"_blank\" [href]=\"generateWebSite(row.website)\">\r\n\t\t\t\t\t\t\t{{row.website ? row.website : ''}}\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"mail\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t\t\t  mat-sort-header>\r\n\t\t\t\t\t\t{{constants.mail}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t\t<a [href]=\"'mailto:' + row.mail\">\r\n\t\t\t\t\t\t\t{{row.mail ? row.mail : ''}}</a>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"phone\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t\t\t\t  mat-sort-header>\r\n\t\t\t\t\t\t{{constants.phone}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">{{ row.phone }}</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"address\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.address}}</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\"\r\n\t\t\t\t\t  (click)=\"showDetails(row)\">\r\n\t\t\t\t\t\t{{row.address ? (row.address.street\r\n\t\t\t\t\t\t+ ' ' + row.address.house_number)\r\n\t\t\t\t\t\t: ''}}\r\n\t\t\t\t\t\t<br/> {{row.address ? (row.address.postal_code\r\n\t\t\t\t\t\t+ ' ' + row.address.place\r\n\t\t\t\t\t\t+ ' ' + row.address.suburb.name)\r\n\t\t\t\t\t\t: ''}}\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"action\"\r\n\t\t\t\t  *ngIf=\"actionsVisible()\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t\t{{constants.edit}} / {{constants.delete}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t\t<button mat-button color=\"primary\"\r\n\t\t\t\t\t\t  [routerLink]=\"['/admin', { outlets: { table: ['organisation-admin', row.id] } }]\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-pencil-square-o\"\r\n\t\t\t\t\t\t\t  aria-hidden=\"true\"></i>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t<delete-action [recordID]=\"row.id\"\r\n\t\t\t\t\t\t  [nameToDelete]=\"row.name\"\r\n\t\t\t\t\t\t  (onDelete)=\"onDelete($event)\">\r\n\t\t\t\t\t\t</delete-action>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n\t\t\t\t<mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\t\t\t</mat-table>\r\n\r\n\t\t\t<mat-paginator [pageSize]=\"constants.defaultPageSize\"\r\n\t\t\t  [pageSizeOptions]=\"constants.pageSizeOptions\"\r\n\t\t\t  [length]=\"totalCount\" (page)=\"handlePageChanged($event)\">\r\n\t\t\t</mat-paginator>\r\n\t\t</mat-sidenav-content>\r\n\t</mat-sidenav-container>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/organisations/organisation.table.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganisationsTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_models_organisation__ = __webpack_require__("./app/models/organisation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_views_admin_table_abstract__ = __webpack_require__("./app/views/admin/table.abstract.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var OrganisationsTableComponent = (function (_super) {
    __extends(OrganisationsTableComponent, _super);
    function OrganisationsTableComponent(dataService, constants, authService) {
        var _this = _super.call(this, dataService, constants) || this;
        _this.dataService = dataService;
        _this.constants = constants;
        _this.authService = authService;
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatTableDataSource */]();
        return _this;
    }
    OrganisationsTableComponent.prototype.initColumns = function () {
        this.displayedColumns = ['Organisations.name', 'mail', 'phone', 'website', 'address'];
        if (this.actionsVisible()) {
            this.displayedColumns.push('action');
        }
    };
    OrganisationsTableComponent.prototype.actionsVisible = function () {
        return this.authService.isSuperUser();
    };
    OrganisationsTableComponent.prototype.showDetails = function (row) {
        if (this.currentDetail && row.id === this.currentDetail.id) {
            this.sidenav.close();
        }
        else {
            this.currentDetail = new __WEBPACK_IMPORTED_MODULE_4_app_models_organisation__["a" /* Organisation */](row);
            this.sidenav.open();
        }
    };
    OrganisationsTableComponent.prototype.closeDetails = function () {
        this.currentDetail = null;
        this.sidenav.close();
    };
    OrganisationsTableComponent.prototype.generateWebSite = function (url) {
        if (!url) {
            return '';
        }
        if (url.includes('http')) {
            return url;
        }
        return 'http://' + url;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sidenav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["A" /* MatSidenav */])
    ], OrganisationsTableComponent.prototype, "sidenav", void 0);
    OrganisationsTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-organisation',
            styles: [__webpack_require__("./app/views/admin/table.abstract.css")],
            template: __webpack_require__("./app/views/admin/organisations/organisation.table.html"),
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["e" /* OrganisationService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["e" /* OrganisationService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["e" /* OrganisationService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_8_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__["a" /* AuthenticationService */]])
    ], OrganisationsTableComponent);
    return OrganisationsTableComponent;
}(__WEBPACK_IMPORTED_MODULE_6_app_views_admin_table_abstract__["a" /* AbstractTableComponent */]));



/***/ }),

/***/ "./app/views/admin/organisations/organisation.update.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-container\" *ngIf=\"organisation\">\r\n\t<mat-card class=\"organisation-edit-card\">\r\n\t\t<form #organisationForm=\"ngForm\"\r\n\t\t  (ngSubmit)=\"onSubmit()\" class=\"well\">\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<input matInput type=text [(ngModel)]=\"organisation.name\"\r\n\t\t\t\t  placeholder={{constants.nameString}}\r\n\t\t\t\t  name=\"name\" required [errorStateMatcher]=\"validation\"\r\n\t\t\t\t  id=\"orga_name_field\">\r\n\t\t\t</mat-form-field>\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<textarea matInput type=text [(ngModel)]=\"organisation.description\"\r\n\t\t\t\t  placeholder={{constants.description}}\r\n\t\t\t\t  name=\"description\" id=\"orga_description_field\"></textarea>\r\n\t\t\t</mat-form-field>\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<input matInput type=\"email\" [(ngModel)]=\"organisation.mail\"\r\n\t\t\t\t  placeholder={{constants.mail}}\r\n\t\t\t\t  name=\"mail\" id=\"orga_mail_field\">\r\n\t\t\t</mat-form-field>\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<input matInput type=text [(ngModel)]=\"organisation.phone\"\r\n\t\t\t\t  placeholder={{constants.phone}}\r\n\t\t\t\t  name=\"telephone\" id=\"orga_phone_field\">\r\n\t\t\t</mat-form-field>\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<input matInput type=text [(ngModel)]=\"organisation.website\"\r\n\t\t\t\t  placeholder={{constants.website}}\r\n\t\t\t\t  name=\"website\" id=\"orga_website_field\">\r\n\t\t\t</mat-form-field>\r\n\t\t\t<mat-card class=\"address-card\"\r\n\t\t\t  *ngIf=\"organisation.address\">\r\n\t\t\t\t<address-autocomplete-form #addressAutocompleteComponent\r\n\t\t\t\t  [initialAddress]=\"organisation.address\"></address-autocomplete-form>\r\n\t\t\t</mat-card>\r\n\t\t\t<button mat-raised-button color=\"primary\"\r\n\t\t\t  type=\"submit\" [disabled]=\"organisationForm.invalid\">{{constants.save}}</button>\r\n\t\t\t<button type=\"button\" mat-raised-button\r\n\t\t\t  (click)=\"back()\">{{constants.cancel}}</button>\r\n\t\t</form>\r\n\t</mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/organisations/organisation.update.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganisationUpdateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_views_admin_addresses_address_autocomplete__ = __webpack_require__("./app/views/admin/addresses/address.autocomplete.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_models_organisation__ = __webpack_require__("./app/models/organisation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var OrganisationUpdateComponent = (function () {
    function OrganisationUpdateComponent(organisationService, addressService, location, constants, validation) {
        this.organisationService = organisationService;
        this.addressService = addressService;
        this.location = location;
        this.constants = constants;
        this.validation = validation;
    }
    OrganisationUpdateComponent.prototype.onSubmit = function () {
        var _this = this;
        this.organisation.address = null;
        this.addressAutocomplete.getAddress().subscribe(function (address) {
            console.log('OrganisationUpdateComponent - address', address);
            _this.organisation.address_id = address.id;
            console.log('this.organisation', _this.organisation);
            _this.organisationService
                .edit(_this.organisation)
                .subscribe(function () { return _this.back(); });
        });
    };
    OrganisationUpdateComponent.prototype.back = function () {
        this.location.back();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_app_models_organisation__["a" /* Organisation */])
    ], OrganisationUpdateComponent.prototype, "organisation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('addressAutocompleteComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_app_views_admin_addresses_address_autocomplete__["a" /* AddressAutocompleteComponent */])
    ], OrganisationUpdateComponent.prototype, "addressAutocomplete", void 0);
    OrganisationUpdateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'organisation-update',
            template: __webpack_require__("./app/views/admin/organisations/organisation.update.html"),
            styles: [__webpack_require__("./app/app.component.css")],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["e" /* OrganisationService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["e" /* OrganisationService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["a" /* AddressService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["a" /* AddressService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["e" /* OrganisationService */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["a" /* AddressService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_9_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_4_app_services_validation_service__["a" /* ValidationService */]])
    ], OrganisationUpdateComponent);
    return OrganisationUpdateComponent;
}());



/***/ }),

/***/ "./app/views/admin/provider/provider-approval.table.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"providers\">\r\n\t<mat-card-header>\r\n\t\t<mat-card-title>\r\n\t\t\t<h2>{{constants.requests}}</h2>\r\n\t\t</mat-card-title>\r\n\t</mat-card-header>\r\n\t<mat-card-content>\r\n\t\t<mat-table #table [dataSource]=\"dataSource\"\r\n\t\t  class=\"example-table\">\r\n\r\n\t\t\t<!-- username Column -->\r\n\t\t\t<ng-container matColumnDef=\"username\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.user}}</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.user.username }}</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<!-- fullname Column -->\r\n\t\t\t<ng-container matColumnDef=\"fullname\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.nameString}}</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.user.fullname }}</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<!-- Approve provider in organisation  -->\r\n\t\t\t<ng-container matColumnDef=\"approve\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t{{constants.approveRequest}}\r\n\t\t\t\t</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t<button mat-button color=\"primary\"\r\n\t\t\t\t\t  type=\"button\" (click)=\"approve(row)\">\r\n\t\t\t\t\t\t<i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<!-- completely remove from provider table  -->\r\n\t\t\t<ng-container matColumnDef=\"decline\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t{{constants.declineRequest}}\r\n\t\t\t\t</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t<delete-action [recordID]=\"row.id\"\r\n\t\t\t\t\t  [nameToDelete]=\"row.user.username\"\r\n\t\t\t\t\t  (onDelete)=\"onDelete($event)\">\r\n\t\t\t\t\t</delete-action>\r\n\t\t\t\t</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n\t\t\t<mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\t\t</mat-table>\r\n\t</mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/provider/provider-approval.table.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProviderApprovalTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProviderApprovalTableComponent = (function () {
    function ProviderApprovalTableComponent(dataService, constants) {
        this.dataService = dataService;
        this.constants = constants;
        this.onApproved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.displayedColumns = ['username', 'fullname', 'approve', 'decline'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatTableDataSource */]();
    }
    ProviderApprovalTableComponent.prototype.ngOnChanges = function (changes) {
        var providers = changes.providers;
        this.dataSource.data = providers.currentValue;
    };
    ProviderApprovalTableComponent.prototype.approve = function (row) {
        var _this = this;
        row.approved = true;
        this.dataService.edit(row).subscribe(function () { return _this.onApproved.emit(row); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], ProviderApprovalTableComponent.prototype, "providers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ProviderApprovalTableComponent.prototype, "onApproved", void 0);
    ProviderApprovalTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'provider-approval-table',
            styles: [__webpack_require__("./app/views/admin/table.abstract.css")],
            template: __webpack_require__("./app/views/admin/provider/provider-approval.table.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_3_app_services_constants__["a" /* Constants */]])
    ], ProviderApprovalTableComponent);
    return ProviderApprovalTableComponent;
}());



/***/ }),

/***/ "./app/views/admin/provider/provider-request.table.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"organisationOptions\">\r\n\t<form #formDir=\"ngForm\" (ngSubmit)=\"onSubmit()\"\r\n\t  class=\"well\">\r\n\t\t<mat-card-header>\r\n\t\t\t<mat-card-title>\r\n\t\t\t\t<h2>{{constants.organisations}}</h2>\r\n\t\t\t</mat-card-title>\r\n\t\t</mat-card-header>\r\n\t\t<mat-card-content>\r\n\t\t\t<mat-form-field>\r\n\t\t\t\t<mat-select placeholder={{constants.organisations}}\r\n\t\t\t\t  [formControl]=\"organisationsCtrl\"\r\n\t\t\t\t  multiple>\r\n\t\t\t\t\t<mat-option *ngFor=\"let organisation of organisationOptions\"\r\n\t\t\t\t\t  [value]=\"organisation.id\">{{organisation.name}}</mat-option>\r\n\t\t\t\t</mat-select>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-table #table [dataSource]=\"dataSource\">\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.organisation}}</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">{{row.organisation?.name}}</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"website\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.website}}</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t\t<a target=\"_blank\" (click)=\"goToWebsite(row.website)\">\r\n\t\t\t\t\t\t\t{{row.organisation.website ? row.organisation?.website\r\n\t\t\t\t\t\t\t: ''}}\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"mail\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.mail}}</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t\t<a [href]=\"'mailto:' + row.mail\">{{row.organisation?.mail?\r\n\t\t\t\t\t\t\trow.organisation.mail :\r\n\t\t\t\t\t\t\t''}}\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"phone\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>Telephone</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">{{row.organisation?.phone}}</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<!-- Approve provider in organisation  -->\r\n\t\t\t\t<ng-container matColumnDef=\"approved\">\r\n\t\t\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t\t{{constants.approved}}\r\n\t\t\t\t\t</mat-header-cell>\r\n\t\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t\t<i *ngIf=\"row.approved\" class=\"fa fa-check-square-o\"\r\n\t\t\t\t\t\t  aria-hidden=\"true\"></i>\r\n\t\t\t\t\t\t<i *ngIf=\"!row.approved\" class=\"fa fa-minus-square-o\"\r\n\t\t\t\t\t\t  aria-hidden=\"true\"></i>\r\n\t\t\t\t\t</mat-cell>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n\t\t\t\t<mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\t\t\t</mat-table>\r\n\t\t</mat-card-content>\r\n\r\n\t\t<mat-card-actions>\r\n\t\t\t<button mat-raised-button type=\"submit\"\r\n\t\t\t  color=\"primary\">{{constants.save}}</button>\r\n\t\t\t<button mat-raised-button type=\"button\"\r\n\t\t\t  (click)=\"back()\">{{constants.back}}</button>\r\n\t\t</mat-card-actions>\r\n\t</form>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/provider/provider-request.table.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProviderRequestTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_forkJoin__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/forkJoin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_models_user__ = __webpack_require__("./app/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_models_provider__ = __webpack_require__("./app/models/provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};














var ProviderRequestTableComponent = (function () {
    function ProviderRequestTableComponent(organisationService, providerService, constants, location, authService) {
        this.organisationService = organisationService;
        this.providerService = providerService;
        this.constants = constants;
        this.location = location;
        this.authService = authService;
        this.displayedColumns = ['name', 'website', 'mail', 'phone', 'approved'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_13__angular_material__["F" /* MatTableDataSource */]();
    }
    ProviderRequestTableComponent.prototype.ngOnInit = function () {
        this.setInitialSelections();
        this.setOrganisationOptions();
    };
    ProviderRequestTableComponent.prototype.setInitialSelections = function () {
        var _this = this;
        this.organisationsCtrl = this.user.providers
            ? new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](this.user.providers
                .map(function (provider) { return provider.organisation.id; }))
            : new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]();
        this.organisationsCtrl.valueChanges.subscribe(function (value) { return _this.setData(value); });
    };
    ProviderRequestTableComponent.prototype.setOrganisationOptions = function () {
        var _this = this;
        this.organisationService.getAll()
            .map(function (value) { return value.records; })
            .subscribe(function (orgas) {
            _this.organisationOptions = orgas;
            _this.setData(_this.user.providers
                .map(function (provider) { return provider.organisation.id; }));
        });
    };
    ProviderRequestTableComponent.prototype.setData = function (selectedOrgaIDs) {
        console.log('value', selectedOrgaIDs);
        this.setCurrentProviders(selectedOrgaIDs);
        this.setDeletedProviders(selectedOrgaIDs);
    };
    ProviderRequestTableComponent.prototype.setCurrentProviders = function (selectedOrgaIDs) {
        var _this = this;
        var providers = new Array();
        this.providersToAdd = new Array();
        selectedOrgaIDs.forEach(function (orgaID) {
            var found = false;
            for (var _i = 0, _a = _this.user.providers; _i < _a.length; _i++) {
                var provider = _a[_i];
                if (provider.organisation_id === orgaID) {
                    providers.push(provider);
                    found = true;
                    break;
                }
            }
            if (!found) {
                var newProvider = new __WEBPACK_IMPORTED_MODULE_12_app_models_provider__["a" /* Provider */]();
                newProvider.user_id = _this.user.id;
                newProvider.organisation_id = orgaID;
                newProvider.organisation = _this.findOrganisation(orgaID);
                providers.push(newProvider);
                _this.providersToAdd.push(newProvider);
            }
        });
        this.dataSource.data = providers;
    };
    ProviderRequestTableComponent.prototype.findOrganisation = function (orgaID) {
        for (var _i = 0, _a = this.organisationOptions; _i < _a.length; _i++) {
            var orga = _a[_i];
            if (orga.id === orgaID) {
                return orga;
            }
        }
    };
    ProviderRequestTableComponent.prototype.setDeletedProviders = function (selectedOrgaIDs) {
        var _this = this;
        this.providersToDelete = new Array();
        if (this.user.providers) {
            this.user.providers.forEach(function (provider) {
                var deleted = !_this.organisationsCtrl.value.includes(provider.organisation_id);
                if (deleted) {
                    _this.providersToDelete.push(provider.id);
                }
            });
        }
    };
    ProviderRequestTableComponent.prototype.onSubmit = function () {
        var _this = this;
        var requests = [];
        requests = requests.concat(this.deleteProviders(), this.addProvider());
        Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_observable_forkJoin__["a" /* forkJoin */])(requests).subscribe(function () { return _this.updateUser(); });
    };
    ProviderRequestTableComponent.prototype.deleteProviders = function () {
        var list = [];
        for (var _i = 0, _a = this.providersToDelete; _i < _a.length; _i++) {
            var providerID = _a[_i];
            console.log('providerToDelete', providerID);
            list.push(this.providerService.delete(providerID));
        }
        return list;
    };
    ProviderRequestTableComponent.prototype.addProvider = function () {
        var list = [];
        for (var _i = 0, _a = this.providersToAdd; _i < _a.length; _i++) {
            var provider = _a[_i];
            console.log('providerToAdd', provider);
            var saveProvider = new __WEBPACK_IMPORTED_MODULE_12_app_models_provider__["a" /* Provider */]();
            saveProvider.organisation_id = provider.organisation_id;
            saveProvider.user_id = provider.user_id;
            list.push(this.providerService.add(saveProvider));
        }
        console.log('addProvider', list);
        return list;
    };
    ProviderRequestTableComponent.prototype.updateUser = function () {
        var _this = this;
        this.authService.login(this.user.username, this.user.password)
            .subscribe(function (succeeded) {
            return succeeded ? _this.location.back() : _this.authService.redirectToLogin();
        });
    };
    ProviderRequestTableComponent.prototype.back = function () {
        this.location.back();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_11_app_models_user__["a" /* User */])
    ], ProviderRequestTableComponent.prototype, "user", void 0);
    ProviderRequestTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'provider-request',
            template: __webpack_require__("./app/views/admin/provider/provider-request.table.html"),
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["j" /* UserService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["j" /* UserService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_8_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["e" /* OrganisationService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["e" /* OrganisationService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_8_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["e" /* OrganisationService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_9_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_10_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_8_app_services_authentication_service__["a" /* AuthenticationService */]])
    ], ProviderRequestTableComponent);
    return ProviderRequestTableComponent;
}());



/***/ }),

/***/ "./app/views/admin/provider/provider.table.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"providers\">\r\n\t<mat-card-header>\r\n\t\t<mat-card-title>\r\n\t\t\t<h2>{{constants.members}}</h2>\r\n\t\t</mat-card-title>\r\n\t</mat-card-header>\r\n\t<mat-card-content>\r\n\t\t<mat-table #table [dataSource]=\"dataSource\"\r\n\t\t  class=\"example-table\">\r\n\r\n\t\t\t<!-- username Column -->\r\n\t\t\t<ng-container matColumnDef=\"username\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.user}}</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.user.username }}</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<!-- fullname Column -->\r\n\t\t\t<ng-container matColumnDef=\"fullname\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.nameString}}</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.user.fullname }}</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<!-- phone Column -->\r\n\t\t\t<ng-container matColumnDef=\"phone\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.phone}}</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">{{ row.user.phone }}</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<!-- admin flag Column -->\r\n\t\t\t<ng-container matColumnDef=\"admin\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>{{constants.admin}}</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t<mat-checkbox [(ngModel)]=\"row.admin\">\r\n\t\t\t\t\t</mat-checkbox>\r\n\t\t\t\t</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<!-- completely remove from provider table  -->\r\n\t\t\t<ng-container matColumnDef=\"delete\">\r\n\t\t\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t\t\t{{constants.deleteFromOrganisation}}\r\n\t\t\t\t</mat-header-cell>\r\n\t\t\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t\t\t<delete-action [recordID]=\"row.id\"\r\n\t\t\t\t\t  [nameToDelete]=\"row.user.username\"\r\n\t\t\t\t\t  (onDelete)=\"onDelete($event)\">\r\n\t\t\t\t\t</delete-action>\r\n\t\t\t\t</mat-cell>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n\t\t\t<mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\t\t</mat-table>\r\n\r\n\t\t<button type=\"button\" mat-raised-button\r\n\t\t  color=\"primary\" (click)=\"save()\">{{constants.save}}\r\n\t\t</button>\r\n\t</mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./app/views/admin/provider/provider.table.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProviderTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/forkJoin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProviderTableComponent = (function () {
    function ProviderTableComponent(dataService, constants, location) {
        this.dataService = dataService;
        this.constants = constants;
        this.location = location;
        this.displayedColumns = ['username', 'fullname', 'phone', 'admin', 'delete'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["F" /* MatTableDataSource */]();
    }
    ProviderTableComponent.prototype.ngOnChanges = function (changes) {
        var providers = changes.providers;
        this.dataSource.data = providers.currentValue;
    };
    ProviderTableComponent.prototype.save = function () {
        var _this = this;
        var list = [];
        for (var _i = 0, _a = this.dataSource.data; _i < _a.length; _i++) {
            var provider = _a[_i];
            list.push(this.dataService.edit(provider));
        }
        Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__["a" /* forkJoin */])(list).subscribe(function () { return _this.back(); });
    };
    ProviderTableComponent.prototype.back = function () {
        this.location.back();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], ProviderTableComponent.prototype, "providers", void 0);
    ProviderTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'provider-table',
            styles: [__webpack_require__("./app/views/admin/table.abstract.css")],
            template: __webpack_require__("./app/views/admin/provider/provider.table.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"]])
    ], ProviderTableComponent);
    return ProviderTableComponent;
}());



/***/ }),

/***/ "./app/views/admin/table.abstract.css":
/***/ (function(module, exports) {

module.exports = "/* Table  */\r\n\r\n.table-container {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  max-height: 500px;\r\n  min-width: 300px;\r\n}\r\n\r\n.table-header {\r\n\tmin-height: 64px;\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n\tpadding-left: 24px;\r\n\tfont-size: 20px;\r\n}\r\n\r\n.tabel-header {\r\n\tmin-height: 64px;\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: flex;\r\n\t-webkit-box-align: baseline;\r\n\t    -ms-flex-align: baseline;\r\n\t        align-items: baseline;\r\n\tpadding: 8px 24px 0;\r\n\tfont-size: 20px;\r\n\t-webkit-box-pack: justify;\r\n\t    -ms-flex-pack: justify;\r\n\t        justify-content: space-between;\r\n}\r\n\r\n.mat-form-field {\r\n\tfont-size: 14px;\r\n\t-webkit-box-flex: 1;\r\n\t    -ms-flex-positive: 1;\r\n\t        flex-grow: 1;\r\n\tmargin-left: 32px;\r\n}\r\n\r\n.mat-table {\r\n\toverflow: auto;\r\n\tmax-height: 500px;\r\n}\r\n\r\n.table-icon {\r\n\tpadding: 0 14px;\r\n}\r\n\r\n.table-spacer {\r\n\t-webkit-box-flex: 1;\r\n\t    -ms-flex: 1 1 auto;\r\n\t        flex: 1 1 auto;\r\n}\r\n\r\n.auto-completion-form {\r\n\tmin-width: 150px;\r\n\tmax-width: 500px;\r\n\twidth: 100%;\r\n  }\r\n\r\n.auto-completion-full-width {\r\n\twidth: 30%;\r\n  }\r\n"

/***/ }),

/***/ "./app/views/admin/table.abstract.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_models_table_state__ = __webpack_require__("./app/models/table.state.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AbstractTableComponent = (function () {
    function AbstractTableComponent(dataService, constants) {
        this.onLoadedData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.dataService = dataService;
        this.constants = constants;
        this.tableState = new __WEBPACK_IMPORTED_MODULE_2_app_models_table_state__["a" /* TableState */](constants.defaultPageSize, constants.pageSizeOptions);
    }
    AbstractTableComponent.prototype.ngOnInit = function () {
        this.dataSource.paginator = this.paginator;
        this.initColumns();
    };
    AbstractTableComponent.prototype.ngAfterViewInit = function () {
        this.tableState.setSorting(this.sort.active, this.sort.start);
        this.fetchData();
    };
    AbstractTableComponent.prototype.initColumns = function () {
        this.displayedColumns = [];
    };
    AbstractTableComponent.prototype.handleFiltered = function (changedEvent) {
        this.tableState.setFilter(changedEvent.target.value);
        this.fetchData();
    };
    AbstractTableComponent.prototype.handlePageChanged = function (event) {
        this.tableState.setPagination(event);
        this.fetchData();
    };
    AbstractTableComponent.prototype.handleSorted = function (event) {
        this.paginator.pageIndex = 0;
        this.tableState.setSorting(event.active, event.direction);
        this.fetchData();
    };
    AbstractTableComponent.prototype.fetchData = function () {
        var _this = this;
        this.dataService.list(this.tableState)
            .subscribe(function (data) {
            _this.handleResponse(data);
        });
    };
    AbstractTableComponent.prototype.handleResponse = function (response) {
        this.dataSource.data = response.records;
        this.totalCount = response.totalCount;
        this.onLoadedData.emit(response.records);
    };
    AbstractTableComponent.prototype.getData = function () {
        return this.dataSource.data;
    };
    AbstractTableComponent.prototype.onDelete = function (recordID) {
        var _this = this;
        this.dataService
            .delete(recordID)
            .subscribe(function () { return _this.fetchData(); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatPaginator */])
    ], AbstractTableComponent.prototype, "paginator", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["C" /* MatSort */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["C" /* MatSort */])
    ], AbstractTableComponent.prototype, "sort", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], AbstractTableComponent.prototype, "onLoadedData", void 0);
    return AbstractTableComponent;
}());



/***/ }),

/***/ "./app/views/admin/table/paginator.labels.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginatorLabels; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PaginatorLabels = (function (_super) {
    __extends(PaginatorLabels, _super);
    function PaginatorLabels() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemsPerPageLabel = __WEBPACK_IMPORTED_MODULE_1_app_services_constants__["a" /* Constants */].itemsPerPageLabel;
        _this.nextPageLabel = __WEBPACK_IMPORTED_MODULE_1_app_services_constants__["a" /* Constants */].nextPageLabel;
        _this.previousPageLabel = __WEBPACK_IMPORTED_MODULE_1_app_services_constants__["a" /* Constants */].previousPageLabel;
        _this.getRangeLabel = function (page, pageSize, length) {
            if (length === 0 || pageSize === 0) {
                return '0 ' + __WEBPACK_IMPORTED_MODULE_1_app_services_constants__["a" /* Constants */].of + ' ' + length;
            }
            length = Math.max(length, 0);
            var startIndex = page * pageSize;
            var endIndex = startIndex < length ?
                Math.min(startIndex + pageSize, length) :
                startIndex + pageSize;
            return startIndex + 1 + ' - ' + endIndex + ' ' + __WEBPACK_IMPORTED_MODULE_1_app_services_constants__["a" /* Constants */].of + ' ' + length;
        };
        return _this;
    }
    return PaginatorLabels;
}(__WEBPACK_IMPORTED_MODULE_0__angular_material__["x" /* MatPaginatorIntl */]));



/***/ }),

/***/ "./app/views/admin/users/register.form.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-container\" *ngIf=\"allOrganisations\">\r\n\t<mat-card>\r\n\t\t<mat-card-header>\r\n\t\t\t<h2>{{constants.registration}}</h2>\r\n\t\t</mat-card-header>\r\n\r\n\t\t<form id=\"user-form\" [formGroup]=\"userForm\"\r\n\t\t  #formDir=\"ngForm\" (ngSubmit)=\"onSubmit()\"\r\n\t\t  class=\"well\">\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<input matInput type=text placeholder={{constants.mail}}\r\n\t\t\t\t  formControlName=\"usernameCtrl\"\r\n\t\t\t\t  [errorStateMatcher]=\"validation\"\r\n\t\t\t\t  required>\r\n\t\t\t\t<mat-error *ngIf=\"usernameCtrl.hasError('required')\">\r\n\t\t\t\t\t{{constants.isRequiredMessage}}\r\n\t\t\t\t</mat-error>\r\n\t\t\t\t<mat-error *ngIf=\"usernameCtrl.hasError('email')\">\r\n\t\t\t\t\t{{constants.emailFormatMessage}}\r\n\t\t\t\t</mat-error>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<input matInput type=text placeholder={{constants.fullname}}\r\n\t\t\t\t  formControlName=\"fullnameCtrl\"\r\n\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t<input matInput type=text placeholder={{constants.phone}}\r\n\t\t\t\t  formControlName=\"phoneCtrl\"\r\n\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field>\r\n\t\t\t\t<mat-select placeholder={{constants.organisations}}\r\n\t\t\t\t  formControlName=\"organisationsCtrl\"\r\n\t\t\t\t  multiple>\r\n\t\t\t\t\t<mat-option *ngFor=\"let organisation of allOrganisations\"\r\n\t\t\t\t\t  [value]=\"organisation.id\">{{organisation.name}}</mat-option>\r\n\t\t\t\t</mat-select>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<form [formGroup]=\"passwordGroup\"\r\n\t\t\t  id=\"password-group\" #formDir=\"ngForm\">\r\n\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t<input matInput type=password placeholder={{constants.newPassword}}\r\n\t\t\t\t\t  formControlName=\"passwordCtrl\"\r\n\t\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t\t</mat-form-field>\r\n\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t<input matInput type=password placeholder={{constants.confirmPassword}}\r\n\t\t\t\t\t  formControlName=\"confirmPasswordCtrl\"\r\n\t\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t\t</mat-form-field>\r\n\t\t\t\t<mat-error *ngIf=\"passwordGroup.invalid\">\r\n\t\t\t\t\t{{passwordInvalid()}}\r\n\t\t\t\t</mat-error>\r\n\t\t\t</form>\r\n\r\n\t\t\t<button mat-raised-button type=\"submit\"\r\n\t\t\t  color=\"primary\" [disabled]=\"userForm.invalid\">{{constants.save}}</button>\r\n\t\t\t<button mat-raised-button type=\"button\"\r\n\t\t\t  (click)=\"back()\">{{constants.back}}</button>\r\n\t\t</form>\r\n\t</mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/users/register.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_provider_service__ = __webpack_require__("./app/services/provider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_models_user__ = __webpack_require__("./app/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_models_provider__ = __webpack_require__("./app/models/provider.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var RegisterFormComponent = (function () {
    function RegisterFormComponent(userService, organisationService, providerService, authService, location, constants, validation) {
        this.userService = userService;
        this.organisationService = organisationService;
        this.providerService = providerService;
        this.authService = authService;
        this.location = location;
        this.constants = constants;
        this.validation = validation;
    }
    RegisterFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.setData();
        this.userService.add(this.user)
            .subscribe(function () {
            _this.authService.redirectToLogin();
        });
    };
    RegisterFormComponent.prototype.passwordInvalid = function () {
        return this.constants.notSamePasswordMessage + ' ' +
            this.constants.orAreEmptyMessage;
    };
    RegisterFormComponent.prototype.back = function () {
        this.location.back();
    };
    RegisterFormComponent.prototype.setData = function () {
        this.user.username = this.usernameCtrl.value;
        this.user.fullname = this.fullnameCtrl.value;
        this.user.phone = this.phoneCtrl.value;
        if (this.passwordCtrl.value) {
            this.user.password = this.passwordCtrl.value;
        }
        this.createProviders();
    };
    RegisterFormComponent.prototype.createProviders = function () {
        if (this.organisationsCtrl.value) {
            for (var _i = 0, _a = this.organisationsCtrl.value; _i < _a.length; _i++) {
                var orga_id = _a[_i];
                if (orga_id) {
                    var provider = new __WEBPACK_IMPORTED_MODULE_11_app_models_provider__["a" /* Provider */]();
                    provider.organisation_id = orga_id;
                    provider.user_id = this.user.id;
                    provider.organisation = undefined;
                    provider.user = undefined;
                    this.user.providers.push(provider);
                }
            }
        }
    };
    RegisterFormComponent.prototype.ngOnInit = function () {
        this.user = new __WEBPACK_IMPORTED_MODULE_10_app_models_user__["a" /* User */]();
        this.initAllOrganisationsThenControls();
    };
    RegisterFormComponent.prototype.initAllOrganisationsThenControls = function () {
        var _this = this;
        this.organisationService.getAll()
            .map(function (value) { return value.records; })
            .subscribe(function (orgas) {
            _this.initFormControls();
            _this.allOrganisations = orgas;
        });
    };
    RegisterFormComponent.prototype.initFormControls = function () {
        this.initPasswordForm();
        this.initUserForm();
    };
    RegisterFormComponent.prototype.initPasswordForm = function () {
        this.passwordGroup = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormGroup */]({
            'passwordCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required
            ]),
            'confirmPasswordCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required
            ]),
        }, this.validation.passwordMatch);
    };
    RegisterFormComponent.prototype.initUserForm = function () {
        this.userForm = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormGroup */]({
            'usernameCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](this.user.username, [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* Validators */].email
            ]),
            'fullnameCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](this.user.fullname),
            'phoneCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](this.user.phone),
            'organisationsCtrl': new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormControl */](),
            'password': this.passwordGroup
        });
    };
    Object.defineProperty(RegisterFormComponent.prototype, "usernameCtrl", {
        get: function () { return this.userForm.get('usernameCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "fullnameCtrl", {
        get: function () { return this.userForm.get('fullnameCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "passwordCtrl", {
        get: function () { return this.passwordGroup.get('passwordCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "phoneCtrl", {
        get: function () { return this.userForm.get('phoneCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "organisationsCtrl", {
        get: function () { return this.userForm.get('organisationsCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterFormComponent.prototype, "confirmPasswordCtrl", {
        get: function () { return this.passwordGroup.get('confirmPasswordCtrl'); },
        enumerable: true,
        configurable: true
    });
    RegisterFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'register-user',
            template: __webpack_require__("./app/views/admin/users/register.form.html"),
            styles: [__webpack_require__("./app/views/admin/users/user.form.css")],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8_app_services_provider_service__["a" /* ProviderService */],
                { provide: __WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["j" /* UserService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["j" /* UserService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__["a" /* AuthenticationService */]] },
                { provide: __WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["e" /* OrganisationService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["e" /* OrganisationService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["j" /* UserService */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4_app_services_data_service_factory__["e" /* OrganisationService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_8_app_services_provider_service__["a" /* ProviderService */],
            __WEBPACK_IMPORTED_MODULE_7_app_services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_9_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_6_app_services_validation_service__["a" /* ValidationService */]])
    ], RegisterFormComponent);
    return RegisterFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/users/user.form.css":
/***/ (function(module, exports) {

module.exports = "#password-group {\r\n\tmargin-top: 20px;\r\n\tmargin-bottom: 20px;\r\n}\r\n\r\n#user-form {\r\n\tmargin-top: 50px;\r\n\tmargin-bottom: 20px;\r\n}\r\n"

/***/ }),

/***/ "./app/views/admin/users/user.form.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-container\" *ngIf=\"user\">\r\n\t<mat-card>\r\n\t\t<mat-card-header>\r\n\t\t\t<h2>{{constants.user}}</h2>\r\n\t\t</mat-card-header>\r\n\r\n\t\t<mat-tab-group>\r\n\t\t\t<mat-tab label={{constants.coreData}}>\r\n\t\t\t\t<form id=\"user-form\" [formGroup]=\"userForm\"\r\n\t\t\t\t  #formDir=\"ngForm\" (ngSubmit)=\"onSubmit()\"\r\n\t\t\t\t  class=\"well\">\r\n\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t<input matInput type=text placeholder={{constants.mail}}\r\n\t\t\t\t\t\t  formControlName=\"usernameCtrl\"\r\n\t\t\t\t\t\t  [errorStateMatcher]=\"validation\"\r\n\t\t\t\t\t\t  required>\r\n\t\t\t\t\t\t<mat-error *ngIf=\"usernameCtrl.hasError('required')\">\r\n\t\t\t\t\t\t\t{{constants.isRequiredMessage}}\r\n\t\t\t\t\t\t</mat-error>\r\n\t\t\t\t\t\t<mat-error *ngIf=\"usernameCtrl.hasError('email')\">\r\n\t\t\t\t\t\t\t{{constants.emailFormatMessage}}\r\n\t\t\t\t\t\t</mat-error>\r\n\t\t\t\t\t</mat-form-field>\r\n\r\n\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t<input matInput type=text placeholder={{constants.fullname}}\r\n\t\t\t\t\t\t  formControlName=\"fullnameCtrl\"\r\n\t\t\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t\t\t</mat-form-field>\r\n\r\n\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t<input matInput type=text placeholder={{constants.phone}}\r\n\t\t\t\t\t\t  formControlName=\"phoneCtrl\"\r\n\t\t\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t\t\t</mat-form-field>\r\n\r\n\t\t\t\t\t<form [formGroup]=\"passwordGroup\"\r\n\t\t\t\t\t  id=\"password-group\" #formDir=\"ngForm\">\r\n\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t<input matInput type=password placeholder={{constants.newPassword}}\r\n\t\t\t\t\t\t\t  formControlName=\"passwordCtrl\"\r\n\t\t\t\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t<mat-form-field class=\"edit-form-full-width\">\r\n\t\t\t\t\t\t\t<input matInput type=password placeholder={{constants.confirmPassword}}\r\n\t\t\t\t\t\t\t  formControlName=\"confirmPasswordCtrl\"\r\n\t\t\t\t\t\t\t  [errorStateMatcher]=\"validation\">\r\n\t\t\t\t\t\t</mat-form-field>\r\n\t\t\t\t\t\t<mat-error *ngIf=\"passwordGroup.invalid\">\r\n\t\t\t\t\t\t\t{{passwordInvalid()}}\r\n\t\t\t\t\t\t</mat-error>\r\n\t\t\t\t\t</form>\r\n\r\n\t\t\t\t\t<button mat-raised-button type=\"submit\"\r\n\t\t\t\t\t  color=\"primary\" [disabled]=\"userForm.invalid\">{{constants.save}}</button>\r\n\t\t\t\t\t<button mat-raised-button type=\"button\"\r\n\t\t\t\t\t  (click)=\"back()\">{{constants.back}}</button>\r\n\t\t\t\t</form>\r\n\t\t\t</mat-tab>\r\n\t\t\t<mat-tab *ngIf=\"user\" label=\"{{constants.organisations}}\">\r\n\t\t\t\t<provider-request [user]=\"user\">\r\n\t\t\t\t</provider-request>\r\n\t\t\t</mat-tab>\r\n\t\t\t<mat-tab *ngIf=\"hasActivities\"\r\n\t\t\t  label=\"{{constants.own}} {{constants.activities}}\">\r\n\t\t\t\t<mat-card>\r\n\t\t\t\t\t<mat-card-header>\r\n\t\t\t\t\t\t<mat-card-title>\r\n\t\t\t\t\t\t\t<h2>{{constants.activities}}</h2>\r\n\t\t\t\t\t\t</mat-card-title>\r\n\t\t\t\t\t</mat-card-header>\r\n\t\t\t\t\t<mat-card-content>\r\n\t\t\t\t\t\t<activity-table [showActions]=\"true\"\r\n\t\t\t\t\t\t  [providers]=\"getUserProviders()\">\r\n\t\t\t\t\t\t</activity-table>\r\n\t\t\t\t\t</mat-card-content>\r\n\t\t\t\t</mat-card>\r\n\t\t\t</mat-tab>\r\n\t\t</mat-tab-group>\r\n\t</mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./app/views/admin/users/user.form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_validation_service__ = __webpack_require__("./app/services/validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var UserFormComponent = (function () {
    function UserFormComponent(userService, authService, location, route, constants, validation) {
        this.userService = userService;
        this.authService = authService;
        this.location = location;
        this.route = route;
        this.constants = constants;
        this.validation = validation;
        this.hasActivities = true;
    }
    UserFormComponent.prototype.onSubmit = function () {
        this.setData();
        this.updateUser();
    };
    UserFormComponent.prototype.setData = function () {
        this.user.username = this.usernameCtrl.value;
        this.user.fullname = this.fullnameCtrl.value;
        this.user.phone = this.phoneCtrl.value;
        if (this.passwordCtrl.value) {
            this.user.password = this.passwordCtrl.value;
        }
    };
    UserFormComponent.prototype.updateUser = function () {
        var _this = this;
        this.userService.edit(this.user)
            .map(function (data) { return data.records; })
            .subscribe(function (user) {
            return _this.authService.login(_this.user.username, _this.user.password)
                .subscribe(function (succeeded) {
                return succeeded ? _this.location.back() : _this.authService.redirectToLogin();
            });
        });
    };
    UserFormComponent.prototype.back = function () {
        this.location.back();
    };
    UserFormComponent.prototype.passwordInvalid = function () {
        return this.constants.notSamePasswordMessage;
    };
    UserFormComponent.prototype.getUserProviders = function () {
        return this.user.providers.map(function (provider) { return provider.id; });
    };
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.get(this.authService.currentUser.id)
            .map(function (data) { return data.records; })
            .subscribe(function (user) {
            _this.user = user;
            _this.initFormControls();
        });
    };
    UserFormComponent.prototype.initFormControls = function () {
        this.initPasswordForm();
        this.initUserForm();
    };
    UserFormComponent.prototype.initPasswordForm = function () {
        this.passwordGroup = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* FormGroup */]({
            'passwordCtrl': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](),
            'confirmPasswordCtrl': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */]()
        }, this.validation.passwordMatch);
    };
    UserFormComponent.prototype.initUserForm = function () {
        this.userForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* FormGroup */]({
            'usernameCtrl': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.user.username, [
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].email
            ]),
            'fullnameCtrl': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.user.fullname),
            'phoneCtrl': new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.user.phone),
            'password': this.passwordGroup
        });
    };
    Object.defineProperty(UserFormComponent.prototype, "usernameCtrl", {
        get: function () { return this.userForm.get('usernameCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "fullnameCtrl", {
        get: function () { return this.userForm.get('fullnameCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "passwordCtrl", {
        get: function () { return this.passwordGroup.get('passwordCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "phoneCtrl", {
        get: function () { return this.userForm.get('phoneCtrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "confirmPasswordCtrl", {
        get: function () { return this.passwordGroup.get('confirmPasswordCtrl'); },
        enumerable: true,
        configurable: true
    });
    UserFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-form',
            template: __webpack_require__("./app/views/admin/users/user.form.html"),
            styles: [__webpack_require__("./app/views/admin/users/user.form.css")],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["j" /* UserService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["j" /* UserService */]), deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__["a" /* AuthenticationService */]] }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6_app_services_data_service_factory__["j" /* UserService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_9_app_services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_10_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_8_app_services_validation_service__["a" /* ValidationService */]])
    ], UserFormComponent);
    return UserFormComponent;
}());



/***/ }),

/***/ "./app/views/admin/users/user.table.html":
/***/ (function(module, exports) {

module.exports = "<!-- <button mat-raised-button type=\"button\"\r\n  (click)=\"newEntry()\">\r\n\t{{constants.newEntry}}</button> -->\r\n\r\n<div class=\"filter\">\r\n\t<mat-form-field>\r\n\t\t<input matInput (keyup)=\"handleFiltered($event)\"\r\n\t\t  placeholder=\"Filter\">\r\n\t</mat-form-field>\r\n</div>\r\n\r\n<mat-table #table [dataSource]=\"dataSource\"\r\n  class=\"example-table\" matSort (matSortChange)=\"handleSorted($event)\"\r\n  matSortActive=\"username\" matSortDirection=\"asc\"\r\n  matSortDisableClear>\r\n\r\n\t<!-- username Column -->\r\n\t<ng-container matColumnDef=\"username\">\r\n\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t  mat-sort-header>{{constants.user}}</mat-header-cell>\r\n\t\t<mat-cell *matCellDef=\"let row\">{{row.username}}</mat-cell>\r\n\t</ng-container>\r\n\r\n\t<!-- fullname Column -->\r\n\t<ng-container matColumnDef=\"fullname\">\r\n\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t  mat-sort-header>{{constants.nameString}}</mat-header-cell>\r\n\t\t<mat-cell *matCellDef=\"let row\">{{row.fullname}}</mat-cell>\r\n\t</ng-container>\r\n\r\n\t<!-- phone Column -->\r\n\t<ng-container matColumnDef=\"Users.phone\">\r\n\t\t<mat-header-cell *matHeaderCellDef\r\n\t\t  mat-sort-header>{{constants.phone}}</mat-header-cell>\r\n\t\t<mat-cell *matCellDef=\"let row\">{{row.phone}}</mat-cell>\r\n\t</ng-container>\r\n\r\n\t<!-- Created Column -->\r\n\t<ng-container matColumnDef=\"created\">\r\n\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t{{constants.createdAt}}\r\n\t\t</mat-header-cell>\r\n\t\t<mat-cell *matCellDef=\"let row\">{{row.created | date}}</mat-cell>\r\n\t</ng-container>\r\n\r\n\t<ng-container matColumnDef=\"action\">\r\n\t\t<mat-header-cell *matHeaderCellDef>\r\n\t\t\t{{organisation ? constants.admin\r\n\t\t\t+ '?' : constants.delete}}\r\n\t\t</mat-header-cell>\r\n\t\t<mat-cell *matCellDef=\"let row\">\r\n\t\t\t<div *ngIf=\"!organisation\">\r\n\t\t\t\t<delete-action [recordID]=\"row.id\"\r\n\t\t\t\t  [nameToDelete]=\"row.name\" (onDelete)=\"onDelete($event)\">\r\n\t\t\t\t</delete-action>\r\n\t\t\t</div>\r\n\t\t\t<div *ngIf=\"organisation\">\r\n\t\t\t\t<button mat-raised-button *ngIf=\"!isAdmin(row.id)\"\r\n\t\t\t\t  type=\"button\" (click)=\"addAdmin(row.id)\">{{constants.no}}\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-raised-button color=\"primary\"\r\n\t\t\t\t  *ngIf=\"isAdmin(row.id)\" type=\"button\"\r\n\t\t\t\t  (click)=\"removeAdmin(row.id)\">{{constants.yes}}\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</mat-cell>\r\n\t</ng-container>\r\n\r\n\t<mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n\t<mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n</mat-table>\r\n\r\n<mat-paginator [pageSize]=\"constants.defaultPageSize\"\r\n  [pageSizeOptions]=\"constants.pageSizeOptions\"\r\n  [length]=\"totalCount\" (page)=\"handlePageChanged($event)\">\r\n</mat-paginator>\r\n"

/***/ }),

/***/ "./app/views/admin/users/user.table.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__ = __webpack_require__("./app/services/data.service.factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_data_service__ = __webpack_require__("./app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_views_admin_table_abstract__ = __webpack_require__("./app/views/admin/table.abstract.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__ = __webpack_require__("./app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_constants__ = __webpack_require__("./app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_models_organisation__ = __webpack_require__("./app/models/organisation.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var UserTableComponent = (function (_super) {
    __extends(UserTableComponent, _super);
    function UserTableComponent(dataService, constants, deleteDialog) {
        var _this = _super.call(this, dataService, constants) || this;
        _this.dataService = dataService;
        _this.constants = constants;
        _this.deleteDialog = deleteDialog;
        _this.dataSource = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["F" /* MatTableDataSource */]();
        _this.confirmedUserIDs = new Array();
        _this.approvedAsAdmin = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.removedAsAdmin = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        return _this;
    }
    UserTableComponent.prototype.initColumns = function () {
        this.displayedColumns = ['username', 'fullname', 'Users.phone', 'created', 'action'];
    };
    UserTableComponent.prototype.isAdmin = function (userID) {
        if (this.confirmedUserIDs.indexOf(userID) === -1) {
            return false;
        }
        else {
            return true;
        }
    };
    UserTableComponent.prototype.addAdmin = function (userID) {
        this.confirmedUserIDs.push(userID);
        this.approvedAsAdmin.emit(userID);
    };
    UserTableComponent.prototype.removeAdmin = function (userID) {
        var index = this.confirmedUserIDs.indexOf(userID);
        this.confirmedUserIDs.splice(index, 1);
        this.removedAsAdmin.emit(userID);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_app_models_organisation__["a" /* Organisation */])
    ], UserTableComponent.prototype, "organisation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], UserTableComponent.prototype, "approvedAsAdmin", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], UserTableComponent.prototype, "removedAsAdmin", void 0);
    UserTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-users',
            styles: [__webpack_require__("./app/views/admin/table.abstract.css")],
            template: __webpack_require__("./app/views/admin/users/user.table.html"),
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["j" /* UserService */], useFactory: Object(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["d" /* DataServiceFactory */])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["j" /* UserService */]), deps: [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_6_app_services_authentication_service__["a" /* AuthenticationService */]] },
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3_app_services_data_service_factory__["j" /* UserService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_7_app_services_constants__["a" /* Constants */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatDialog */]])
    ], UserTableComponent);
    return UserTableComponent;
}(__WEBPACK_IMPORTED_MODULE_5_app_views_admin_table_abstract__["a" /* AbstractTableComponent */]));



/***/ }),

/***/ "./app/views/details/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DetailsComponent = (function () {
    function DetailsComponent() {
    }
    DetailsComponent.prototype.ngOnInit = function () { };
    DetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            providers: [],
            styles: [__webpack_require__("./app/views/details/style.css")],
            template: __webpack_require__("./app/views/details/view.html")
        }),
        __metadata("design:paramtypes", [])
    ], DetailsComponent);
    return DetailsComponent;
}());



/***/ }),

/***/ "./app/views/details/style.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./app/views/details/view.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./app/views/filter/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FilterComponent = (function () {
    function FilterComponent() {
        this.configuration = null;
        this.selectables = null;
        this.query = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */]();
        this.selection = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */]();
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["a" /* Observable */])
    ], FilterComponent.prototype, "configuration", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["a" /* Observable */])
    ], FilterComponent.prototype, "selectables", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */])
    ], FilterComponent.prototype, "query", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */])
    ], FilterComponent.prototype, "selection", void 0);
    FilterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'filter-component',
            styles: [__webpack_require__("./app/views/filter/style.css")],
            template: __webpack_require__("./app/views/filter/view.html")
        })
    ], FilterComponent);
    return FilterComponent;
}());

// import 'rxjs/add/operator/toPromise';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { AfterViewInit } from '@angular/core';
// import { OnDestroy } from '@angular/core';
// import { OnInit } from '@angular/core';
//  implements AfterViewInit, OnDestroy, OnInit {
// constructor(
// 	private activityService: ActivityService
// ) { }
// public ngAfterViewInit(): void {
// }
// public ngOnDestroy(): void {
// 	this.activityService.disconnect();
// }
// public ngOnInit(): void {
// 	this.activityService.connect();
// }
// public clear(): void {
// 	this.query.value = '';
// 	this.selectables.next([]);
// 	this.selection.next(null);
// }
// public search(): void {
// 	this.selectables =
// 	this.activityService.fetch(this.query.value).toPromise().then((i) => {
// 		this.selectables.next(i);
// 	});
// }
// public settings(): void { }
// this.selection.subscribe((i) => console.log(i));
// this.selecables.
// this.selecables.changes.subscribe((i) => {
// 	console.log(i);
// 	i.opened.subscribe(() => {
// 		console.log(i);
// 	});
// 	i.closed.subscribe(() => {
// 		console.log(i);
// 	});
// });
// this.selecables.forEach((i) => {
// })
// this.query.stateChanges.subscribe(() => {
// 	console.log(this.query.value);
// });


/***/ }),

/***/ "./app/views/filter/style.css":
/***/ (function(module, exports) {

module.exports = "#query {\r\n\tdisplay: inline-block;\r\n\tmargin-bottom: 16px;\r\n\tmax-width: 100%;\r\n\tpadding: 0;\r\n\twidth: 400px;\r\n}\r\n\r\n#query mat-icon.fa {\r\n\tfont-size: 20px;\r\n}\r\n\r\n#query > table {\r\n\tborder-spacing: 0;\r\n\tmargin: -6px 0;\r\n\tpadding: 0 6px;\r\n\twidth: 100%;\r\n}\r\n\r\n#query > table td:not(:nth-child(2)) {\r\n\twidth: 1px;\r\n}\r\n\r\n#query > table td>mat-form-field {\r\n\twidth: 100%;\r\n}\r\n\r\n#query > mat-expansion-panel ::ng-deep .mat-expansion-panel-body {\r\n\tmargin: 0;\r\n}\r\n\r\n#query > mat-expansion-panel ::ng-deep .mat-tab-labels {\r\n\t-webkit-box-pack: center;\r\n\t    -ms-flex-pack: center;\r\n\t        justify-content: center;\r\n}\r\n\r\n#query > mat-expansion-panel ::ng-deep .mat-tab-label {\r\n\theight: 32px;\r\n\tmin-width: 0;\r\n\tpadding: 0 12px;\r\n}\r\n\r\n/*#selectables {\r\n\r\n}\r\n\r\n#selectables:empty {\r\n\theight: 0;\r\n}*/\r\n\r\n/*#selectables mat-expansion-panel-header {\r\n\toverflow: hidden;\r\n\ttransition: 200ms;\r\n}\r\n\r\n#selectables mat-expansion-panel-header > * {\r\n\tmax-height: 100%;\r\n\ttransition: 100ms;\r\n\ttransition-delay: 0;\r\n}*/\r\n\r\n#selectables ::ng-deep .mat-expansion-indicator::after {\r\n\t-webkit-transform: rotate(315deg);\r\n\t        transform: rotate(315deg);\r\n}\r\n\r\n#selectables > * {\r\n\tmax-width: 100%;\r\n\twidth: 400px;\r\n}\r\n\r\n@media (max-width: 1200px) {\r\n\t/*#selectables .mat-expansion-panel-spacing {\r\n\t\tmargin: 0;\r\n\t}\r\n\r\n\t#selectables.mat-expanded > *:not(.mat-expanded)\r\n\t\tmat-expansion-panel-header {\r\n\t\theight: 0 !important;\r\n\t}\r\n\r\n\t#selectables.mat-expanded > *:not(.mat-expanded)\r\n\t\tmat-expansion-panel-header > * {\r\n\t\tmax-height: 0%;\r\n\t\ttransition-delay: 100ms;\r\n\t}*/\r\n}\r\n"

/***/ }),

/***/ "./app/views/filter/view.html":
/***/ (function(module, exports) {

module.exports = "<mat-card id=\"query\">\r\n\t<table>\r\n\t\t<tr><td>\r\n\t\t\t<button mat-icon-button (click)=\"false\">\r\n\t\t\t\t<mat-icon fontSet=\"fa\" fontIcon=\"fa-crosshairs\"></mat-icon>\r\n\t\t\t</button>\r\n\t\t</td><td>\r\n\t\t\t<mat-form-field floatPlaceholder=\"never\">\r\n\t\t\t\t<input matInput placeholder=\"Search\" (keyup.enter)=\"false\">\r\n\t\t\t</mat-form-field>\r\n\t\t</td><td>\r\n\t\t\t<button mat-icon-button (click)=\"filters.toggle()\">\r\n\t\t\t\t<mat-icon fontSet=\"fa\" fontIcon=\"fa-ellipsis-v\">\r\n\t\t\t\t</mat-icon>\r\n\t\t\t</button>\r\n\t\t</td></tr>\r\n\t</table>\r\n\r\n\t<mat-expansion-panel #filters hideToggle=\"true\">\r\n\t\t<mat-expansion-panel-header [collapsedHeight]=\"0\" [expandedHeight]=\"0\">\r\n\t\t</mat-expansion-panel-header>\r\n\r\n\t\t<mat-tab-group>\r\n\t\t\t<mat-tab label=\"Organisations\">&nbsp;</mat-tab>\r\n\t\t\t<mat-tab label=\"Categories\">&nbsp;</mat-tab>\r\n\t\t\t<mat-tab label=\"Suburbs\">&nbsp;</mat-tab>\r\n\t\t\t<mat-tab label=\"Target Groups\">&nbsp;</mat-tab>\r\n\t\t\t<mat-tab label=\"Tags\">&nbsp;</mat-tab>\r\n\t\t</mat-tab-group>\r\n\t</mat-expansion-panel>\r\n</mat-card>\r\n\r\n<mat-accordion id=\"selectables\" [ngClass]=\"{ 'mat-expanded': selection|async }\">\r\n\t<mat-expansion-panel *ngFor=\"let selectable of selectables|async\"\r\n\t\t(opened)=\"selection.next(selectable)\" (closed)=\"selection.next(null)\">\r\n\r\n\t\t<mat-expansion-panel-header>\r\n\t\t\t<mat-panel-title>{{selectable.name}}</mat-panel-title>\r\n\t\t\t<mat-panel-description>{{selectable.category.name}}</mat-panel-description>\r\n\t\t</mat-expansion-panel-header>\r\n\r\n\t\t<!--  -->\r\n\t\t\t<dl><dt>Description</dt><dd>{{selectable.description}}</dd><dt>Schedule</dt>\r\n\t\t\t<dd>{{selectable.schedule}}</dd><dt>Address</dt>\r\n\t\t\t<dd>{{selectable.address.street}} {{selectable.address.houseNumber}}</dd>\r\n\t\t\t<dd>{{selectable.address.postalCode}} {{selectable.address.place}}</dd>\r\n\t\t\t<dd>{{selectable.address.suburb?.name}}</dd></dl>\r\n\t\t<!--  -->\r\n\t</mat-expansion-panel>\r\n</mat-accordion>\r\n"

/***/ }),

/***/ "./app/views/mapping/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MappingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__ = __webpack_require__("./node_modules/ngx-openlayers/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_openlayers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MappingComponent = (function () {
    function MappingComponent() {
        // @Input()
        // public configuration: Observable<Activity[]> = null;
        this.selectables = null;
        this.selection = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */]();
    }
    MappingComponent.prototype.center = function (address) {
        this.view.instance.animate({
            center: [address.longitude, address.latitude],
            duration: 1000
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */])
    ], MappingComponent.prototype, "selectables", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */])
    ], MappingComponent.prototype, "selection", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__["MapComponent"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__["MapComponent"])
    ], MappingComponent.prototype, "map", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__["ViewComponent"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ngx_openlayers__["ViewComponent"])
    ], MappingComponent.prototype, "view", void 0);
    MappingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: 'mapping-component',
            styles: [__webpack_require__("./app/views/mapping/style.css")],
            template: __webpack_require__("./app/views/mapping/view.html")
        })
    ], MappingComponent);
    return MappingComponent;
}());

// public focus(address: Address, zoom: number): void {
// 	if (address.latitude === 0 || address.longitude === 0) { return; }
//
// 	this.viewComponent.instance.animate({
// 		center: [address.longitude, address.latitude],
// 		duration: 1000,
// 		zoom: 15
// 	});
// }
// public jump(address: Address): void {
// 	if (address.latitude === 0 || address.longitude === 0) { return; }
//
// 	this.viewComponent.instance.animate({
// 		duration: 1000,
// 		zoom: 15
// 	}, {
// 		duration: 1000,
// 		zoom: 20
// 	});
//
// 	this.viewComponent.instance.animate({
// 		center: [address.longitude, address.latitude],
// 		duration: 2000
// 	});
// }
// public activities: BehaviorSubject<Activity[]> =
// 	new BehaviorSubject<Activity[]>([]);
// public activity: BehaviorSubject<Activity> =
// 	new BehaviorSubject<Activity>(null);
// public following: BehaviorSubject<boolean> =
// 	new BehaviorSubject<boolean>(false);
// constructor(
// 	private configurationService: ConfigurationService,
// 	private locationService: LocationService
// ) { }
// public ngAfterViewInit(): void {
// 	this.mapComponent.loadTilesWhileAnimating = true;
// 	this.mapComponent.loadTilesWhileInteracting = true;
//
// 	this.activities.subscribe((i) => { console.log(i); });
// 	this.activity.subscribe((i) => { console.log(i); });
// }
// public ngOnDestroy(): void {
// 	this.configurationService.disconnect();
// 	this.locationService.disconnect();
// }
// public ngOnInit(): void {
// 	this.configurationService.connect();
//
// 	this.configurationService.filter('mapcenterLatitude')
// 		.subscribe((i) => { this.latitude = parseFloat(i[0].value); });
//
// 	this.configurationService.filter('mapcenterLongitude')
// 		.subscribe((i) => { this.longitude = parseFloat(i[0].value); });
//
// 	this.configurationService.filter('mapProjection')
// 		.subscribe((i) => { this.projection = i[0].value; });
//
// 	this.configurationService.filter('zoomfactor')
// 		.subscribe((i) => { this.zoom = parseInt(i[0].value, 10); });
//
// 	this.following.subscribe((i) => i
// 		? this.locationService.filter().subscribe((i) => { this.center(i[0]); })
// 		: this.locationService.disconnect()
// 	);
// }


/***/ }),

/***/ "./app/views/mapping/style.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./app/views/mapping/view.html":
/***/ (function(module, exports) {

module.exports = "<!-- <aol-map *ngIf=\"latitude && longitude && projection && zoom\">\r\n\t<aol-interaction-default></aol-interaction-default>\r\n\t<aol-view [zoom]=\"zoom\">\r\n\t\t<aol-coordinate [x]=\"longitude\" [y]=\"latitude\" [srid]=\"projection\"></aol-coordinate>\r\n\t</aol-view>\r\n\t<aol-layer-tile>\r\n\t\t<aol-source-osm></aol-source-osm>\r\n\t</aol-layer-tile>\r\n</aol-map> -->\r\n"

/***/ }),

/***/ "./main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_module__ = __webpack_require__("./app/app.module.ts");



Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2_app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ "./node_modules/moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map