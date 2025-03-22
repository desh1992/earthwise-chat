
// Mock authentication service

interface User {
  email: string;
  company: string;
}

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user storage
const mockUsers: Record<string, { email: string; company: string; password: string }> = {};

export const authService = {
  async signup(email: string, company: string, password: string): Promise<void> {
    // Simulate API call
    await delay(1500);
    
    // Check if user already exists
    if (mockUsers[email]) {
      throw new Error('User already exists');
    }
    
    // Store new user
    mockUsers[email] = { email, company, password };
    
    return;
  },
  
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await delay(1500);
    
    // Check if user exists and password matches
    const user = mockUsers[email];
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    return {
      email: user.email,
      company: user.company
    };
  }
};
