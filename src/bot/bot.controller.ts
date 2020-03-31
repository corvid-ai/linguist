import { Body, Controller, Post } from '@nestjs/common';
import { DataDto } from './../data.dto';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  saveDoc(@Body() data: DataDto) {
    return this.botService.saveDocs(data);
  }
}
