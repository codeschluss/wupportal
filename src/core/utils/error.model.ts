export class ErrorModel {

  public error: string;
  public message: string;
  public path?: string;
  public status: number = NaN;
  public timestamp: string = new Date().toISOString();

}
