export class CreateUserDto {
    readonly full_name: string;
    readonly email: string;
    readonly password: string;
    readonly profile_type: string;
    readonly contact_type: string;
}
