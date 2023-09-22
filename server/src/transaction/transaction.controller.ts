import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get("")
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

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id") id: string, @Req() req) {
    return this.transactionService.destroy(+id, +req.user.id);
  }

  @Get("pagination")
  @UseGuards(JwtAuthGuard)
  findlimit(
    @Req() req,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 3
  ) {
    return this.transactionService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit
    );
  }

  @Get(":type/find")
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req, @Param("type") type: string) {
    return this.transactionService.findAllByType(+req.user.id, type);
  }
}
