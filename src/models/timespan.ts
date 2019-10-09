export default class TimeSpan {
  private hours: number;
  private minutes: number;
  private seconds: number;
  private milliseconds: number;
  private timeString: string;
  
  public constructor(h: number, m: number, s: number, ms: number) {
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
    this.milliseconds = ms;

    let buffer: number;
    buffer = Math.floor(this.milliseconds / 1000);
    this.milliseconds -= buffer * 1000;
    this.seconds += buffer;
    buffer = Math.floor(this.seconds / 60);
    this.seconds -= buffer * 60;
    this.minutes += buffer;
    buffer = Math.floor(this.minutes / 60);
    this.minutes -= buffer * 60
    this.hours += buffer;

    this.SetString();
  }

  private SetString() {
    let result: string = '.';
    result += '0'.repeat(3 - this.milliseconds.toString().length) + this.milliseconds.toString();
    result = ':' + '0'.repeat(2 - this.seconds.toString().length) + this.seconds.toString() + result;
    result = ':' + '0'.repeat(2 - this.minutes.toString().length) + this.minutes.toString() + result;
    result = '0'.repeat(2 - this.hours.toString().length) + this.hours.toString() + result;

    this.timeString = result;
  }

  public GetTimeString(): string {
    return this.timeString;
  }
}