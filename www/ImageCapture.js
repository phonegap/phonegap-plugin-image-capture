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
/* globals DOMException, Promise, self */

//var argscheck = require('cordova/argscheck'),
var exec = require('cordova/exec');

var ImageCapture = function(mediaStreamTrack) {
    this.track = mediaStreamTrack;
    this.photoSettings = {};
    if (!this.track || this.track.kind !== 'video') {
        throw new DOMException();
    }
    return this;
};

ImageCapture.prototype.takePhoto = function() {
    var trackDesc = this.track.description;
    return new Promise(function(resolve, reject) {
        var success = function(info) {
            console.log('success' + info);

            // if fetch exists & it is a native implementation
            // use it as it is much faster
            if (self.fetch && (/\{\s*\[native code\]\s*\}/).test('' + fetch)) {
                fetch('data:image/png;base64,' + info)
                    .then(function(res) {
                        return res.blob();
                    })
                    .then(function(blob) {
                        resolve(blob);
                    })
                    .catch(function() {
                        reject();
                    });
            } else {
                var byteCharacters = atob(info);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], {
                    type: 'image/png'
                });
                resolve(blob);
            }
        };

        var fail = function(error) {
            reject(error);
        };

        var options = {
            whiteBalanceMode: null,
            colorTemperature: null,
            exposureMode: null,
            exposureCompensation: null,
            iso: null,
            focusMode: true,
            imageHeight: null,
            imageWidth: null,
            fillLightMode: 0,
            cameraDirection: trackDesc
        };

        var args = [options.whiteBalanceMode, options.colorTemperature, options.exposureMode,
            options.exposureCompensation, options.iso, options.focusMode,
            options.imageHeight, options.imageWidth, options.fillLightMode,
            options.cameraDirection
        ];

        exec(success, fail, "Camera", "takePicture", args);
    });
};

ImageCapture.prototype.getPhotoCapabilities = function() {
    var trackDesc = this.track.description;
    return new Promise(function(resolve, reject) {
        var success = function(info) {
            console.log('success' + JSON.stringify(info));
        };
        var fail = function(error) {
            reject(error);
        };
 exec(success, fail, "Camera", "getPhotoCapabilities", [trackDesc]);
    });
};

ImageCapture.prototype.grabFrame = function() {
    return new Promise(function(resolve, reject) {

    });
};
ImageCapture.prototype.setOptions = function(photoSettings) {
    return new Promise(function(resolve, reject) {
        this.photoSettings = photoSettings;
    });
};

module.exports = ImageCapture;
