import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { StockService } from './stock.service';
import { Stock } from './entities/stock.entity';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<Stock[]> {
    return this.stockService.getAllStocks();
  }
}
