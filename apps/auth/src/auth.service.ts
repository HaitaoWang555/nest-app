import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }

  validateUser(username: string, password: string) {
    const userList = [
      {
        username: 'user1',
        password: 'user1',
      },
      {
        username: 'user2',
        password: 'user2',
      },
    ];

    const user = userList.find((i) => i.username + i.password === username + password);

    return user;
  }
}
