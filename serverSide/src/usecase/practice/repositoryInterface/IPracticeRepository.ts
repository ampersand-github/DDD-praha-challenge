import { Practice } from '@prisma/client';
import { PracticeDataDTO } from '../dto/practiceDataDTO';

export interface IPracticeRepository {
  getAll(): Promise<PracticeDataDTO[]>;
  getOne(id: number): Promise<PracticeDataDTO[]>;
  insert(text: string): Promise<Practice>;
  update(id: number, title: string): Promise<Practice>;
  delete(id: number): Promise<Practice>;
}
