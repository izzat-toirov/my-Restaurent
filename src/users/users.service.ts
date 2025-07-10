import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Restaurants } from '../restaurants/entities/restaurant.entity';
import { Op } from 'sequelize';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User){}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Bu email allaqachon mavjud');
    }
  
    const existingPhone = await this.userModel.findOne({
      where: { phone_number: createUserDto.phone_number },
    });
    if (existingPhone) {
      throw new BadRequestException('Bu phone_number allaqachon mavjud');
    }
  
    const role = createUserDto.role.toUpperCase();
  
    if (role === 'SUPER_ADMIN') {
      const existingSuperAdmin = await this.userModel.findOne({
        where: { role: 'SUPER_ADMIN' },
      });
  
      if (existingSuperAdmin) {
        throw new BadRequestException('SUPER_ADMIN allaqachon mavjud');
      }
    }
  
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
    const normalizedDto = {
      ...createUserDto,
      role,
      password: hashedPassword,
    };
  
    return await this.userModel.create(normalizedDto);
  }
  
  
  

  async findAll(name?: string, role?: string) {
    const whereClause: any = {};

      if (name) {
      whereClause.full_name = { [Op.iLike]: `%${name}%` };
    }

      if (role) {
    whereClause.role = role;
  }

  return await this.userModel.findAll({
    where: whereClause,
    include: {all: true},
  });
}

  

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel.update(updateUserDto, {
      where: {id}, returning: true
    });
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({where: {id}});
    if(!deleted){
      throw new NotFoundException(`User ${id} not found`);
    }
    return {message: "Deleted succefuly"};
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }
  async findByActivationLink(link: string): Promise<User | null> {
    return this.userModel.findOne({ where: { activation_link: link } });
  }
  async uptadeRefreshToken(id: number, refresh_token: string){
    const uptadeUser = await this.userModel.update(
      {refresh_token},
      {
        where: {id},
      }
    )
    return uptadeUser;
  }
  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    
    const uptadeUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    console.log("Link:", link);
console.log("Update result:", uptadeUser);
    if (!uptadeUser[1][0]) {
      throw new BadRequestException("User already activate");
    }
    return {
      message: "User activate successfully",
      is_active: uptadeUser[1][0].is_active,
    };
  }

  async createSuperAdmin() {
    const exists = await this.userModel.findOne({
      where: { role: UserRole.SUPER_ADMIN },
    });
  
    if (exists) {
      throw new ForbiddenException('Super admin allaqachon mavjud');
    }
  
    const superAdmin = await this.userModel.create({
      full_name: 'Super Admin',
      email: 'admin@gmail.com',
      phone_number: '998901112233',
      password: await bcrypt.hash('P@ssw0rd123', 10),
      role: 'SUPER_ADMIN',
      is_active: true,
    });
  
    console.log('Super admin created');
    return superAdmin;
  }


  async findByRole(role: string) {
    return this.userModel.findOne({ where: { role } });
  }
  
  
  



}
