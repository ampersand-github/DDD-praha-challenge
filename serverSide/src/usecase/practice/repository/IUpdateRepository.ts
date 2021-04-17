import { Practice } from '@prisma/client';

export interface IUpdateRepository {
  update(id: number, title: string): Promise<Practice>;
}
