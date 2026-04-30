"use client";

import { useState, useEffect } from "react";
import { fix } from "../lib/converter";

export function ConverterUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (input) {
        const result = fix(input);
        setOutput(result);
        setError(null);
      } else {
        setOutput("");
        setError(null);
      }
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Conversion failed. Please check console for details.");
      setOutput("");
    }
  }, [input]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const isChanged = input !== output && input !== "" && output !== "";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-[#1a1a24] rounded-lg shadow-lg p-8 border border-[rgba(255,255,255,0.08)]">
        <h1 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-[#4f46e5] rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="M6 8h.01"/>
              <path d="M10 8h.01"/>
              <path d="M14 8h.01"/>
              <path d="M18 8h.01"/>
              <path d="M6 12h.01"/>
              <path d="M10 12h.01"/>
              <path d="M14 12h.01"/>
              <path d="M18 12h.01"/>
              <path d="M7 16h10"/>
            </svg>
          </div>
          <span className="text-[#e2e2f0]">Keyboard<span className="text-[#4f46e5]">Trans</span></span>
        </h1>
        <p className="text-[#8884a8] text-center mb-8">
          แก้ข้อความพิมพ์ผิด keyboard layout (Thai-English)
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-300 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#8884a8] mb-2">
              🇹🇭 Input (ข้อความที่พิมพ์ผิด)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์ข้อความที่นี่... เช่น l;ylfu8iy["
              className="w-full h-32 p-3 border border-[rgba(165,180,252,0.3)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-[#13131a] text-[#e2e2f0] placeholder:text-[#55536a]"
            />
            <div className="text-right mt-1">
              <span className="text-xs text-[#55536a]">{input.length} chars</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
            <button
              onClick={() => {
                const temp = input;
                setInput(output);
                setOutput(temp);
              }}
              className="w-10 h-10 rounded-full border-2 border-[#a5b4fc] bg-[#1a1a24] flex items-center justify-center text-[#a5b4fc] hover:bg-[#13131a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={!input && !output}
            >
              <span className="text-lg">⇄</span>
            </button>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-[#8884a8]">
                  🇬🇧 Output (ผลลัพธ์)
                </label>
                {input && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isChanged ? 'bg-[#14532d] text-[#86efac]' : 'bg-[#1a1a24] text-[#55536a]'}`}>
                    {isChanged ? 'converted' : 'no changes needed'}
                  </span>
                )}
              </div>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-sm bg-[#1a1a24] text-[#a5b4fc] px-3 py-1 rounded border border-[#a5b4fc]/30 hover:bg-[#a5b4fc]/10 transition-colors font-medium"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="สวัสดีครับ"
              className="w-full h-32 p-3 border border-gray-200/20 rounded-lg bg-[#111118] resize-none text-[#e2e2f0] placeholder:text-[#55536a]"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2 border border-[rgba(255,255,255,0.12)] text-[#8884a8] rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <p className="text-sm text-[#55536a] text-center flex items-center justify-center gap-4">
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span></span>
              <span>Real-time conversion</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span></span>
              <span>Works offline</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span></span>
              <span>No data sent to server</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
