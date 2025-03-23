import React from "react";

const terminologyList = [
        {
        term: "Prompt",
        meaning:
          "A prompt is the question or instruction you give to the AI. Think of it like a message you're writing to a very smart assistant who only responds to what you say. If your prompt is vague, the answer will be vague. If your prompt is specific, the answer will be more accurate and useful. Learning how to write good prompts is a skill in itself, and it's the starting point of any LLM interaction."
      },
      {
        term: "Token",
        meaning:
          "LLMs don’t understand language like we do. They break everything—your question and their answer—into small pieces called tokens. A token can be a word, part of a word, or even just a few letters. For example, the word ‘chatbot’ might be split into two tokens: ‘chat’ and ‘bot.’ This matters because every token adds to the cost, processing time, and memory used by the model."
      },
      {
        term: "Token Usage",
        meaning:
          "Every time you ask a question and get an answer, tokens are used. Token usage = input tokens (your prompt) + output tokens (the model's answer). Why should you care? Because most APIs charge you based on token usage. The more tokens you use, the more it costs. Also, models can only remember a limited number of tokens—so it’s important to keep track."
      },
      {
        term: "Temperature",
        meaning:
          "This controls how ‘random’ or ‘creative’ the model’s response is. A low temperature (like 0.2) makes the model very focused and deterministic—it will try to give the most probable answer. A high temperature (like 0.9) makes the model more diverse and playful—it might say something surprising or unique. It's like turning the creativity dial up or down."
      },
      {
        term: "Top-p (Nucleus Sampling)",
        meaning:
          "Top-p is another way to control creativity, but it works differently than temperature. Instead of picking the most likely next word, it looks at a group of top choices that together make up a certain probability mass (like 0.9), and then randomly selects one from that group. Use it along with temperature to fine-tune how wild or focused your outputs are."
      },
      {
        term: "Max Tokens",
        meaning:
          "This is the maximum number of tokens the model is allowed to generate in its response. Think of it as setting a word limit. You don’t want a model writing a novel when you just want a quick summary. Set this wisely based on your use case—more tokens means longer (and costlier) responses."
      },
      {
        term: "Frequency Penalty",
        meaning:
          "This reduces the chance of the model repeating the same words or phrases over and over again. A higher frequency penalty makes the model avoid repetition. If you've ever seen an AI response that sounds like it's looping the same idea, tweaking this setting can help."
      },
      {
        term: "Presence Penalty",
        meaning:
          "This encourages the model to introduce new topics that haven’t already been mentioned in the conversation. A higher presence penalty makes the model take more risks and explore different ideas. It’s useful when you want variety or brainstorming."
      },
      {
        term: "Latency",
        meaning:
          "Latency is the time it takes for the model to respond after you send your prompt. In real applications, lower latency means a smoother, faster experience. High latency can feel slow and frustrating, especially in chatbots or real-time systems."
      },
      {
        term: "Factual Accuracy",
        meaning:
          "Just because the model sounds confident doesn’t mean it's correct. Factual accuracy means checking whether the information in the response is actually true. Models can ‘hallucinate’ or make up facts. So even if the answer sounds good, it’s important to verify it—especially in business, legal, or healthcare contexts."
      },
      {
        term: "Hallucination",
        meaning:
          "When a model confidently gives you a completely false or made-up answer, that's called hallucination. It doesn’t mean the AI is broken—it just means it generated something that sounds right but isn’t based on real facts. Learning to spot hallucinations is a key part of using LLMs responsibly."
      },
      {
        term: "Bias",
        meaning:
          "Bias in AI happens when the model's response unfairly favors or excludes certain groups, opinions, or perspectives. Since LLMs are trained on internet data, they can unintentionally reflect societal biases. This can show up in tone, wording, or assumptions. Detecting and managing bias is essential, especially for enterprise applications."
      },
      {
        term: "Relevance",
        meaning:
          "Is the response actually answering your question? A response might be factual but not useful. Relevance means how well the model stays focused on the topic and gives you information that actually helps. A good answer is not just correct—it’s also on point."
      },
      {
        term: "Chain-of-Thought",
        meaning:
          "This refers to the model breaking down its thinking step by step, like solving a math problem out loud. It’s useful for reasoning-heavy tasks. Instead of jumping to the answer, the model explains the path it took, which improves transparency and reliability in complex queries."
      },
      {
        term: "Context Window",
        meaning:
          "LLMs have a memory limit. They can only ‘remember’ a certain number of tokens in the conversation. This limit is called the context window. If your conversation gets too long, older messages get forgotten. Newer models like GPT-4-128k have huge context windows, but older ones forget quickly."
      }
];

const lightColors = [
  "#f9f9ff",
  "#f0f9ff",
  "#f0fff4",
  "#fffaf0",
  "#fef6fb",
  "#f3f4f6",
  "#fdf2f8",
  "#f0fdfa",
  "#fff5f5",
  "#fefce8",
  "#fef2f2",
  "#f5f3ff",
  "#ecfdf5"
];

const TerminologySidebar = () => {
  return (
    <div
    style={{
      width: "300px",
      maxHeight: "600px",
      overflowY: "auto",
      padding: "10px",
      marginRight: "16px",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      backgroundColor: "#ffffff"
    }}
  >
  
      {terminologyList.map((item, index) => (
        <div
          key={item.term}
          style={{
            backgroundColor: lightColors[index % lightColors.length],
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}
        >
          <strong style={{ display: "block", marginBottom: "4px" }}>{item.term}</strong>
          <span style={{ fontSize: "14px", color: "#555" }}>{item.meaning}</span>
        </div>
      ))}
    </div>
  );
};

export default TerminologySidebar;
