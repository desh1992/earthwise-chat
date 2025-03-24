// Define your User interface if not already defined elsewhere
interface User {
  email: string;
  name?: string;
  company: string;
}

// Define the API base URL
const API_BASE_URL = 'https://llm-compare-backend-0b16218aa15f.herokuapp.com/api/auth';

export const authService = {
  async signup(email: string, company: string, password: string, name: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company_name: company, // Note the difference in field name
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create account');
      }

      return;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred during signup');
      }
    }
  },
  
  async login(email: string, password: string): Promise<User> {
    try {
      const response: Response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Log the entire response for debugging
      console.log('Login Response:', response);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();

      // Log the parsed data for debugging
      console.log('Parsed Login Data:', data);

      // Store the access token in localStorage
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
      }

      // Return user information
      // Note: You may need to adjust this based on the actual response structure
      return {
        email,
        name: data.name, // Adjust if your API returns user details differently
        company: data.company_name || data.company || '', // Handle potential field name differences
      };
    } catch (error) {
      console.error('Login Error:', error); // Log any errors that occur
      throw error; // Rethrow the error for further handling
    }
  },
  
  // You might want to add a logout method
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
  
  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
