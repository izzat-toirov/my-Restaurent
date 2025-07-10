import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuImagesService } from './menu_images.service';
import { CreateMenuImageDto } from './dto/create-menu_image.dto';
import { UpdateMenuImageDto } from './dto/update-menu_image.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@ApiBearerAuth()
@Controller('menu-images')
@UseGuards(JwtGuard)
export class MenuImagesController {
  constructor(private readonly menuImagesService: MenuImagesService) {}

  @Roles('SUPER_ADMIN','ADMIN')
  @Post()
  @ApiOperation({ summary: 'Upload menu image ✨' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Menu image uploaded successfully 🎉' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: { fileSize: Infinity },
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMenuImageDto: CreateMenuImageDto,
  ) {
    const imagePath = file ? `/uploads/${file.filename}` : null;

    const finalData = {
      ...createMenuImageDto,
      image: imagePath,
    };

    return this.menuImagesService.create(finalData);
  }

  @ApiQuery({ name: 'menu_id', required: false })
  @Get()
  findAll(@Query('menu_id') menu_id?: string) {
    return this.menuImagesService.findAll({ menu_id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuImagesService.findOne(+id);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuImageDto: UpdateMenuImageDto,
  ) {
    return this.menuImagesService.update(+id, updateMenuImageDto);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuImagesService.remove(+id);
  }
}
