/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
/* globals DOMException, Promise, self, cordova */

var argscheck = cordova.require('cordova/argscheck');
var exec = cordova.require('cordova/exec');

var ImageCapture = function (mediaStreamTrack) {
    this.track = mediaStreamTrack;
    this.photoSettings = {};
    if (!this.track || this.track.kind !== 'video') {
        throw new DOMException();
    }
    return this;
};

ImageCapture.prototype.takePhoto = function (photoSettings) {
    var getValue = argscheck.getValue;
    var trackLabel = this.track.label;
    return new Promise(function (resolve, reject) {
        var success = function (info) {
            // if fetch exists & it is a native implementation
            // use it as it is much faster
            if (self.fetch && (/\{\s*\[native code\]\s*\}/).test('' + fetch)) { // eslint-disable-line no-undef
                fetch('data:image/png;base64,' + info) // eslint-disable-line no-undef
                    .then(function (res) {
                        return res.blob();
                    })
                    .then(function (blob) {
                        resolve(blob);
                    })
                    .catch(function () {
                    });
            } else {
                var sliceSize = 1024;
                var byteCharacters = atob(info.replace(/\s/g, '')); // eslint-disable-line no-undef
                var bytesLength = byteCharacters.length;
                var slicesCount = Math.ceil(bytesLength / sliceSize);
                var byteArrays = new Array(slicesCount);
                for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                    var begin = sliceIndex * sliceSize;
                    var end = Math.min(begin + sliceSize, bytesLength);
                    var bytes = new Array(end - begin);
                    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                        bytes[i] = byteCharacters[offset].charCodeAt(0);
                    }
                    byteArrays[sliceIndex] = new Uint8Array(bytes);
                }
                var blob = new Blob(byteArrays, { // eslint-disable-line no-undef
                    type: 'image/png'
                });
                resolve(blob);
            }
        };

        var fail = function (error) {
            reject(error);
        };

        // setup default settings for takePhoto
        if (!photoSettings) {
            photoSettings = {};
        }
        var redEyeReduction = getValue(photoSettings.redEyeReduction, false);
        var imageHeight = getValue(photoSettings.imageHeight, 1920);
        var imageWidth = getValue(photoSettings.imageWidth, 1080);
        var fillLightMode = getValue(photoSettings.fillLightMode, 'off');

        var args = [redEyeReduction, imageHeight, imageWidth, fillLightMode,
            trackLabel
        ];

        exec(success, fail, 'ImageCapture', 'takePicture', args);
    });
};

ImageCapture.prototype.getPhotoCapabilities = function () {
    var trackLabel = this.track.label;
    return new Promise(function (resolve, reject) {
        var success = function (info) {
            console.log('success' + JSON.stringify(info));
            resolve(info);
        };
        var fail = function (error) {
            reject(error);
        };
        exec(success, fail, 'ImageCapture', 'getPhotoCapabilities', [trackLabel]);
    });
};

ImageCapture.prototype.getPhotoSettings = function () {
    var trackLabel = this.track.label;
    return new Promise(function (resolve, reject) {
        var success = function (info) {
            console.log('success' + JSON.stringify(info));
            resolve(info);
        };
        var fail = function (error) {
            reject(error);
        };
        exec(success, fail, 'ImageCapture', 'getPhotoSettings', [trackLabel]);
    });
};

ImageCapture.prototype.grabFrame = function () {
    return new Promise(function (resolve, reject) {
        var name = 'UnknownError';
        var description = '';
        var domException = new DOMException(description, name);
        reject(domException);
    });
};
ImageCapture.prototype.setOptions = function (photoSettings) {
    return new Promise(function (resolve, reject) {
        this.photoSettings = photoSettings;
    });
};

module.exports = ImageCapture;
