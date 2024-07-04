import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
