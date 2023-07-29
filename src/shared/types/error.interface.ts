export type ErrorType = {
  value?: string;
  msg: string;
  param?: string;
  location?: string;
  success?: boolean;
};
export interface IError {
  status: number;
  data: ErrorType[];
}
