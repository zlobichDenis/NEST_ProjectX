import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma-client';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
