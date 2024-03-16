export interface UserEntity {
  id: string;
  username: string;
  password: string;
  createdAt?: Date;
  lastModifiedAt?: Date;
}
