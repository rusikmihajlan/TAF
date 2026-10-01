import test from 'node:test';
import assert from 'node:assert';

const BASE_URL = 'https://restful-booker.herokuapp.com';
let token = '';
let bookingId = null;

test('1. Should generate a valid auth token', async () => {
    const response = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: 'admin',
            password: 'password123'
        })
    });

    assert.strictEqual(response.status, 200, 'Status code should be 200');
    assert.ok(response.headers.get('content-type').includes('application/json'), 'Content-Type should be JSON');

    const body = await response.json();
    
    assert.ok(body.token, 'Response body should contain a token');
    token = body.token;
});

test('2. Should create a new booking', async () => {
    const response = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-06-01',
                checkout: '2026-06-10'
            },
            additionalneeds: 'Breakfast'
        })
    });

    assert.strictEqual(response.status, 200, 'Status code should be 200');
    assert.ok(response.headers.get('content-type').includes('application/json'));

    const body = await response.json();
    assert.ok(body.bookingid, 'Response should contain a bookingid');
    assert.strictEqual(body.booking.firstname, 'John');
    
    bookingId = body.bookingid;
});

test('3. Should retrieve the created booking by ID', async () => {
    assert.ok(bookingId, 'Booking ID must exist from previous test');

    const response = await fetch(`${BASE_URL}/booking/${bookingId}`);

    assert.strictEqual(response.status, 200, 'Status code should be 200');
    assert.ok(response.headers.get('content-type').includes('application/json'));

    const body = await response.json();
    assert.strictEqual(body.firstname, 'John');
    assert.strictEqual(body.lastname, 'Doe');
    assert.strictEqual(body.totalprice, 150);
});

test('4. Should update the existing booking', async () => {
    assert.ok(token, 'Auth token must exist');
    assert.ok(bookingId, 'Booking ID must exist');

    const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        body: JSON.stringify({
            firstname: 'Jane',
            lastname: 'Smith',
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-07-01',
                checkout: '2026-07-10'
            },
            additionalneeds: 'Late Checkout'
        })
    });

    assert.strictEqual(response.status, 200, 'Status code should be 200');
    
    const body = await response.json();
    assert.strictEqual(body.firstname, 'Jane');
    assert.strictEqual(body.lastname, 'Smith');
    assert.strictEqual(body.totalprice, 200);
});

test('5. Should delete the booking', async () => {
    assert.ok(token, 'Auth token must exist');
    assert.ok(bookingId, 'Booking ID must exist');

    const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: 'DELETE',
        headers: {
            'Cookie': `token=${token}`
        }
    });

    assert.strictEqual(response.status, 201, 'Status code should be 201 for successful deletion');
});