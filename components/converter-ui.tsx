"use client";

import { useState, useEffect } from "react";
import { fix } from "@/lib/converter";

export function ConverterUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (input) {
      setOutput(fix(input));
    } else {
      setOutput("");
    }
  }, [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          KeyboardTrans
        </h1>
        <p className="text-gray-600 text-center mb-8">
          แก้ข้อความพิมพ์ผิด keyboard layout (Thai-English)
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input (ข้อความที่พิมพ์ผิด)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์ข้อความที่นี่... เช่น l;ylfu8iy["
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output (ผลลัพธ์)
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="สวัสดีครับ"
                className="w-full h-32 p-3 border border-gray-200 rounded-lg bg-gray-50 resize-none"
              />
              {output && (
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              💡 Real-time conversion • Works offline • No data sent to server
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
