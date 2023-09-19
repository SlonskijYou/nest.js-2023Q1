import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const userFindEmail = await this.usersService.findUserByEmail(
      userDto.email
    );
    const backHashPasswod = await bcrypt.compare(
      userDto.password,
      userFindEmail.password
    );

    if (userFindEmail && backHashPasswod) {
      return this.generateToken(userFindEmail);
    }
    throw new UnauthorizedException({
      message: "Некоректный email или пароль",
    });
  }

  async registration(userDto: CreateUserDto) {
    const findUser = await this.usersService.findUserByEmail(userDto.email);
    const exp =
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (!exp.test(userDto.email) || !userDto.password || !userDto.email) {
      throw new HttpException(
        "Некоректный email или password!",
        HttpStatus.BAD_REQUEST
      );
    }
    if (findUser) {
      throw new HttpException(
        "Пользователь c таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      email: userDto.email,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtservice.sign(payload),
    };
  }
}
