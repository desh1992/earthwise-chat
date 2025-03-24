import React from "react";

const terminologyList = [
  {
    term: "Prompt",
    meaning:
      "A prompt is the question or instruction you give to the AI. Think of it like a message you're writing to a very smart assistant who only responds to what you say..."
  },
  {
    term: "Token",
    meaning:
      "LLMs don’t understand language like we do. They break everything—your question and their answer—into small pieces called tokens..."
  },
  {
    term: "Token Usage",
    meaning:
      "Every time you ask a question and get an answer, tokens are used. Token usage = input tokens + output tokens..."
  },
  {
    term: "Temperature",
    meaning:
      "This controls how ‘random’ or ‘creative’ the model’s response is. A low temperature makes it focused; high temperature makes it playful."
  },
  {
    term: "Top-p (Nucleus Sampling)",
    meaning:
      "Top-p looks at a group of top choices that make up a certain probability mass, then randomly picks one from that group."
  },
  {
    term: "Max Tokens",
    meaning:
      "This is the maximum number of tokens the model is allowed to generate in its response. Think of it as setting a word limit."
  },
  {
    term: "Frequency Penalty",
    meaning:
      "This reduces the chance of the model repeating the same words or phrases. A higher frequency penalty avoids repetition."
  },
  {
    term: "Presence Penalty",
    meaning:
      "This encourages the model to explore new ideas or directions not already mentioned earlier in the conversation."
  },
  {
    term: "Latency",
    meaning:
      "Latency is the time it takes for the model to respond. Lower latency means faster, smoother output in real-time systems."
  },
  {
    term: "Factual Accuracy",
    meaning:
      "Even if a model sounds confident, that doesn’t mean it’s correct. Factual accuracy checks if the response is actually true."
  },
  {
    term: "Hallucination",
    meaning:
      "When a model makes up a confident but false answer, it's called hallucination. These should be flagged or verified carefully."
  },
  {
    term: "Bias",
    meaning:
      "Bias in AI can cause unfair or skewed responses. It's important to watch for tone, assumptions, or stereotypes in output."
  },
  {
    term: "Relevance",
    meaning:
      "Relevance means whether the model's response actually answers your question in a useful and direct way."
  },
  {
    term: "Chain-of-Thought",
    meaning:
      "This refers to the model reasoning step-by-step to improve clarity and transparency—especially useful in complex queries."
  },
  {
    term: "Context Window",
    meaning:
      "Models can only remember a limited number of tokens. Older messages fall off when the context window is exceeded."
  }
];

// Soft holographic gradient backgrounds (tailored to be subtle)
const gradients = [
  "linear-gradient(135deg, #fef9ff, #e0f7fa)",
  "linear-gradient(135deg, #f0fdfa, #e3f2fd)",
  "linear-gradient(135deg, #fffaf0, #fce3ec)",
  "linear-gradient(135deg, #fdf2f8, #e0f7fa)",
  "linear-gradient(135deg, #fefce8, #f0fff4)",
  "linear-gradient(135deg, #f3f4f6, #fef6fb)",
  "linear-gradient(135deg, #f5f3ff, #fffaf0)",
  "linear-gradient(135deg, #f0f9ff, #fef2f2)",
  "linear-gradient(135deg, #ecfdf5, #e3f2fd)",
  "linear-gradient(135deg, #fff5f5, #fce3ec)",
  "linear-gradient(135deg, #fef2f2, #e3f2fd)",
  "linear-gradient(135deg, #f0fdfa, #fff9c4)",
  "linear-gradient(135deg, #e0f7fa, #fce4ec)",
  "linear-gradient(135deg, #fffaf0, #ede7f6)",
  "linear-gradient(135deg, #f3e5f5, #e8f5e9)"
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
        backgroundColor: "#ffffff"
      }}
    >
      {terminologyList.map((item, index) => (
        <div
          key={item.term}
          style={{
            background: gradients[index % gradients.length],
            padding: "14px 16px",
            marginBottom: "12px",
            borderRadius: "16px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            backdropFilter: "blur(6px)"
          }}
        >
          <strong style={{ display: "block", marginBottom: "6px", fontSize: "15px", color: "#111" }}>
            {item.term}
          </strong>
          <span style={{ fontSize: "14px", color: "#444", lineHeight: 1.5 }}>
            {item.meaning}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TerminologySidebar;
