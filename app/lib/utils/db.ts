import { PrismaClient } from '@prisma/client'
import { logger } from '../log/logger';

const prismaClientSingleton = () => {
  return new PrismaClient(
    {
      log: [
        {
          emit: 'event',
          level: 'query',
        }
      ],
    }
  )
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

prisma.$on('query', (e) => {
  logger.info({Parmas: e.params,Query: e.query},"耗时: %sms",e.duration)
})

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma