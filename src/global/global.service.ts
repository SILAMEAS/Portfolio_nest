import { BadRequestException, Injectable } from '@nestjs/common';
import { GlobalStateModule } from './global.module';

@Injectable()
export class GlobalStateService {
  private token: string;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }


}




