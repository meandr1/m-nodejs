import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { Response } from 'express';

@ApiTags('images')
@Controller('images')
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
