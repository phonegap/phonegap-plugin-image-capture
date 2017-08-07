// Type definitions for Apache Cordova Camera plugin
// Project: https://github.com/apache/cordova-plugin-camera
// Definitions by: Microsoft Open Technologies Inc <http://msopentech.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// 
// Copyright (c) Microsoft Open Technologies Inc
// Licensed under the MIT license.

/**
 * This plugin provides an API for taking pictures for iOS and Android
 */
interface ImageCapture {
    /**
     * Takes a photo using the camera
     * @param cameraSuccess Success callback, that get the image
     * as a base64-encoded String, or as the URI for the image file.
     * @param cameraError Error callback, that get an error message.
     * @param cameraOptions Optional parameters to customize the camera settings.
     */
    takePhoto(
        cameraSuccess: (data: blob) => void,
        cameraError: (message: string) => void,
        photoSettings?: PhotoSettings): void;

    /**
     * Gets the photo capabilities of the device camera
     * @param successHandler Success callback
     * @param errorHandler Error callback
     */
    getPhotoCapabilities(
        successHandler: (data: void) => void,
        errorHandler: (message: string) => void): void;

    /**
     * Gets the photosettings of the device camera
     * @param successHandler Success callback
     * @param errorHandler Error callback
     */
    getPhotoSettings(
        successHandler: (data: void) => PhotoSettings,
        errorHandler: (message: string) => void): void;

}

interface PhotoSettings {
    /** RedEyeReduction in boolean. Default is false */
    redEyeReduction?: boolean;
    /**
     * Width in pixels to scale image.
    */
    imageWidth?: number;
    /**
     * Height in pixels to scale image.
     */
    imageHeight?: number;
    /**
     * Set the type of flash mode.
     *      fillLightMode: "off"   set the flash off
     * DEFAULT.
     *      fillLightMode: "flash" set the flash on   
     *      fillLightMode : "auto" set flash mode to auto
     */
    fillLightMode?: string;
}

