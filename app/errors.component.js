System.register(['angular2/core', './errors.service', './user.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, errors_service_1, user_service_1;
    var ErrorsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (errors_service_1_1) {
                errors_service_1 = errors_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            ErrorsComponent = (function () {
                function ErrorsComponent(_errorsService, _userService) {
                    this._errorsService = _errorsService;
                    this._userService = _userService;
                    this.editDistance = 0;
                    this.score = 0;
                    this.fatal = false;
                }
                ErrorsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // callback for errors compiled
                    this._errorsService.onUpdate = function (errors, editDistance, scoreModifier) {
                        _this.errors = errors;
                        _this.editDistance = editDistance;
                        _this.score += scoreModifier;
                        // update student's global score
                        _this._userService.score = _this.score;
                        _this.fatal = false;
                    };
                    // callback for errors compiling failed
                    this._errorsService.onError = function (errors) {
                        _this.fatal = true;
                        _this.editDistance = 0;
                    };
                    // callback for user login with score
                    this._userService.onLogin = function (score) {
                        _this.score = score;
                    };
                };
                ErrorsComponent = __decorate([
                    core_1.Component({
                        selector: 'errors',
                        templateUrl: 'app/errors.component.html'
                    }), 
                    __metadata('design:paramtypes', [errors_service_1.ErrorsService, user_service_1.UserService])
                ], ErrorsComponent);
                return ErrorsComponent;
            })();
            exports_1("ErrorsComponent", ErrorsComponent);
        }
    }
});
//# sourceMappingURL=errors.component.js.map