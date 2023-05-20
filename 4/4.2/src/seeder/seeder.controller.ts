import { Controller, Post, Delete, UseGuards } from '@nestjs/common';
import { PlanetsSeederService } from './planets.seeder.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SpeciesSeederService } from './species.seeder.service';
import { StarshipsSeederService } from './starships.seeder.service';
import { VehiclesSeederService } from './vehicles.seeder.service';
import { PeopleSeederService } from './people.seeder.service';
import { FilmsSeederService } from './films.seeder.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('seeder')
@Controller('seeder')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class SeederController {
  constructor(
    private readonly planetsSeederService: PlanetsSeederService,
    private readonly speciesSeederService: SpeciesSeederService,
    private readonly starshipsSeederService: StarshipsSeederService,
    private readonly vehiclesSeederService: VehiclesSeederService,
    private readonly peopleSeederService: PeopleSeederService,
    private readonly filmsSeederService: FilmsSeederService
  ) {}

  @Post()
  async fillDB() {
    await this.planetsSeederService.fillPlanets();
    await this.speciesSeederService.fillSpecies();
    await this.starshipsSeederService.fillStarships();
    await this.vehiclesSeederService.fillVehicles();
    await this.peopleSeederService.fillPeople();
    await this.filmsSeederService.fillFilms();
    return {
      status: 'OK',
      code: 201,
      message: 'Database seeded successfully'
    };
  }

  @Delete()
  async clearDB() {
    await this.filmsSeederService.clearFilms();
    await this.peopleSeederService.clearPeople();
    await this.vehiclesSeederService.clearVehicles();
    await this.starshipsSeederService.clearStarships();
    await this.speciesSeederService.clearSpecies();
    await this.planetsSeederService.clearPlanets();
    return {
      status: 'OK',
      code: 200,
      message: 'Database cleared successfully'
    };
  }
}
