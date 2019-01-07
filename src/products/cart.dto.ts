import { IsString } from 'class-validator';

class CartDto {
    @IsString()
    public product: string;
}

export default CartDto;
