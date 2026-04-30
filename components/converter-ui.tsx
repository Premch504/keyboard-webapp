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
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4">
      <div className="bg-[#1a1a24] rounded-lg shadow-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-[rgba(255,255,255,0.08)]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#4f46e5] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <p className="text-[#8884a8] text-center mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
          แก้ข้อความพิมพ์ผิด keyboard layout (Thai-English)
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-300 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#8884a8] mb-2">
              🇹🇭 Input (ข้อความที่พิมพ์ผิด)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์ข้อความที่นี่... เช่น l;ylfu8iy["
              className="w-full h-28 sm:h-32 p-2.5 sm:p-3 border border-[rgba(165,180,252,0.3)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-[#13131a] text-[#e2e2f0] placeholder:text-[#55536a] text-sm sm:text-base"
            />
            <div className="text-right mt-1">
              <span className="text-xs text-[#55536a]">{input.length} chars</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 my-3 sm:my-4">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
            <button
              onClick={() => {
                const temp = input;
                setInput(output);
                setOutput(temp);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#a5b4fc] bg-[#1a1a24] flex items-center justify-center text-[#a5b4fc] hover:bg-[#13131a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              disabled={!input && !output}
            >
              <span className="text-base sm:text-lg">⇄</span>
            </button>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 gap-2 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <label className="block text-sm font-medium text-[#8884a8]">
                  🇬🇧 Output (ผลลัพธ์)
                </label>
                {input && (
                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${isChanged ? 'bg-[#14532d] text-[#86efac]' : 'bg-[#1a1a24] text-[#55536a]'}`}>
                    {isChanged ? 'converted' : 'no changes'}
                  </span>
                )}
              </div>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-sm bg-[#1a1a24] text-[#a5b4fc] px-3 py-1 rounded border border-[#a5b4fc]/30 hover:bg-[#a5b4fc]/10 transition-colors font-medium flex-shrink-0"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="สวัสดีครับ"
              className="w-full h-28 sm:h-32 p-2.5 sm:p-3 border border-gray-200/20 rounded-lg bg-[#111118] resize-none text-[#e2e2f0] placeholder:text-[#55536a] text-sm sm:text-base"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2 border border-[rgba(255,255,255,0.12)] text-[#8884a8] rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors text-sm sm:text-base"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <p className="text-xs sm:text-sm text-[#55536a] text-center flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span></span>
              <span>Real-time</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span></span>
              <span>Offline</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span><span className="w-1 h-1 bg-[#a5b4fc] rounded-full"></span></span>
              <span>No data sent</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
