import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    is_active: boolean;

    @Column({default: null})
    profile_type: string;

    @Column({default: null})
    contact_type: string;

    @Column({default: false})
    auth_data: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    last_login: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        try {
            return bcrypt.compareSync(unencryptedPassword, this.password);
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}
