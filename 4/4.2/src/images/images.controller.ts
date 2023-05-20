import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('images')
@Controller('images')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return await this.imagesService.getImageByID(res, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.imagesService.deleteImageByID(id);
  }
}
