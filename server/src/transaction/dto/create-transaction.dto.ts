export class CreateTransactionDto {
  title: string;
  type: string;
  amount: number;
  categoryId: number;
  userId: number;
}
