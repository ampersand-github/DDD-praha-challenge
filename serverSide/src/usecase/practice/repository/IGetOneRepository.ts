import { PracticeDataDTO } from '../practiceDataDTO';

export interface IGetOneRepository {
  getOne(id: number): Promise<PracticeDataDTO[]>;
}
