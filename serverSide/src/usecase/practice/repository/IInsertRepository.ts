import { Practice } from '@prisma/client';

export interface IInsertRepository {
  insert(text: string): Promise<Practice>;
}
