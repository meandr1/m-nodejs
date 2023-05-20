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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageFilterOptions } from 'src/images/image.filter';
import { ExtendedRequest } from 'src/common/request.interface';
import { FILE_TYPES_STR } from 'src/common/constants';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.vehiclesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return await this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.vehiclesService.remove(id);
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
    return await this.vehiclesService.addImage(id, files);
  }

  @Delete('image/:id')
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    return await this.vehiclesService.deleteImageByID(id);
  }
}
