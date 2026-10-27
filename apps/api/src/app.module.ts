import { Module } from '@nestjs/common';
import { PlansModule } from './plans/plans.module';
import { HealthController } from './health.controller';

@Module({ imports: [PlansModule], controllers: [HealthController] })
export class AppModule {}
