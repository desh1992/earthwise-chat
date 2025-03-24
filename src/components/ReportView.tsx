import React, { useState } from "react";

const ReportView = ({ data }: { data: any }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Model Comparison Report</h2>
      <p className="text-muted-foreground mb-6">
        Prompt: <strong>{data.prompt}</strong>
      </p>

      {data.stages.map((stage, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            {stage.phase} – {stage.stage}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stage.responses.map((res, i) => (
              <ModelCard key={i} response={res} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ModelCard = ({ response }: { response: any }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="glass-card p-4 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h4 className="font-bold mb-1">{response.model}</h4>
        <p className="text-sm text-muted-foreground mb-1">Cost: {response.cost}</p>
        <p className="text-sm text-muted-foreground mb-1">Time: {response.time}</p>
        <p className="text-sm text-muted-foreground mb-1">Tokens: {response.tokens}</p>
        <p className="text-sm text-foreground mt-2">
          Feedback: <em>{response.score}</em>
        </p>
      </div>

      <button
        onClick={() => setShowFull(!showFull)}
        className="mt-3 text-blue-600 text-sm underline hover:text-blue-800"
      >
        {showFull ? "Hide Full Response" : "View Full Response"}
      </button>

      {showFull && (
        <div className="mt-2 p-2 bg-muted rounded text-sm overflow-y-auto max-h-48 whitespace-pre-wrap text-muted-foreground">
          {response.response}
        </div>
      )}
    </div>
  );
};

export default ReportView;
