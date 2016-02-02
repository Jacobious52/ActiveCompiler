System.register(['./mock-codefiles', 'angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var mock_codefiles_1, core_1;
    var CodeFileService;
    return {
        setters:[
            function (mock_codefiles_1_1) {
                mock_codefiles_1 = mock_codefiles_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CodeFileService = (function () {
                function CodeFileService() {
                }
                CodeFileService.prototype.getFiles = function () {
                    return Promise.resolve(mock_codefiles_1.FILES);
                };
                CodeFileService.prototype.addFile = function (file) {
                    mock_codefiles_1.FILES.push(file);
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