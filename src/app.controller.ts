import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto } from './data.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() data: DataDto) {
    return this.appService.saveDocs(data);
  }
}
