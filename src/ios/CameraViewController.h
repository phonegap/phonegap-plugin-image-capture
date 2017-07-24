//
//  CameraViewController.h
//  HelloCordova
//
//  Created by smacdona on 7/21/17.
//
//

#import <UIKit/UIKit.h>
#import "CDVImageCapture.h"

@interface CameraViewController : UIViewController
@property (assign, nonatomic) NSString *camDirection;
@property (assign, nonatomic) NSInteger flashModeValue;
@property (strong,nonatomic) CDVImageCapture * imageCaptureInterface;
@end
