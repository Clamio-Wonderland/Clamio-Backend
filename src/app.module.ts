import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { CommunityModule } from './community/community.module';
import { GoogleStrategy } from './strategies/google.strategy';


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: 'myjwtsecret', // Replace with configService.get('JWT_SECRET') in production
        signOptions: { expiresIn: '2d' },
      }),
      inject: [ConfigService], // Inject ConfigService to use in useFactory
    }),
    PassportModule.register({ defaultStrategy: 'google' }), // Register Google strategy as default
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule available globally
    }),
    AuthModule, // Import AuthModule
    UserModule, CommunityModule, ProductModule, // Import UserModule
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
