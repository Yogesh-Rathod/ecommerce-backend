import { IsString } from 'class-validator';

class AddUserDTO {
    @IsString()
    public id: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;
}

export default AddUserDTO;
