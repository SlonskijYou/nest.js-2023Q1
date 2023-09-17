import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "src/category/category.model";
import { User } from "src/users/users.model";

interface TransactionCreationAttrs {
  title: string;
  type: string;
  amount: number;
}

@Table({ tableName: "transaction" })
export class Transaction extends Model<Transaction, TransactionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.INTEGER })
  amount: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  transactionId: number;

  @BelongsTo(() => Category)
  category: Category;
}
