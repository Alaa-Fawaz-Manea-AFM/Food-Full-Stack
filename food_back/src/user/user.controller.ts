import { Controller, Delete, Patch, Body, Req, Get } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './user.service';
import { ADMIN } from 'src/utils/constant';
import RolesDecorator from 'src/decorator/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @RolesDecorator(ADMIN)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Patch()
  updateUserTeacher(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    return this.usersService.updateUser(req.user.userId, updateUserDto);
  }

  @Delete('')
  deleteUser(@Req() req: any) {
    return this.usersService.deleteUser(req.user.userId);
  }
}
