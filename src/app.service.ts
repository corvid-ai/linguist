import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { DataDto } from './data.dto';
import { Keys } from './keys.enum';

@Injectable()
export class AppService {
  // keys: Keys
  async saveDocs(data: DataDto) {
    const doc = new GoogleSpreadsheet(
      '1frwFx0ZLf6GakVwhvsa4SAgVGm5x9fbLPOXCHEyJFuk',
    );
    doc.useApiKey('AIzaSyA_Dlko2wsrIVryFRLkKGadPUXVkldn5pw');
    await doc.useServiceAccountAuth(Keys);

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    try {
      await sheet.addRow(data);
      return new HttpException('Success', 200);
    } catch (err) {
      return new BadRequestException(err);
    }
  }

  async getInfo() {
    const doc = new GoogleSpreadsheet(
      '1frwFx0ZLf6GakVwhvsa4SAgVGm5x9fbLPOXCHEyJFuk',
    );
    doc.useApiKey('AIzaSyA_Dlko2wsrIVryFRLkKGadPUXVkldn5pw');
    await doc.useServiceAccountAuth(Keys);

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0];
    const rows: [] = await sheet.getRows();

    try {
      const words = [];
      rows.forEach(res => {
        const resp: any = res;
        words.push(resp._rawData);
      });

      return new HttpException(words, 200);
    } catch (err) {
      return new BadRequestException(err);
    }
  }
}
