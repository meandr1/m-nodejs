import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/constants';
import { BCryptService } from './bcrypt.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthService, BCryptService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
