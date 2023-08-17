import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  async getAllStocks(): Promise<Stock[]> {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://1cweb.itsl.tel:4436/ut-itsl/hs/data/getostatki',
      headers: {
        Authorization: 'Basic YWRtaW46MDNEV2QkNGY=',
      },
    };

    try {
      const response: Stock[] = (await axios.request(config)).data;
      return response;
    } catch (error) {
      return error;
    }
  }
}
