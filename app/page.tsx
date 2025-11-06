'use client';

import { useState } from 'react';

interface Tool {
  name: string;
  description: string;
  execute: (input: string) => string;
}

const tools: Tool[] = [
  {
    name: 'Calculator',
    description: 'Performs basic arithmetic calculations',
    execute: (input: string) => {
      try {
        const result = eval(input.replace(/[^0-9+\-*/().]/g, ''));
        return `Result: ${result}`;
      } catch (error) {
        return 'Error: Invalid calculation';
      }
    }
  },
  {
    name: 'Text Analyzer',
    description: 'Analyzes text and provides statistics',
    execute: (input: string) => {
      const words = input.trim().split(/\s+/).length;
      const chars = input.length;
      const sentences = input.split(/[.!?]+/).filter(s => s.trim()).length;
      return `Words: ${words}, Characters: ${chars}, Sentences: ${sentences}`;
    }
  },
  {
    name: 'Case Converter',
    description: 'Converts text to different cases',
    execute: (input: string) => {
      return `Uppercase: ${input.toUpperCase()}\nLowercase: ${input.toLowerCase()}\nTitle Case: ${input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}`;
    }
  },
  {
    name: 'JSON Formatter',
    description: 'Formats and validates JSON',
    execute: (input: string) => {
      try {
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed, null, 2);
      } catch (error) {
        return 'Error: Invalid JSON';
      }
    }
  },
  {
    name: 'Base64 Encoder',
    description: 'Encodes text to Base64',
    execute: (input: string) => {
      try {
        return `Encoded: ${btoa(input)}`;
      } catch (error) {
        return 'Error: Unable to encode';
      }
    }
  },
  {
    name: 'Base64 Decoder',
    description: 'Decodes Base64 text',
    execute: (input: string) => {
      try {
        return `Decoded: ${atob(input)}`;
      } catch (error) {
        return 'Error: Invalid Base64';
      }
    }
  },
  {
    name: 'URL Encoder',
    description: 'Encodes text for URLs',
    execute: (input: string) => {
      return `Encoded: ${encodeURIComponent(input)}`;
    }
  },
  {
    name: 'URL Decoder',
    description: 'Decodes URL-encoded text',
    execute: (input: string) => {
      try {
        return `Decoded: ${decodeURIComponent(input)}`;
      } catch (error) {
        return 'Error: Invalid URL encoding';
      }
    }
  },
  {
    name: 'Reverse Text',
    description: 'Reverses the input text',
    execute: (input: string) => {
      return `Reversed: ${input.split('').reverse().join('')}`;
    }
  },
  {
    name: 'Hash Generator',
    description: 'Generates a simple hash of the input',
    execute: (input: string) => {
      let hash = 0;
      for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return `Hash: ${Math.abs(hash).toString(16)}`;
    }
  }
];

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState<Array<{tool: string, input: string, output: string}>>([]);

  const handleExecute = () => {
    if (selectedTool && input) {
      const result = selectedTool.execute(input);
      setOutput(result);
      setHistory([{tool: selectedTool.name, input, output: result}, ...history.slice(0, 9)]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            🤖 AI Tool Agent
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your intelligent assistant with multiple tools at your disposal
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tools Panel */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Available Tools
            </h2>
            <div className="space-y-2">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => {
                    setSelectedTool(tool);
                    setOutput('');
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedTool?.name === tool.name
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="font-semibold">{tool.name}</div>
                  <div className={`text-sm ${
                    selectedTool?.name === tool.name ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {tool.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                {selectedTool ? selectedTool.name : 'Select a Tool'}
              </h2>

              {selectedTool ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Input
                    </label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Enter your input here..."
                    />
                  </div>

                  <button
                    onClick={handleExecute}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Execute Tool
                  </button>

                  {output && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Output
                      </label>
                      <pre className="w-full p-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
                        {output}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <p className="text-lg">Select a tool from the left panel to get started</p>
                </div>
              )}
            </div>

            {/* History Panel */}
            {history.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Recent History
                </h2>
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                        {item.tool}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        Input: <span className="font-mono">{item.input.substring(0, 50)}{item.input.length > 50 ? '...' : ''}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Output: <span className="font-mono">{item.output.substring(0, 50)}{item.output.length > 50 ? '...' : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
