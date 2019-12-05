export class User {
  constructor(
    public id: number,
    public username: string,
    public country_code: string,
    public first_name: string,
    public last_name: string,
    public department_id: any,
    public function_id: any,
    public level_id: any,
    public email: string,
    public mobile: string,
    public skype: boolean,
    public province_id: any,
    public birth_day: string,
    public password: string
  ) {}
}
