/* globals require, describe, beforeEach, it, expect */

/*!
 * Module dependencies.
 */

var cordova = require('./helper/cordova'),
    ImageCapture = require('../www/ImageCapture'),
    execSpy,
    execWin,
    options;

/*!
 * Specification.
 */

describe('phonegap-plugin-image-capture', function () {
    /*
    beforeEach(function () {
        execWin = jasmine.createSpy();
        execSpy = spyOn(cordova.required, 'cordova/exec').andCallFake(execWin);
    });
    */

    describe('ImageCapture', function () {
        it('should exist', function () {
            expect(ImageCapture).toBeDefined();
            expect(typeof ImageCapture === 'function').toBe(true);
        });

        it('should take a MediaStreamTrack as constructor arguement', function() {
            var capture = new ImageCapture({ kind: 'video'});
            expect(capture).toBeDefined();
            expect(typeof capture === 'object').toBe(true);
        });

        it('constructor should fail if MediaStreamTrack kind is not video', function() {
            expect(function() {
                new ImageCapture({kind: 'audio'});
            }).toThrow();
        });

        it('constructor should fail if MediaStreamTrack kind is missing', function() {
            expect(function() {
                new ImageCapture({});
            }).toThrow();
        });

        it('should contain a track property', function () {
            var capture = new ImageCapture({ kind: 'video'});
            expect(capture.track).toBeDefined();
            expect(typeof capture.track === 'object').toBe(true);
        });

        it('should contain a takePhoto function', function () {
            var capture = new ImageCapture({ kind: 'video'});
            expect(capture.takePhoto).toBeDefined();
            expect(typeof capture.takePhoto === 'function').toBe(true);
        });

        it('should contain a getPhotoCapabilities function', function () {
            var capture = new ImageCapture({ kind: 'video'});
            expect(capture.getPhotoCapabilities).toBeDefined();
            expect(typeof capture.getPhotoCapabilities === 'function').toBe(true);
        });

        it('should contain a grabFrame function', function () {
            var capture = new ImageCapture({ kind: 'video'});
            expect(capture.grabFrame).toBeDefined();
            expect(typeof capture.grabFrame === 'function').toBe(true);
        });
        it('should contain a getPhotoSettings function', function () {
            var capture = new ImageCapture({ kind: 'video'});
            expect(capture.getPhotoSettings).toBeDefined();
            expect(typeof capture.getPhotoSettings === 'function').toBe(true);
        });
        it('should contain a setOptions function', function () {
            var capture = new ImageCapture({ kind: 'video'});
            expect(capture.setOptions).toBeDefined();
            expect(typeof capture.setOptions === 'function').toBe(true);
        });
    });

    describe('takePhoto', function () {
        it('should return a Promise with all types of photoSettings', function () {
            var capture = new ImageCapture({ kind: 'video'});
            var photoSettings = {
                imageHeight : 800,
                imageWidth : 600
            };
            var p = capture.takePhoto(photoSettings);
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            photoSettings = {};
            p = capture.takePhoto(photoSettings);
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            photoSettings = {
                redEyeReduction : false,
                imageHeight : 500,
                imageWidth : 500,
                fillLightMode : "flash"
            };
            p = capture.takePhoto(photoSettings);
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            photoSettings = {
                redEyeReduction : false,
                fillLightMode : "flash"
            };
            p = capture.takePhoto(photoSettings);
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            photoSettings = {
                fillLightMode : "off"
            };
            p = capture.takePhoto(photoSettings);
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            photoSettings = {
                redEyeReduction : true
            };
            p = capture.takePhoto(photoSettings);
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);

        });
    });

    describe('getPhotoCapabilities', function () {
        it('should return a Promise', function () {
            var capture = new ImageCapture({ kind: 'video'});
            var p = capture.getPhotoCapabilities();
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            p.then(function(info){

                expect(info.redEyeReduction).toBeDefined();
                expect(info.imageHeight).toBeDefined();
                expect(info.imageWidth).toBeDefined();
                expect(info.fillLightMode).toBeDefined();
                expect(info.redEyeReduction).toBe('boolean');
                expect(info.imageHeight.max).toBeDefined();
                expect(info.imageHeight.min).toBeDefined();
                expect(info.imageHeight.step).toBeDefined();
                expect(typeof info.imageHeight.max).toBe('number');
                expect(typeof info.imageHeight.min).toBe('number');
                expect(typeof info.imageHeight.step).toBe('number');
                expect(info.imageWidth.max).toBeDefined();
                expect(info.imageWidth.min).toBeDefined();
                expect(info.imageWidth.step).toBeDefined();
                expect(typeof info.imageWidth.max).toBe('number');
                expect(typeof info.imageWidth.min).toBe('number');
                expect(typeof info.imageWidth.step).toBe('number');
                var fillMode = ["auto","off","flash"];
                expect(fillMode).toContain(info.fillLightMode);
            });
        });
    });

    describe('getPhotoSettings', function () {
        it('should return a Promise with default PhotoSettings', function () {
            var capture = new ImageCapture({ kind: 'video'});
            var p = capture.getPhotoSettings();
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            p.then(function(info){
                expect(info.redEyeReduction).toBeDefined();
                expect(info.imageHeight).toBeDefined();
                expect(info.imageWidth).toBeDefined();
                expect(info.fillLightMode).toBeDefined();
                expect(info.redEyeReduction).toBe('boolean');
                expect(typeof info.imageHeight).toBe('number');
                expect(typeof info.imageWidth).toBe('number');
                var fillMode = ["auto","off","flash"];
                expect(fillMode).toContain(info.fillLightMode);
            });
        });
    });

    describe('grabFrame', function () {
        it('should return a rejected Promise', function (done) {
            var capture = new ImageCapture({ kind: 'video'});
            var p = capture.grabFrame();
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            p.then(function() {
                done(new Error('Promise should not get resolved'));
            }, function(reason) {
                expect(typeof reason === 'object').toBe(true);
                console.log(reason);
                done(); // Success
            });
        });
    });

    describe('setOptions', function () {
        it('should return a Promise', function () {
            var capture = new ImageCapture({ kind: 'video'});
            var photoSettings = {
                imageHeight : 800,
                imageWidth : 600
            };
            var p = capture.setOptions(photoSettings);
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);

        });
    });

});
