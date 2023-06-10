export interface Product {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  date: Date;
  createdBy: string;
}

// export class ProductClass {
//   id: string;
//   title: string;
//   description: string;
//   priority: Priority;
//   completed: boolean;
//   date: Date;
//   createdBy: string;

//   public constructor(
//     id: string,
//     title: string,
//     description: string,
//     priority: Priority,
//     completed: boolean,
//     date: Date,
//     createdBy: string
//   ) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.priority = priority;
//     this.completed = completed;
//     this.date = date;
//     this.createdBy = createdBy;
//   }
// }

export enum Priority {
  A = "A",
  B = "B",
  C = "C",
}

export interface IProductBody {
  id?: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  date: Date;
}

export interface IProductForm {
  id?: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  date: string;
}
