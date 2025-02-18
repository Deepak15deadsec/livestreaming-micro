import { Module } from '@nestjs/common';
import { GstreamerModule } from './gstreamer/gstreamer.module';


@Module({
  imports: [GstreamerModule],
  controllers: [],
  providers: [],
})
export class GstreamerAppModule {}
