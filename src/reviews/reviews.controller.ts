import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtGuard } from '../common/guards/user.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Roles('CUSTOMER', 'ADMIN', 'SUPER_ADMIN')
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
