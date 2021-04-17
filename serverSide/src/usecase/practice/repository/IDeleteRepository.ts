import { Practice } from '@prisma/client';

export interface IDeleteRepository {
  delete(id: number): Promise<Practice>;
}
