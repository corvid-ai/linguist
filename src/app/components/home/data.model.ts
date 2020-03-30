const moment = require("moment");

export class Data {
  English: string;
  localLanguage: string;
  translation: string;
  date = moment().format("MMMM Do YYYY, h:mm:ss a");
}
