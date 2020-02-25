export class Log {
  constructor(
    public log_id: number,
    public log_date: string,
    public log_user_id: number,
    public log_user: string,
    public log_comment: string,
    public log_piano_id: number,
    public log_piano: string,
    public log_tuning: any,
    public log_regulation: any,
    public log_intonation: any
  ) {}
}
