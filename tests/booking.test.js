import test from 'node:test';
import assert from 'node:assert';
import { HttpClient } from '../src/core/HttpClient.js';
import { AuthService } from '../src/business/AuthService.js';
import { BookingService } from '../src/business/BookingService.js';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const httpClient = new HttpClient(BASE_URL);
const authService = new AuthService(httpClient);
const bookingService = new BookingService(httpClient);

test('Restful-Booker Layered Architecture CRUD Workflow', async (t) => {
    let token = '';
    let bookingId = null;

    await t.test('1. Should generate auth token via AuthService', async () => {
        const res = await authService.getToken('admin', 'password123');
        assert.strictEqual(res.status, 200);
        assert.ok(res.body.token);
        token = res.body.token;
    });

    await t.test('2. Should create a booking via BookingService', async () => {
        const payload = {
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 150,
            depositpaid: true,
            bookingdates: { checkin: '2026-06-01', checkout: '2026-06-10' },
            additionalneeds: 'Breakfast'
        };

        const res = await bookingService.createBooking(payload);
        assert.strictEqual(res.status, 200);
        assert.ok(res.body.bookingid);
        bookingId = res.body.bookingid;
    });

    await t.test('3. Should retrieve booking by ID', async () => {
        assert.ok(bookingId);
        const res = await bookingService.getBookingById(bookingId);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.firstname, 'John');
    });

    await t.test('4. Should update booking using token', async () => {
        const updatePayload = {
            firstname: 'Jane',
            lastname: 'Smith',
            totalprice: 200,
            depositpaid: false,
            bookingdates: { checkin: '2026-07-01', checkout: '2026-07-10' },
            additionalneeds: 'Late Checkout'
        };

        const res = await bookingService.updateBooking(bookingId, token, updatePayload);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.firstname, 'Jane');
    });

    await t.test('5. Should delete booking using token', async () => {
        const res = await bookingService.deleteBooking(bookingId, token);
        assert.strictEqual(res.status, 201);
    });
});