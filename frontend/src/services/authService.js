import { jwtDecode } from 'jwt-decode';

class AuthService {
  constructor() {
    this.tokenKey = 'authToken';
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return decodedToken.user.id; 
  }

  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
