export class Place {
  constructor(
    public id: number,
    public postal_code: string,
    public name: string,
    public submunicipality: boolean,
    public main_municipality: any,
    public province_id: any
  ) {}
}
