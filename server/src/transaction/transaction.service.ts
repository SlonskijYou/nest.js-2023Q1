import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Transaction } from "./transaction.model";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

@Injectable()
export class TransactionService {
  //   constructor(
  //     @InjectModel(Transaction) private transactionRepository: typeof Transaction
  //   ) {}
  //   async create(transactionDto: CreateTransactionDto, id: number) {
  //     const create = await this.transactionRepository.create({
  //       title: transactionDto.title,
  //       type: transactionDto.type,
  //       amount: transactionDto.amount,
  //       categoryId: transactionDto.categoryId,
  //       userId: id,
  //     });
  //     return create;
  //   }
}
