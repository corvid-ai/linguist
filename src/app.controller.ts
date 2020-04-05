import { Body, Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto } from './data.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postDoc(@Body() data: DataDto) {
    return this.appService.saveDocs(data);
  }

  @Get()
  getDoc() {
    return this.appService.getInfo();
  }
}
