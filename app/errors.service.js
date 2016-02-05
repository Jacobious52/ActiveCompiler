System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ErrorsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ;
            ErrorsService = (function () {
                function ErrorsService() {
                    this.compiling = false;
                }
                ErrorsService.prototype.fetchErrors = function (files) {
                    var url = 'http://localhost:5000/build/id/a1687803';
                    var body = JSON.stringify({ 'files': files });
                    // js scoping trick. because javascript doesnt preserve 'this' like c++
                    var that = this;
                    var req = new XMLHttpRequest();
                    req.open('POST', url, true);
                    req.setRequestHeader('Content-Type', 'application/json');
                    req.onreadystatechange = function () {
                        if (req.readyState == 4 && req.status == 200) {
                            var resp = JSON.parse(req.responseText);
                            that.errors = resp['errors'];
                            console.log(that.errors);
                            that.compiling = false;
                            console.info('request received');
                            if (that.onUpdate) {
                                that.onUpdate(that.errors);
                            }
                            else {
                                console.error('update: no ErrorUpdateCallback for onUpdate');
                            }
                        }
                    };
                    req.onerror = function () {
                        that.compiling = false;
                        console.error('something went wrong with request to server :(');
                        if (that.onError) {
                            that.onError([req.statusText]);
                        }
                        else {
                            console.error('update: no ErrorUpdateCallback for onError');
                        }
                    };
                    req.send(body);
                    this.compiling = true;
                    this.errors = [];
                    if (this.onUpdate) {
                        this.onUpdate(this.errors);
                    }
                    else {
                        console.error('update: ErrorUpdateCallback not bound to ErrorsComponent');
                    }
                };
                ErrorsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ErrorsService);
                return ErrorsService;
            })();
            exports_1("ErrorsService", ErrorsService);
        }
    }
});
//# sourceMappingURL=errors.service.js.map