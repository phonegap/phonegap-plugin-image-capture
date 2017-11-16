/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import "CDVImageCapture.h"
#import "CameraViewController.h"
#import <AVFoundation/AVFoundation.h>

#ifndef __CORDOVA_4_0_0
#import <Cordova/NSData+Base64.h>
#endif


@interface CDVImageCapture ()

@property (readwrite, assign) BOOL hasPendingOperation;
@property (assign, nonatomic) AVCaptureDevicePosition position;
@property (nonatomic, assign) CGSize targetSize;
@property (nonatomic, assign) CGSize defaultSize;
@property (readwrite, assign) BOOL redEyeReduction;
@property (assign, nonatomic) UIDeviceOrientation orientation;
@end


@implementation CDVImageCapture

@synthesize hasPendingOperation;

- (void)takePicture:(CDVInvokedUrlCommand*)command
{

    self.redEyeReduction  = [command.arguments[0] boolValue];
    NSNumber* imageHeight = [command argumentAtIndex:1 withDefault:nil];
    NSNumber* imageWidth = [command argumentAtIndex:2 withDefault:nil];
    _targetSize = CGSizeMake(0, 0);
    if ((imageHeight != nil) && (imageWidth != nil)) {
        _targetSize = CGSizeMake([imageWidth floatValue], [imageHeight floatValue]);
    }
    NSString *fillLightMode  = command.arguments[3];
    NSString *cameraDirection  = command.arguments[4];
    //store callback to use in delegate
    self.command = command;
    __weak CDVImageCapture* weakSelf = self;

    CameraViewController *cameraViewController = [[CameraViewController alloc] init];
    cameraViewController.camDirection = cameraDirection;
    if([fillLightMode isEqualToString:@"flash"]){
        cameraViewController.flashModeValue = AVCaptureFlashModeOn;
    }
    else if([fillLightMode isEqualToString:@"off"]){
        cameraViewController.flashModeValue = AVCaptureFlashModeOff;
    }
    else if([fillLightMode isEqualToString:@"auto"]){
        cameraViewController.flashModeValue = AVCaptureFlashModeAuto;
    }
    cameraViewController.mediaStreamInterface = self;
    cameraViewController.task = @"imageCapture";
    [weakSelf.viewController presentViewController:cameraViewController animated:YES completion:^{
        weakSelf.hasPendingOperation = NO;
    }];


}
- (void)receiveError
{
    //NSString *outputString = outputURL.absoluteString;
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Image Capture Failed"];
    [self.commandDelegate sendPluginResult:result callbackId:self.command.callbackId];
}


- (void)receiveImage:(UIImage *)image
{
    NSLog(@"%f", image.size.height);
    NSLog(@"%f", image.size.width);
    _defaultSize = CGSizeMake(image.size.width , image.size.height);
    NSData *imageData = UIImageJPEGRepresentation(image, 1.0);
    UIImage* scaledImage = nil;
    if((self.targetSize.width > 0) && (self.targetSize.height >0)){
        // scaledImage = [image imageByScalingNotCroppingForSize:self.targetSize];
        if (CGSizeEqualToSize(image.size, self.targetSize) == NO) {
            UIGraphicsBeginImageContext( self.targetSize);
            [image drawInRect:CGRectMake(0,0,self.targetSize.width,self.targetSize.height)];
            scaledImage = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
            imageData = UIImageJPEGRepresentation(scaledImage, 1.0);
        }
    }
    NSLog(@"%f", scaledImage.size.height);
    NSLog(@"%f", scaledImage.size.width);
    NSString *base64 = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:base64];
    [self.commandDelegate sendPluginResult:result callbackId:self.command.callbackId];
}

- (AVCaptureDevice *)getCaptureDevice:(int)facing
{
    NSArray *devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    for (AVCaptureDevice *device in devices) {
        if ([device position] == facing) {
            return device;
        }
    }
    return nil;
}

- (void)getPhotoCapabilities:(CDVInvokedUrlCommand*)command
{
    NSString *desc  = command.arguments[0];


    if([desc isEqualToString:@"frontcamera"]){
        _position = AVCaptureDevicePositionFront;
    }
    else if([desc isEqualToString:@"rearcamera"]){
        _position = AVCaptureDevicePositionBack;
    }

    NSArray *devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    NSMutableArray *flashMode = [[NSMutableArray alloc] initWithCapacity:10];
    NSMutableDictionary *photocapabilities = [NSMutableDictionary dictionaryWithCapacity:10];
    for (AVCaptureDevice *device in devices){
        if(device.position == _position){
            if([device isFlashModeSupported:AVCaptureFlashModeOn]){
                [flashMode addObject:@"flash"];
            }
            if([device isFlashModeSupported:AVCaptureFlashModeOff]){
                [flashMode addObject:@"off"];
            }
            if([device isFlashModeSupported:AVCaptureFlashModeAuto]){
                [flashMode addObject:@"auto"];
            }
            [photocapabilities setObject:flashMode forKey:@"fillLightMode"];

            int max_w = 0;
            int min_w = INT_MAX;
            int max_h = 0;
            int min_h = INT_MAX;

            NSArray* availFormats=device.formats;
            for (AVCaptureDeviceFormat* format in availFormats) {
                CMVideoDimensions resolution = format.highResolutionStillImageDimensions;
                int w = resolution.width;
                int h = resolution.height;
                NSLog(@"width=%d height=%d", w, h);

                if (w > max_w) {
                    max_w = w;
                }
                if (w < min_w) {
                    min_w = w;
                }
                if (h > max_h) {
                    max_h = h;
                }
                if (h < min_h) {
                    min_h = h;
                }
            }

            NSDictionary *imageHeight = @{
                                          @"max": [NSNumber numberWithInteger:max_h],
                                          @"min": [NSNumber numberWithInteger:min_h],
                                          @"step": [NSNumber numberWithInteger:0]
                                          };
            [photocapabilities setObject:imageHeight forKey:@"imageHeight"];

            NSDictionary *imageWidth = @{
                                         @"max": [NSNumber numberWithInteger:max_w],
                                         @"min": [NSNumber numberWithInteger:min_w],
                                         @"step": [NSNumber numberWithInteger:0]
                                         };
            [photocapabilities setObject:imageWidth forKey:@"imageWidth"];

            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:photocapabilities];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            return;
        }
    }

}

- (void)getPhotoSettings:(CDVInvokedUrlCommand*)command
{
    NSString *desc  = command.arguments[0];
    AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    NSMutableDictionary *photoSettings = [NSMutableDictionary dictionaryWithCapacity:4];
    if([desc isEqualToString:@"frontcamera"]){
        device = [self getCaptureDevice:AVCaptureDevicePositionFront];
    }
    else if([desc isEqualToString:@"rearcamera"]){
        device = [self getCaptureDevice:AVCaptureDevicePositionBack];;
    }

    if([device flashMode] == AVCaptureFlashModeOff){
        [photoSettings setObject:@"off" forKey:@"fillLightMode"];
    }
    else if([device flashMode] == AVCaptureFlashModeOn){
        [photoSettings setObject:@"flash" forKey:@"fillLightMode"];
    }
    else if([device flashMode] == AVCaptureFlashModeAuto){
        [photoSettings setObject:@"auto" forKey:@"fillLightMode"];
    }
    if((self.defaultSize.width > 0) && (self.defaultSize.height >0)){
        [photoSettings setObject:[NSNumber numberWithFloat:self.defaultSize.width] forKey:@"imageWidth"];
        [photoSettings setObject:[NSNumber numberWithFloat:self.defaultSize.height] forKey:@"imageHeight"];

    }

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:photoSettings];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];

}

@end
