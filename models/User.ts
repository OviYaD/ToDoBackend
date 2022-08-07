import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public email: string,
    public password: string,
    public name?: string,
    public id?: ObjectId
  ) {}
}
