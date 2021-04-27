import { Controller, Get } from '@nestjs/common';
import { ParticipantRepository } from '../infra/db/repository/participantRepository';
import { getAllUsecase } from '../usecase/participant/getAllUsecase';

@Controller('participant')
export class ParticipantController {
  // curl -X GET http://localhost:3000/participant
  @Get() async getAll() {
    const repo = new ParticipantRepository();
    const usecase = new getAllUsecase(repo);
    return await usecase.do();
  }

  /*
    // curl -X GET http://localhost:3000/participant
    @Get()
    async getAll(): Promise<participantDataDTO[]> {
        const repo = new participantRepository();
        const usecase = new getAllUsecase(repo);
        return await usecase.do();
    }
    // curl -X GET http://localhost:3000/participant/3
    @Get('/:id')
    async getOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<participantDataDTO[]> {
        const repo = new participantRepository();
        const usecase = new getOneUsecase(repo);
        return await usecase.do(id);
    }

    // curl -X POST http://localhost:3000/participant -d 'text=TEST'
    @Post()
    async insert(@Body('text') text: string): Promise<participant> {
        const repo = new participantRepository();
        const usecase = new insertUseCase(repo);
        //throw new HttpException('aaa',HttpStatus.BAD_REQUEST)
        return await usecase.do(text);
    }

    // curl -X DELETE http://localhost:3000/participant/1
    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<participant> {
        const repo = new participantRepository();
        const usecase = new deleteUseCase(repo);
        return await usecase.do(id);
    }

    // curl -X PATCH http://localhost:3000/participant/6 -d 'text=updated'
    @Patch('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body('text') text: string,
    ): Promise<participant> {
        const repo = new participantRepository();
        const usecase = new updateUseCase(repo);
        return await usecase.do(id, text);
    }
 */
}
