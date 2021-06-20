import { PrismaClient } from '@prisma/client';

export const truncateAllTable = async () => {
  const prisma = new PrismaClient();
  const allTable = await prisma.$queryRaw`SELECT tablename
                              FROM pg_tables
                              WHERE schemaname = 'public'`;

  // tablenameはタイポじゃないよ
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const { tablename } of await allTable) {
    const tableName = tablename;
    if (tableName !== '_prisma_migrations') {
      try {
        await prisma.$queryRaw(`TRUNCATE TABLE "public"."${tableName}" CASCADE;`);
      } catch (error) {
        console.log({ error });
      }
    }
  }
  await prisma.$disconnect();
};
