import { PracticeDataDTO } from '../practiceDataDTO';

export interface IGetAllRepository {
  getAll(): Promise<PracticeDataDTO[]>;
}
