export interface Todo {
  id?: string;
  taskName: string;
  status: string;
  createdOn?: {
    seconds: string;
    nanoseconds: string;
  }
}
