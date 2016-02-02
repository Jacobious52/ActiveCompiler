System.register(['angular2/core', './errors.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, errors_service_1;
    var ErrorsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (errors_service_1_1) {
                errors_service_1 = errors_service_1_1;
            }],
        execute: function() {
            ErrorsComponent = (function () {
                function ErrorsComponent(_errorsService) {
                    this._errorsService = _errorsService;
                }
                ErrorsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._errorsService.onUpdate = function (errors) {
                        _this.errors = errors;
                    };
                };
                ErrorsComponent = __decorate([
                    core_1.Component({
                        selector: 'errors',
                        template: "\n              <h4 *ngIf=\"_errorsService.compiling\">Compiling..</h4>\n              <div *ngIf=\"errors\">\n                <div *ngFor=\"#error of errors\" class=\"alert alert-danger\" role=\"alert\">{{error}}</div>\n              </div>\n              "
                    }), 
                    __metadata('design:paramtypes', [errors_service_1.ErrorsService])
                ], ErrorsComponent);
                return ErrorsComponent;
            })();
            exports_1("ErrorsComponent", ErrorsComponent);
        }
    }
});
//# sourceMappingURL=errors.component.js.map