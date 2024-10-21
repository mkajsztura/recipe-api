import { IsInt, IsPositive } from "class-validator";

export class CreateIngredientDto {
    @IsInt()
    @IsPositive()
    productId: number;

    @IsInt()
    @IsPositive()
    amount: number;
}
