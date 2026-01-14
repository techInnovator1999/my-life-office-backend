import { Allow } from 'class-validator';

export class Logs {
  @Allow()
  id: string;

  @Allow()
  path: string;

  message: string;
  stack: string;
  method: string;
  payload?: string | null;
  status: number;
}
