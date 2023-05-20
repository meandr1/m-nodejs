import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UploadedFiles,
  BadRequestException
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFilterOptions } from 'src/images/image.filter';
import { ExtendedRequest } from 'src/common/request.interface';
import { FILE_TYPES_STR } from 'src/common/constants';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.filmsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.filmsService.remove(id);
  }

  @Post('image/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateImageDto })
  @UseInterceptors(FilesInterceptor('files', 10, imageFilterOptions))
  async uploadImage(
    @Req() req: ExtendedRequest,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Param('id') id: number
  ) {
    if (req?.fileValidationError === 'UNSUPPORTED_FILE_TYPE') {
      throw new BadRequestException(
        `Only ${FILE_TYPES_STR} file types supported`
      );
    }
    return await this.filmsService.addImage(id, files);
  }

  @Delete('image/:id')
  async deleteImage(@Param('id') id: number) {
    return await this.filmsService.deleteImageByID(id);
  }
}
