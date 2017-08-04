
<!---
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->


# phonegap-plugin-image-capture [![Build Status](https://travis-ci.org/phonegap/phonegap-plugin-image-capture.svg)](https://travis-ci.org/phonegap/phonegap-plugin-image-capture)

This plugin provides an implementation for clicking pictures with a device camera based on the [W3C MediaStream Image Capture API](https://www.w3.org/TR/image-capture/) for iOS and Android. In order to achieve the image capture, this plugin uses the [phonegap-plugin-media-stream](https://github.com/phonegap/phonegap-plugin-media-stream) which is based on the [W3C Media Stream API](https://www.w3.org/TR/mediacapture-streams/). The phonegap-plugin-media-stream makes the mediastream track available to the phonegap-plugin-image-capture which allows the user to click a picture. The phonegap-plugin-media-stream is added as a dependency to the phonegap-plugin-image-capture plugin.



## Installation


    phonegap plugin add phonegap-plugin-image-capture

    phonegap plugin add https://github.com/phonegap/phonegap-plugin-image-capture.git


## ImageCapture Constructor

The ImageCapture constructor uses the mediastream track obtained by using the phonegap-plugin-media-stream to create an object.

### Example

            navigator.mediaDevices.getUserMedia({
                'audio': true,
                'video': {
                    facingMode: 'user'
                }
            }).then(function(getmedia) {

                var track = getmedia.getVideoTracks()[0];
                var imageCapture = new ImageCapture(track);
            });


## The `imageCapture` object

The imageCapture object has the following methods:

- [takePhoto(optional PhotoSettings photoSettings)](https://github.com/phonegap/phonegap-plugin-image-capture#imagecapturetakephotooptional-photosettings-photosettings)
- [getPhotoCapabilities()](https://github.com/phonegap/phonegap-plugin-image-capture#imagecapturegetphotocapabilities)
- [getPhotoSettings()](https://github.com/phonegap/phonegap-plugin-image-capture#imagecapturegetphotosettings)
- [grabFrame()](https://github.com/phonegap/phonegap-plugin-image-capture#imagecapturegrabframe)



##  imageCapture.takePhoto(optional PhotoSettings photoSettings)

The takePhoto() promise accepts an optional PhotoSettings parameter and allows the user to take a picture. The implementation in iOS allows the user to open a camera view and click a picture. Android has integrated support for the [W3C Media Stream API](https://www.w3.org/TR/mediacapture-streams/) and the [W3C MediaStream Image Capture API](https://www.w3.org/TR/image-capture/) from Chrome 59 and the latest Android System Webview. The takePhoto() promise resolves with a `blob` on successful capture of a picture.

### Example

            imageCapture.takePhoto()
                .then(blob => {
                    console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');
                    const image = document.querySelector('img'); // img is an <img> tag
                    image.src = URL.createObjectURL(blob);
                })
                .catch(err => console.error('takePhoto() failed: ', err));


## imageCapture.getPhotoCapabilities()

The getPhotoCapabilities() method retrieves the ranges of available configuration options, if any. The promise returns the value of the following four properties if available:

- redEyeReduction : Value can be one of `never` , `always` and `controllable` if available.
- imageHeight : Has `max`, `min` and `step` values if available.
- imageWidth : Has `max`, `min` and `step` values if available.
- fillLightMode : Value can be one of `auto`, `flash` and `off` if available.


### Example
        

            imageCapture.getPhotoCapabilities()
                .then(function(capabilities){
                    console.log(capabilities);
                });


## imageCapture.getPhotoSettings()

This method returns the current configuration values for the settings for taking a picture. The following values are returned by this promise :

- redEyeReduction _(Boolean)_ ,if available.
- imageHeight  _(Number)_
- imageWidth  _(Number)_
- fillLightMode : One of the three values : `auto`, `flash` and `off` ,if available.

### Example
        

            imageCapture.getPhotoSettings()
                .then(function(settings){
                    console.log(settings);
                });
        



## imageCapture.grabFrame()

This method takes a snapshot of the live video being held in the mediastream track, returning an ImageBitmap if successful. This method is not supported on iOS and rejected promise with `DOMException` on iOS.


## [Contributing](https://github.com/phonegap/phonegap-plugin-image-capture/blob/master/.github/CONTRIBUTING.md)

## [LICENSE](https://github.com/phonegap/phonegap-plugin-image-capture/blob/master/LICENSE)

## Quirks

In order to add a `blob` object as a source for an `img` tag, `blob:` should be added to the img-src part of the Content-Security-Policy meta tag in your `index.html` . 

