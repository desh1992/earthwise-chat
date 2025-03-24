import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { apiFetch } from '@/services/apiClient'; // adjust path if needed

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  stats?: any;
}

interface ChatProps {
  onNewStats: (stats: any) => void;
  parameters: {
    temperature: number;
    top_p: number;
    max_tokens: number;
    frequency_penalty: number;
    presence_penalty: number;
  };
}

const Chat = ({ onNewStats, parameters }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  
    try {
      const payload = {
        message: input,
        temperature: parameters.temperature,
        top_p: parameters.top_p,
        max_tokens: parameters.max_tokens,
        frequency_penalty: parameters.frequency_penalty,
        presence_penalty: parameters.presence_penalty,
      };
  
      const data = await apiFetch<{ response: string; metrics?: any }>('/chat/sendMessage', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
  
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        stats: data.metrics,
      };
  
      setMessages((prev) => [...prev, assistantMessage]);
      onNewStats(data.metrics);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-white' : 'glass-card'} rounded-2xl px-4 py-3 prose prose-sm max-w-none text-foreground`}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="glass-card flex items-center space-x-2 py-2">
                <div className="flex space-x-1">
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">AI is thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
