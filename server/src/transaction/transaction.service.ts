import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Transaction } from "./transaction.model";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { CategoryService } from "src/category/category.service";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
    private categoryService: CategoryService
  ) {}

  async create(transactionDto: CreateTransactionDto, id: number) {
    await this.categoryService.findOne(transactionDto.categoryId, id);

    if (
      await this.transactionRepository.findOne({
        where: { title: transactionDto.title, userId: id },
      })
    ) {
      throw new BadRequestException("Данная транзакция уже существует");
    }

    const create = await this.transactionRepository.create({
      title: transactionDto.title,
      type: transactionDto.type,
      amount: transactionDto.amount,
      userId: id,
      categoryId: transactionDto.categoryId,
    });
    return create;
  }

  async findall(id: number) {
    const findtransaction = await this.transactionRepository.findAll({
      where: { userId: id },
      order: [["createdAt", "DESC"]],
    });

    return findtransaction;
  }

  async findone(id: number, userId: number) {
    const findtransaction = await this.transactionRepository.findOne({
      where: { id: id, userId: userId },
    });

    if (!findtransaction) {
      throw new NotFoundException("Транзакция не найдена");
    }

    return findtransaction;
  }

  async update(id: number, updateDto: UpdateTransactionDto, userId: number) {
    await this.categoryService.findOne(updateDto.categoryId, id);
    const category = await this.transactionRepository.findOne({
      where: { id: id, userId: userId },
    });

    if (!category) {
      throw new BadRequestException("Данной транзакции не существует");
    }

    await this.transactionRepository.update(updateDto, {
      where: { id: id },
    });

    return await this.transactionRepository.findOne({
      where: { id: id, userId: userId },
    });
  }

  async destroy(id: number, userId: number) {
    const findtransaction = await this.transactionRepository.findOne({
      where: { id: id, userId: userId },
    });

    if (!findtransaction) {
      throw new NotFoundException("Транзакция не найдена");
    }

    await this.transactionRepository.destroy({
      where: { id: id, userId: userId },
    });

    return "Транзакция удалена!";
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    let offset = 0 + (page - 1) * limit;
    const findLimitTransaction = await this.transactionRepository.findAll({
      where: { userId: id },
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    return findLimitTransaction;
  }

  async findAllByType(id: number, type: string) {
    const transaction = await this.transactionRepository.findAll({
      where: { userId: id, type: type },
    });

    const total = transaction.reduce((acc, obj) => acc + obj.amount, 0);

    return total;
  }
}
