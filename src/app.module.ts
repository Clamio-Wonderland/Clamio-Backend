import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Authentication modules
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './strategies/google.strategy';

// Database connection
import { DynamooseModule } from 'nestjs-dynamoose';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CommunityModule } from './community/community.module';
import { CreatorModule } from './creator/creator.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),

    // Database configuration module
    DynamooseModule.forRoot(),

    // Environment configuration
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),

    // Authentication modules 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Use environment variable
        signOptions: { expiresIn: '2d' },
      }),
      inject: [ConfigService], // Inject ConfigService to use in useFactory
    }),

    PassportModule.register({ defaultStrategy: 'google' }), // Register Google strategy as default

    AuthModule, 

    // basic modules
    UserModule, 
    CommunityModule, 
    ProductModule,
    UserModule, 
    CreatorModule, 
    WishlistModule, UploadModule,
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
