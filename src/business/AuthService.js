export class AuthService {
    constructor(httpClient) {
        this.client = httpClient;
    }

    async getToken(username, password) {
        return await this.client.request('/auth', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    }
}