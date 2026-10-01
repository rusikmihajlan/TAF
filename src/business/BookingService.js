export class BookingService {
    constructor(httpClient) {
        this.client = httpClient;
    }

    async createBooking(bookingData) {
        return await this.client.request('/booking', {
            method: 'POST',
            body: JSON.stringify(bookingData)
        });
    }

    async getBookingById(bookingId) {
        return await this.client.request(`/booking/${bookingId}`, {
            method: 'GET'
        });
    }

    async updateBooking(bookingId, token, bookingData) {
        return await this.client.request(`/booking/${bookingId}`, {
            method: 'PUT',
            headers: { 'Cookie': `token=${token}` },
            body: JSON.stringify(bookingData)
        });
    }

    async deleteBooking(bookingId, token) {
        return await this.client.request(`/booking/${bookingId}`, {
            method: 'DELETE',
            headers: { 'Cookie': `token=${token}` }
        });
    }
}