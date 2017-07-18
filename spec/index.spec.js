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
                var capture = new ImageCapture({kind: 'audio'});
            }).toThrow();
        });

        it('constructor should fail if MediaStreamTrack kind is missing', function() {
            expect(function() {
                var capture = new ImageCapture({});
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
                
                expect(p.redEyeReduction).toBeDefined();
                expect(p.imageHeight).toBeDefined();
                expect(p.imageWidth).toBeDefined();
                expect(p.fillLightMode).toBeDefined();
                expect(p.redEyeReduction).toBe('boolean');
                expect(p.imageHeight.max).toBeDefined();
                expect(p.imageHeight.min).toBeDefined();
                expect(p.imageHeight.step).toBeDefined();
                expect(typeof p.imageHeight.max).toBe('number');
                expect(typeof p.imageHeight.min).toBe('number');
                expect(typeof p.imageHeight.step).toBe('number');
                expect(p.imageWidth.max).toBeDefined();
                expect(p.imageWidth.min).toBeDefined();
                expect(p.imageWidth.step).toBeDefined();
                expect(typeof p.imageWidth.max).toBe('number');
                expect(typeof p.imageWidth.min).toBe('number');
                expect(typeof p.imageWidth.step).toBe('number');
                var fillMode = ["auto","off","flash"];
                expect(fillMode).toContain(p.fillLightMode);
            })
        });
    });

    describe('getPhotoSettings', function () {
        it('should return a Promise', function () {
            var capture = new ImageCapture({ kind: 'video'});
            var p = capture.getPhotoSettings();
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
            p.then(function(info){
                
                expect(p.redEyeReduction).toBeDefined();
                expect(p.imageHeight).toBeDefined();
                expect(p.imageWidth).toBeDefined();
                expect(p.fillLightMode).toBeDefined();
                expect(p.redEyeReduction).toBe('boolean');
                expect(typeof p.imageHeight).toBe('number');
                expect(typeof p.imageWidth).toBe('number');
                var fillMode = ["auto","off","flash"];
                expect(fillMode).toContain(p.fillLightMode);
            })
        });
    });

    describe('grabFrame', function () {
        it('should return a Promise', function () {
            var capture = new ImageCapture({ kind: 'video'});
            var p = capture.grabFrame();
            expect(p).toBeDefined();
            expect(typeof p === 'object').toBe(true);
        });
    });
});
