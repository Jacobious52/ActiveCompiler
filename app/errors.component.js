System.register(['angular2/core', './errors.service', './user.service', './serverpath'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, errors_service_1, user_service_1, serverpath_1;
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
            },
            function (serverpath_1_1) {
                serverpath_1 = serverpath_1_1;
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
                // TODO: put this into one of the service classes
                ErrorsComponent.prototype.loadScore = function () {
                    var url = serverpath_1.SERVER_PATH + 'user/id/' + this._userService.userID;
                    // js scoping trick. because javascript doesnt preserve 'this' like c++
                    var that = this;
                    var req = new XMLHttpRequest();
                    req.open('GET', url, true);
                    req.setRequestHeader('Content-Type', 'application/json');
                    req.onreadystatechange = function () {
                        if (req.readyState == 4 && req.status == 200) {
                            var resp = JSON.parse(req.responseText);
                            that.score = resp['score'];
                        }
                        req.onerror = function () {
                            console.error('something went wrong with request to server :(');
                        };
                    };
                    req.send();
                };
                ErrorsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._errorsService.onUpdate = function (errors, editDistance, scoreModifier) {
                        _this.errors = errors;
                        _this.editDistance = editDistance;
                        _this.score += scoreModifier;
                        _this.fatal = false;
                    };
                    this._errorsService.onError = function (errors) {
                        _this.fatal = true;
                        _this.editDistance = 0;
                    };
                    this.loadScore();
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