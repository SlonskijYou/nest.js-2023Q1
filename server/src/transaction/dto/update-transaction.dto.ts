export class UpdateTransactionDto {
  title: string;
  type?: "income" | "exprense";
  amount: number;
  categoryId: number;
}
