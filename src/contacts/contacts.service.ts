import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  findOne(id: number): Promise<Contact> {
    return this.contactRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }

  create(name: string, age: number, detail: string) {
    const contact = {
      name,
      detail,
      age,
    };
    return this.contactRepository.save(contact);
  }

  async update(id: number, name: string, age: number, detail: string) {
    const contact = await this.contactRepository.findOne(id);
    contact.name = name;
    contact.age = age;
    contact.detail = detail;
    return this.contactRepository.save(contact);
  }
}
