import { IsString } from 'class-validator';

class AddUserDTO {
    @IsString()
    public email: string;

    @IsString()
    public password: string;
}

export default AddUserDTO;
