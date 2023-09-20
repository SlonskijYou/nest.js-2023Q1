import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

@Controller("transaction")
export class TransactionController {
  //   constructor(private transactionService: TransactionService) {}
  //   @Post()
  //   @UseGuards(JwtAuthGuard)
  //   create(@Body() transactionDto: CreateTransactionDto, @Req() req) {
  //     return this.transactionService.create(transactionDto, req.user.id);
  //   }
}
