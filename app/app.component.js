System.register(['angular2/core', './code.component', './errors.component', './codefile.service', './errors.service', './user.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, code_component_1, errors_component_1, codefile_service_1, errors_service_1, user_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (code_component_1_1) {
                code_component_1 = code_component_1_1;
            },
            function (errors_component_1_1) {
                errors_component_1 = errors_component_1_1;
            },
            function (codefile_service_1_1) {
                codefile_service_1 = codefile_service_1_1;
            },
            function (errors_service_1_1) {
                errors_service_1 = errors_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_userService) {
                    this._userService = _userService;
                    this.user = '';
                    this.validUser = false;
                    this.regex = /a\d{7}/;
                }
                AppComponent.prototype.logout = function () {
                    // log student leaving
                    this._userService.logout();
                    this.user = '';
                    this.validUser = false;
                    location.reload();
                };
                AppComponent.prototype.checkValid = function () {
                    this.validUser = this.regex.test(this.user);
                    // if true, correct user id. log to server
                    if (this.validUser) {
                        this._userService.login(this.user);
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/app.component.html',
                        directives: [code_component_1.CodeComponent, errors_component_1.ErrorsComponent],
                        providers: [codefile_service_1.CodeFileService, errors_service_1.ErrorsService, user_service_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map