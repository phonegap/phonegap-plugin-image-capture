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
        it('should return a Promise', function () {
            var capture = new ImageCapture({ kind: 'video'});
            var p = capture.takePhoto();
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
                expect(p.whiteBalanceMode).toBeDefined();
                expect(p.colorTemperature).toBeDefined();
                expect(p.exposureMode).toBeDefined();
                expect(p.exposureCompensation).toBeDefined();
                expect(p.iso).toBeDefined();
                expect(p.redEyeReduction).toBeDefined();
                expect(p.focusMode).toBeDefined();
                expect(p.brightness).toBeDefined();
                expect(p.contrast).toBeDefined();
                expect(p.saturation).toBeDefined();
                expect(p.imageHeight).toBeDefined();
                expect(p.imageWidth).toBeDefined();
                expect(p.zoom).toBeDefined();
                expect(p.fillLightMode).toBeDefined();
                var meterMode = ["none", "manual","single-shot","continuous"];
                expect(meterMode).toContain(p.whiteBalanceMode);
                expect(p.colorTemperature.max).toBeDefined();
                expect(p.colorTemperature.min).toBeDefined();
                expect(p.colorTemperature.current).toBeDefined();
                expect(p.colorTemperature.step).toBeDefined();
                expect(p.colorTemperature.max).toBe('number');
                expect(p.colorTemperature.min).toBe('number');
                expect(p.colorTemperature.current).toBe('number');
                expect(p.colorTemperature.step).toBe('number');
                expect(meterMode).toContain(p.exposureMode);
                expect(p.exposureCompensation.max).toBeDefined();
                expect(p.exposureCompensation.min).toBeDefined();
                expect(p.exposureCompensation.current).toBeDefined();
                expect(p.exposureCompensation.step).toBeDefined();
                expect(p.exposureCompensation.max).toBe('number');
                expect(p.exposureCompensation.min).toBe('number');
                expect(p.exposureCompensation.current).toBe('number');
                expect(p.exposureCompensation.step).toBe('number');
                expect(p.iso.max).toBeDefined();
                expect(p.iso.min).toBeDefined();
                expect(p.iso.current).toBeDefined();
                expect(p.iso.step).toBeDefined();
                expect(p.iso.max).toBe('number');
                expect(p.iso.min).toBe('number');
                expect(p.iso.current).toBe('number');
                expect(p.iso.step).toBe('number');
                expect(p.redEyeReduction).toBe('boolean');
                expect(p.brightness.max).toBeDefined();
                expect(p.brightness.min).toBeDefined();
                expect(p.brightness.current).toBeDefined();
                expect(p.brightness.step).toBeDefined();
                expect(p.brightness.max).toBe('number');
                expect(p.brightness.min).toBe('number');
                expect(p.brightness.current).toBe('number');
                expect(p.brightness.step).toBe('number');
                expect(p.contrast.max).toBeDefined();
                expect(p.contrast.min).toBeDefined();
                expect(p.contrast.current).toBeDefined();
                expect(p.contrast.step).toBeDefined();
                expect(p.contrast.max).toBe('number');
                expect(p.contrast.min).toBe('number');
                expect(p.contrast.current).toBe('number');
                expect(p.contrast.step).toBe('number');
                expect(p.saturation.max).toBeDefined();
                expect(p.saturation.min).toBeDefined();
                expect(p.saturation.current).toBeDefined();
                expect(p.saturation.step).toBeDefined();
                expect(p.saturation.max).toBe('number');
                expect(p.saturation.min).toBe('number');
                expect(p.saturation.current).toBe('number');
                expect(p.saturation.step).toBe('number');
                expect(p.sharpness.max).toBeDefined();
                expect(p.sharpness.min).toBeDefined();
                expect(p.sharpness.current).toBeDefined();
                expect(p.sharpness.step).toBeDefined();
                expect(p.sharpness.max).toBe('number');
                expect(p.sharpness.min).toBe('number');
                expect(p.sharpness.current).toBe('number');
                expect(p.sharpness.step).toBe('number');
                expect(p.imageHeight.max).toBeDefined();
                expect(p.imageHeight.min).toBeDefined();
                expect(p.imageHeight.current).toBeDefined();
                expect(p.imageHeight.step).toBeDefined();
                expect(p.imageHeight.max).toBe('number');
                expect(p.imageHeight.min).toBe('number');
                expect(p.imageHeight.current).toBe('number');
                expect(p.imageHeight.step).toBe('number');
                expect(p.imageWidth.max).toBeDefined();
                expect(p.imageWidth.min).toBeDefined();
                expect(p.imageWidth.current).toBeDefined();
                expect(p.imageWidth.step).toBeDefined();
                expect(p.imageWidth.max).toBe('number');
                expect(p.imageWidth.min).toBe('number');
                expect(p.imageWidth.current).toBe('number');
                expect(p.imageWidth.step).toBe('number');
                expect(p.zoom.max).toBeDefined();
                expect(p.zoom.min).toBeDefined();
                expect(p.zoom.current).toBeDefined();
                expect(p.zoom.step).toBeDefined();
                expect(p.zoom.max).toBe('number');
                expect(p.zoom.min).toBe('number');
                expect(p.zoom.current).toBe('number');
                expect(p.zoom.step).toBe('number');
                var fillMode = ["unavailable","auto","off","flash","torch"];
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
