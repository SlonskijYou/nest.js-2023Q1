import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Controller("transaction")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() transactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionService.create(transactionDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findall(@Req() req) {
    return this.transactionService.findall(+req.user.id);
  }

  @Get("findone/:id")
  @UseGuards(JwtAuthGuard)
  findone(@Param("id") id: number, @Req() req) {
    return this.transactionService.findone(id, +req.user.id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateDto: UpdateTransactionDto,
    @Req() req
  ) {
    return this.transactionService.update(+id, updateDto, +req.user.id);
  }

  @Get("limit")
  @UseGuards(JwtAuthGuard)
  findlimit(@Req() req) {
    return this.transactionService.findAllWithPagination(+req.user.id);
  }
}
