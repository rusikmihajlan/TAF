import { randomUUID } from 'node:crypto';
export function createCustomer() {
  return {
    firstName: 'Module', lastName: 'Seven', dateOfBirth: '1995-04-12',
    country: 'AM', postalCode: '0010', houseNumber: '12',
    street: 'Learning Street', city: 'Yerevan', state: 'Yerevan',
    phone: '37410123456', email: `taf-${randomUUID()}@example.com`,
    password: `Taf!7a${randomUUID().slice(0, 12)}`
  };
}
