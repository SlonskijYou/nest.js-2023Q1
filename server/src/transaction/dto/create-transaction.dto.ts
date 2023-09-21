export class CreateTransactionDto {
  title: string;
  type: "income" | "exprense";
  amount: number;
  categoryId: number;
  userId: number;
}
