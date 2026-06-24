import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangePasswordDto } from '../validators/changePassword.dto';
import sendResponsive from '../utils/sendResponsive';
import type { CookieOptions, Response } from 'express';
import SignUpAuthDto from './dto/sign-up-auth.dto';
import SignInAuthDto from './dto/sign-in-auth.dto';
import { PrismaService } from '../prisma.service';
import { PayloadTokenType } from '../types/type';
import AppConfig from '../config/app.config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private config: AppConfig,
  ) {}

  secureCookieOptions = (type = 'accessToken'): CookieOptions => {
    if (process.env.NODE_ENV === 'development') return {};
    return {
      httpOnly: true,
      secure: this.config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: this.config.COOKIE_MAX_AGE1,
    };
  };

  async signUp(signUpAuthDto: SignUpAuthDto, res: Response) {
    const { email } = signUpAuthDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (existingUser) throw new BadRequestException('Email already in use');

    return await this.prisma.$transaction(async (prisma) => {
      const hashedPassword = await hash(signUpAuthDto.password, 12);
      const user = await prisma.user.create({
        data: { ...signUpAuthDto, password: hashedPassword },
        select: {
          id: true,
          name: true,
          role: true,
          cartCounts: true,
        },
      });

      const { id: userId, role } = user;

      const payload: PayloadTokenType = {
        userId,
        role,
      };

      const accessToken = await this.JWTSign(payload);

      res.cookie('accessToken', accessToken, this.secureCookieOptions());
      return sendResponsive(user, 'Logged in successfully');
    });
  }

  async login(signInAuthDto: SignInAuthDto, res: Response) {
    const { email, password } = signInAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email: email.toLocaleLowerCase() },
      select: {
        id: true,
        name: true,
        role: true,
        cartCounts: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    let { id: userId, role } = user;
    const payload: PayloadTokenType = {
      userId,
      role,
    };

    const accessToken = await this.JWTSign(payload);

    res.cookie('accessToken', accessToken, this.secureCookieOptions());

    return sendResponsive(
      {
        id: userId,
        name: user.name,
        cartCounts: user.cartCounts,
        role: user.role,
      },
      'Logged in successfully',
    );
  }

  async logout(res: Response) {
    res.clearCookie('accessToken').clearCookie('refreshToken');
    return sendResponsive(null, 'Logged out successfully');
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    if (oldPassword === newPassword)
      throw new BadRequestException('Invalid credentials');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Invalid credentials');

    const isMatch = await compare(oldPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const hashedPassword = await hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return sendResponsive(null, 'Password updated successfully');
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        cartCounts: true,
        role: true,
      },
    });

    return sendResponsive(user, 'User data successfully');
  }

  async JWTSign(payload: PayloadTokenType) {
    return await this.jwtService.signAsync(payload);
  }
}
