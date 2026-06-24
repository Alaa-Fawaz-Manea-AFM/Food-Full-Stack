import sendResponsive from '../utils/sendResponsive';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const [users] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          role: Role.USER,
        },
        take: 3,
        select: {
          id: true,
          name: true,
          orders: true,
        },
      }),
    ]);

    return sendResponsive(users, 'Home page data fetched successfully');
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: { id: true },
    });

    return sendResponsive(null, 'User updated successfully');
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });

    return sendResponsive(null, 'User deleted successfully');
  }
}
