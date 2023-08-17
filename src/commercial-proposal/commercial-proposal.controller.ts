import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateCommercialProposalDto } from './dto/create-commercial-proposal.dto';
import { UpdateCommercialProposalDto } from './dto/update-commercial-proposal.dto';
import { CommercialProposalService } from './commercial-proposal.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('commercial-proposal')
export class CommercialProposalController {
  constructor(
    private readonly commercialProposalService: CommercialProposalService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createCommercialProposalDto: CreateCommercialProposalDto) {
    return this.commercialProposalService.create(createCommercialProposalDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  find() {
    return this.commercialProposalService.find({
      relations: {
        list: true,
      },
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commercialProposalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommercialProposalDto: UpdateCommercialProposalDto,
  ) {
    return this.commercialProposalService.update(
      +id,
      updateCommercialProposalDto,
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commercialProposalService.remove(+id);
  // }
}
