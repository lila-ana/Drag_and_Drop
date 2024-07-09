import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  status!: "To Do" | "In Progress" | "Done";

  @Column()
  priority!: "Low" | "Medium" | "High";

  @Column({ type: "timestamp" })
  dueDate!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdDate!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedDate!: Date;

  @Column("simple-array", { nullable: true })
  assignee?: string[];

  @Column("simple-array", { nullable: true })
  tags?: string[];

  @Column("json", { nullable: true })
  subtasks?: Task[];

  @Column("simple-array", { nullable: true })
  comments?: string[];
}
