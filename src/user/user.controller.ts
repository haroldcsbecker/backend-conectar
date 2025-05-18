import { Controller, Get, Body, Patch, Inject, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Roles(Role.USER, Role.ADMIN)
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get('/profile')
  findOne(@Request() request) {
    return this.userService.findOne(+request.user.id);
  }

  @Patch('/update')
  update(@Request() request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+request.user.id, updateUserDto);
  }
}
