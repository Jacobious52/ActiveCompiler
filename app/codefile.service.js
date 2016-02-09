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
    var CodeFileService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ;
            CodeFileService = (function () {
                function CodeFileService() {
                }
                CodeFileService.prototype.fetchProblems = function () {
                    var url = 'http://localhost:5000/problems';
                    // js scoping trick. because javascript doesnt preserve 'this' like c++
                    var that = this;
                    var req = new XMLHttpRequest();
                    req.open('GET', url, true);
                    req.onreadystatechange = function () {
                        if (req.readyState == 4 && req.status == 200) {
                            var resp = JSON.parse(req.responseText);
                            that.problems = resp['problems'];
                            that.loaded = true;
                            if (that.onUpdate) {
                                that.onUpdate();
                            }
                            else {
                                console.error('update: no RequestUpdateCallback for onUpdate');
                            }
                        }
                    };
                    req.onerror = function () {
                        that.loaded = false;
                        console.error('something went wrong with request to server :(');
                    };
                    req.send();
                };
                CodeFileService.prototype.getProblems = function () {
                    var probNames = new Array();
                    for (var i = 0; i < this.problems.length; ++i) {
                        var p = this.problems[i];
                        probNames.push(p['name']);
                    }
                    console.log('problems loaded: ' + probNames.length);
                    return probNames;
                };
                CodeFileService.prototype.getFiles = function (problemName) {
                    for (var i = 0; i < this.problems.length; ++i) {
                        var p = this.problems[i];
                        if (p['name'] == problemName) {
                            return p['files'];
                        }
                    }
                };
                CodeFileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CodeFileService);
                return CodeFileService;
            })();
            exports_1("CodeFileService", CodeFileService);
        }
    }
});
//# sourceMappingURL=codefile.service.js.map