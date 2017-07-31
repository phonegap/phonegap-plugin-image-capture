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

/* globals Camera, resolveLocalFileSystemURL, FileEntry, CameraPopoverOptions, FileTransfer, FileUploadOptions, LocalFileSystem, MSApp */
/* jshint jasmine: true */

exports.defineManualTests = function(contentEl, createActionButton) {
    var frontCamera = false ;
    var flashON = false;
    var setPicture = function() {
        var constraints = {
            'audio': true,
            'video': {
                facingMode: 'environment'
            }
        }
        if(frontCamera === true){
            constraints.video.facingMode = 'user';
        }
        navigator.mediaDevices.getUserMedia(constraints
        ).then(function(getmedia) {
            var track = getmedia.getVideoTracks()[0];
            var imageCapture = new ImageCapture(track);
            var options = {
                imageHeight: 800,
                imageWidth: 600,
                fillLightMode: "off"
            };
            if(flashON === true){
                options.fillLightMode = "flash";
            }
            imageCapture.takePhoto(options)
                .then(blob => {
                    console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');

                    const image = document.getElementById('info');
                    image.src = URL.createObjectURL(blob);
                })
                .catch(err => console.error('takePhoto() failed: ', err));

        });


    };

    var clickPicture = '<div id="Take_Picture"></div>';

    var flash = '<div id="flash"></div>';

    var flashText = '<div id="flashText"> Press button above to Turn the Flash ON</div>';



    contentEl.innerHTML = '<img id="info"></img>' + clickPicture + flash + flashText;

    createActionButton('Rear Camera', function() {
        if(frontCamera === true){
            frontCamera = false;
        }
        setPicture();
    }, "Take_Picture");
    createActionButton('Front Camera', function() {
        if(frontCamera === false){
            frontCamera = true;
        }
        setPicture();
    }, "Take_Picture");
    createActionButton('Flash', function() {
        if(flashON === false){
            flashON = true;
            document.getElementById('flashText').innerHTML = "Press button above to Turn the Flash OFF";
        } else {
            flashON = false;
            document.getElementById('flashText').innerHTML = "Press button above to Turn the Flash ON";
        }
    }, "flash");
    
};