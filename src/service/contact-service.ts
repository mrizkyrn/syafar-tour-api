import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import {
  ContactResponse,
  toContactResponse,
  CreateContactRequest,
  BulkUpdateContactRequest,
} from '../model/contact-model';
import { ContactValidation } from '../validation/contact-validation';
import { Validation } from '../validation/validation';

export class ContactService {
  static async create(request: CreateContactRequest): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidation.CREATE, request);

    const contact = await prismaClient.contact.create({
      data: createRequest,
    });

    return toContactResponse(contact);
  }

  static async bulkUpdate(request: BulkUpdateContactRequest[]): Promise<void> {
    const bulkUpdateRequest = Validation.validate(ContactValidation.BULK_UPDATE, request);
    
    bulkUpdateRequest.forEach(async (updateRequest) => {
      await prismaClient.contact.update({
        where: { id: updateRequest.id },
        data: updateRequest,
      });
    });
  }

  static async delete(id: string): Promise<void> {
    await this.#checkContactExist(id);

    await prismaClient.contact.delete({
      where: { id },
    });
  }

  static async getAll(): Promise<ContactResponse[]> {
    const contacts = await prismaClient.contact.findMany();
    return contacts.map(toContactResponse);
  }

  static async getByName(name: string): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findFirst({
      where: { name },
    });

    if (!contact) {
      throw new ResponseError(404, 'Contact not found');
    }

    return toContactResponse(contact);
  }

  static async #checkContactExist(id: string): Promise<void> {
    const contact = await prismaClient.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new ResponseError(404, 'Contact not found');
    }
  }
}