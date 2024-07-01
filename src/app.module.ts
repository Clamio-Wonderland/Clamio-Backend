import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CommunityModule } from './community/community.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { WishListModule } from './wish-list/wish-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Use environment variable
        signOptions: { expiresIn: '2d' },
      }),
      inject: [ConfigService], // Inject ConfigService to use in useFactory
    }),
    PassportModule.register({ defaultStrategy: 'google' }), // Register Google strategy as default
    AuthModule, // Import AuthModule
    UserModule, 
    CommunityModule, 
    ProductModule, WishListModule, // Import other modules
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
