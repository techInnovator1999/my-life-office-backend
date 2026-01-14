import { AllConfigType } from '@/config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FcmService {
  fcm;

  constructor(private configService: ConfigService<AllConfigType>) {}

  private getFirebaseCredentials(): ServiceAccount | null {
    // Try to load from environment variable (for production/Render)
    const fcmCredentials = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (fcmCredentials) {
      try {
        return JSON.parse(fcmCredentials) as ServiceAccount;
      } catch (error) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', error);
      }
    }

    // Try to load from local file (for development)
    try {
      const serverKey = require('./fcmtoken.json');
      return serverKey as ServiceAccount;
    } catch (error) {
      console.warn('FCM token file not found. Firebase notifications will be disabled.');
      return null;
    }
  }

  getFcmInstance() {
    if (this.fcm == null) {
      const credentials = this.getFirebaseCredentials();
      
      if (!credentials) {
        console.warn('Firebase credentials not available. Notifications will be disabled.');
        return null;
      }

      this.fcm = admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
    }
    return this.fcm;
  }
  async SendNotification(fcmToken, title, body, data = {}, imageUrl?: string) {
    return new Promise((resolve, reject) => {
      const fcmInstance = this.getFcmInstance();
      
      if (!fcmInstance) {
        console.warn('FCM not initialized. Skipping notification.');
        return resolve({ success: false, message: 'FCM not configured' });
      }

      const message: any = {
        token: fcmToken,

        data: {
          sound: 'default',
          icon: this.configService.getOrThrow('notification.notificationLogo', {
            infer: true,
          }),
          color: '#6246EA',
          imageUrl: imageUrl ?? '',
          ...data,
        },
      };

      const notification: any = {
        title,
        body,
      };
      message.notification = notification;

      const dryRun = false;
      fcmInstance
        .messaging()
        .send(message, dryRun)
        .then((response) => {
          console.log('Successfully sent message:', response);
          return resolve(response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
          return reject(error);
        });
    });
  }
}
