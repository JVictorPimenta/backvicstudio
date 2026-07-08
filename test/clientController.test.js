import test from 'node:test';
import assert from 'node:assert/strict';
import { buildClientRegistrationData } from '../src/controllers/clientController.js';

test('buildClientRegistrationData creates a client payload and a login password', () => {
  const result = buildClientRegistrationData({
    name: 'Ana Souza',
    email: 'ana@email.com',
    phone: '11999999999',
    source: 'Instagram',
    status: 'ativo',
  });

  assert.equal(result.clientData.name, 'Ana Souza');
  assert.equal(result.clientData.email, 'ana@email.com');
  assert.equal(result.clientData.phone, '11999999999');
  assert.equal(result.clientData.status, 'ativo');
  assert.equal(result.userData.email, 'ana@email.com');
  assert.equal(result.userData.role, 'colaborador');
  assert.equal(result.userData.status, 'ativo');
  assert.equal(result.temporaryPassword, 'ana@email.com');
});
