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
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),

    // Database configuration module
    DynamooseModule.forRoot(),

    // Environment configuration

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Authentication modules
    JwtModule.register({
      secret: 'mySecretJWTPassword', // Ensure you provide a secret
      signOptions: { expiresIn: '2d' }, // Set token expiration
    }),

    PassportModule.register({ defaultStrategy: 'google' }), // Register Google strategy as default

    AuthModule,

    // basic modules
    UserModule,
    CommunityModule,
    ProductModule,
    UserModule,
    CreatorModule,
    WishlistModule,
    UploadModule,
    UserAuthenticationModule,
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
