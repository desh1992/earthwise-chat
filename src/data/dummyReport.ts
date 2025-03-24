// src/data/dummyReport.ts

const dummyReportData = {
    prompt: "Explain the theory of relativity",
    stages: [
      {
        stage: "Comprehension",
        phase: "Crust",
        responses: [
          {
            model: "ChatGPT",
            cost: "$0.0046",
            time: "5.39s",
            tokens: 323,
            score: "✅ Excellent comprehension",
            response: `The theory of relativity is a fundamental framework in physics developed by Albert Einstein in the early 20th century... [Full text continues here]`
          },
          {
            model: "Claude",
            cost: "$0.378",
            time: "2.47s",
            tokens: 314,
            score: "🟡 Good summary",
            response: `The theory of relativity is a fundamental theory in physics developed by Albert Einstein... [Full text continues here]`
          },
          {
            model: "Gemini",
            cost: "$0.113",
            time: "2.09s",
            tokens: 305,
            score: "🟢 Clear but a bit surface level",
            response: `The theory of relativity, developed primarily by Albert Einstein, actually consists of two interconnected theories... [Full text continues here]`
          },
          {
            model: "LLaMA",
            cost: "$0.189",
            time: "1.82s",
            tokens: 348,
            score: "✅ Solid technical framing",
            response: `The theory of relativity, developed by Albert Einstein, is a fundamental concept in modern physics... [Full text continues here]`
          }
        ]
      },
      // You can add more stages like "Reasoning", "Technical", etc. following the same structure
    ]
  };
  
  export default dummyReportData;
  