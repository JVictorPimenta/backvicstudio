import test from 'node:test';
import assert from 'node:assert/strict';
import { getAccessWhere, buildPayload, validateAppointmentSlot } from '../src/controllers/appointmentController.js';

test('non-admin users only see their own appointments', () => {
  const req = { user: { id: 7, role: 'colaborador' } };
  assert.deepEqual(getAccessWhere(req), { responsibleId: 7 });
});

test('admins see all appointments and non-admins inherit their user id', () => {
  const adminReq = { user: { id: 1, role: 'admin' } };
  const clientReq = { user: { id: 9, role: 'colaborador' } };

  assert.deepEqual(getAccessWhere(adminReq), {});
  assert.deepEqual(buildPayload({ title: 'Teste' }, clientReq), { title: 'Teste', responsibleId: 9 });
});

test('only weekdays with allowed hours can be scheduled', () => {
  assert.equal(validateAppointmentSlot(new Date('2026-07-08T10:00:00')).valid, true);
  assert.equal(validateAppointmentSlot(new Date('2026-07-08T18:00:00')).valid, true);
  assert.equal(validateAppointmentSlot(new Date('2026-07-11T10:00:00')).valid, false);
  assert.equal(validateAppointmentSlot(new Date('2026-07-08T09:00:00')).valid, false);
});
