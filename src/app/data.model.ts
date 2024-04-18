export class dataModel {
  public version: number;
  public data: string;
  public date: Date;

  constructor(version: number, data: string, date: Date) {
    this.version = version;
    this.data = data;
    this.date = date;
  }
}
