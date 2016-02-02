System.register(['angular2/core', './codefile.service', './errors.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, codefile_service_1, errors_service_1;
    var CodeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (codefile_service_1_1) {
                codefile_service_1 = codefile_service_1_1;
            },
            function (errors_service_1_1) {
                errors_service_1 = errors_service_1_1;
            }],
        execute: function() {
            CodeComponent = (function () {
                function CodeComponent(_codeFileService, _errorsService) {
                    this._codeFileService = _codeFileService;
                    this._errorsService = _errorsService;
                    this._editorLoaded = false;
                }
                CodeComponent.prototype.loadFiles = function () {
                    var _this = this;
                    this._codeFileService.getFiles().then(function (files) {
                        _this.files = files;
                        _this.selectedFile = _this.files[0];
                    });
                };
                CodeComponent.prototype.ngOnInit = function () {
                    this.loadFiles();
                };
                CodeComponent.prototype.ngAfterViewChecked = function () {
                    // nasty 'hack' to load codeeditor after dom rendered
                    if (document.getElementById('editor') && !this._editorLoaded) {
                        this._editorLoaded = true;
                        var editor = ace.edit("editor");
                        editor.$blockScrolling = Infinity;
                        editor.setTheme("ace/theme/xcode");
                        editor.getSession().setMode("ace/mode/c_cpp");
                        document.getElementById('editor').style.fontSize = '14px';
                        this.setCurrentFile(this.files[0]);
                    }
                };
                CodeComponent.prototype.getEditor = function () {
                    return ace.edit('editor').getSession();
                };
                CodeComponent.prototype.setCurrentFile = function (file) {
                    if (!file) {
                        this.getEditor().setValue('');
                        return;
                    }
                    this.selectedFile = file;
                    this.getEditor().setValue(file.body);
                };
                CodeComponent.prototype.syncEditorFile = function () {
                    this.selectedFile.body = this.getEditor().getValue();
                };
                CodeComponent.prototype.onSelect = function (file) {
                    // update code before change
                    this.syncEditorFile();
                    // goto new selected tabs
                    this.setCurrentFile(file);
                };
                CodeComponent.prototype.newFile = function () {
                    if (!this.newFileName) {
                        this.newFileName = 'new.h';
                    }
                    if (!this.newFileName.trim()) {
                        this.newFileName = 'new.h';
                    }
                    this.files.push({
                        'name': this.newFileName, 'body': ''
                    });
                    this.newFileName = '';
                    this.onSelect(this.files[this.files.length - 1]);
                };
                CodeComponent.prototype.deleteFile = function () {
                    if (this.selectedFile.name == 'main.cpp') {
                        return;
                    }
                    var index = this.files.indexOf(this.selectedFile, 0);
                    if (index != undefined) {
                        var newIndex = 0;
                        if (index != 0) {
                            newIndex = index - 1;
                        }
                        this.files.splice(index, 1);
                        this.selectedFile = this.files[newIndex];
                        this.setCurrentFile(this.selectedFile);
                    }
                };
                CodeComponent.prototype.compile = function (file) {
                    this.syncEditorFile();
                    this._errorsService.fetchErrors(this.files);
                };
                CodeComponent = __decorate([
                    core_1.Component({
                        selector: 'code',
                        templateUrl: 'app/code.component.html'
                    }), 
                    __metadata('design:paramtypes', [codefile_service_1.CodeFileService, errors_service_1.ErrorsService])
                ], CodeComponent);
                return CodeComponent;
            })();
            exports_1("CodeComponent", CodeComponent);
        }
    }
});
//# sourceMappingURL=code.component.js.map