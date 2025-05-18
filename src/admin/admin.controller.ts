import { Controller, Delete, Get, Inject, Param, Query } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { AdminService } from './admin.service';
import { QueryDto } from './dto/query.dto';

@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    @Inject(AdminService)
    private readonly adminService: AdminService,
  ) {}

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.adminService.findAll(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Get('/inactives')
  inactives() {
    return this.adminService.inactives();
  }
}
