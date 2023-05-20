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
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFilterOptions } from 'src/images/image.filter';
import { ExtendedRequest } from 'src/common/request.interface';
import { FILE_TYPES_STR } from 'src/common/constants';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('planets')
@Controller('planets')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  async create(@Body() createPlanetDto: CreatePlanetDto) {
    return await this.planetsService.create(createPlanetDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.planetsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.planetsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanetDto: UpdatePlanetDto
  ) {
    return await this.planetsService.update(id, updatePlanetDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.planetsService.remove(id);
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
    return await this.planetsService.addImage(id, files);
  }

  @Delete('image/:id')
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return await this.planetsService.deleteImageByID(id);
  }
}
