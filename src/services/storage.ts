
// Storage service for persistent data

export const storageService = {
  // Stat explanations
  getStatExplanations(): Record<string, string> | null {
    const data = localStorage.getItem('statExplanations');
    return data ? JSON.parse(data) : null;
  },
  
  setStatExplanations(explanations: Record<string, string>): void {
    localStorage.setItem('statExplanations', JSON.stringify(explanations));
  },
  
  // User preferences
  getUserPreferences(): Record<string, any> | null {
    const data = localStorage.getItem('userPreferences');
    return data ? JSON.parse(data) : null;
  },
  
  setUserPreferences(preferences: Record<string, any>): void {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  },
  
  // Chat history
  getChatHistory(): any[] | null {
    const data = localStorage.getItem('chatHistory');
    return data ? JSON.parse(data) : null;
  },
  
  setChatHistory(history: any[]): void {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  },
  
  // Clear all storage
  clearAll(): void {
    localStorage.removeItem('statExplanations');
    localStorage.removeItem('userPreferences');
    localStorage.removeItem('chatHistory');
  }
};
