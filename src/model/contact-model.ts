import { Contact } from "@prisma/client";

export type ContactResponse = {
  id: string;
  name: string;
  value: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateContactRequest = {
  name: string;
  value: string;
};

export type BulkUpdateContactRequest = {
  id: string;
  name: string | undefined;
  value: string | undefined;
};

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    id: contact.id,
    name: contact.name,
    value: contact.value,
    created_at: contact.created_at,
    updated_at: contact.updated_at,
  };
}
