import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  Req,
  UploadedFiles,
  BadRequestException
} from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFilterOptions } from 'src/images/image.filter';
import { ExtendedRequest } from 'src/common/request.interfase';
import { FILE_TYPES_STR } from 'src/common/constants';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  async create(@Body() createStarshipDto: CreateStarshipDto) {
    return await this.starshipsService.create(createStarshipDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.starshipsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.starshipsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStarshipDto: UpdateStarshipDto
  ) {
    return await this.starshipsService.update(id, updateStarshipDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.starshipsService.remove(id);
  }

  @Post('image/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateImageDto })
  @UseInterceptors(FilesInterceptor('files', 10, imageFilterOptions))
  async uploadImage(
    @Req() req: ExtendedRequest,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (req?.fileValidationError === 'UNSUPPORTED_FILE_TYPE') {
      throw new BadRequestException(
        `Only ${FILE_TYPES_STR} file types supported`
      );
    }
    return await this.starshipsService.addImage(id, files);
  }

  @Delete('image/:id')
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return await this.starshipsService.deleteImageByID(id);
  }
}
