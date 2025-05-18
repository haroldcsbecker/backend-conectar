import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { AdminService } from './admin.service';

@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    @Inject(AdminService)
    private readonly adminService: AdminService,
  ) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
