import React, { useState, useEffect } from "react";
import {
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  Share2,
  ExternalLink,
  ChevronDown,
  Layers,
  Smartphone,
  Monitor,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Lock,
  Copy,
  Check,
  Eye,
  Sliders,
  X,
  FileText,
  Clock,
  DollarSign
} from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  price: number;
  balance: number;
  icon: string;
  color: string;
}

const TOKENS: Token[] = [
  { symbol: "SOL", name: "Solana", price: 154.20, balance: 4.82, icon: "◎", color: "from-purple-500 to-indigo-600" },
  { symbol: "USDC", name: "USD Coin", price: 1.00, balance: 245.50, icon: "$", color: "from-blue-500 to-cyan-500" },
  { symbol: "JUP", name: "Jupiter", price: 1.12, balance: 1250.00, icon: "🪐", color: "from-amber-500 to-orange-600" },
  { symbol: "BONK", name: "Bonk", price: 0.0000224, balance: 45000000, icon: "🐶", color: "from-yellow-400 to-amber-500" },
  { symbol: "RENDER", name: "Render", price: 6.85, balance: 18.4, icon: "⚡", color: "from-red-500 to-rose-600" }
];

export default function App() {
  // Navigation & View Controls
  const [viewMode, setViewMode] = useState<"after" | "before">("after");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("mobile");
  const [smartMode, setSmartMode] = useState<"human" | "pro">("human");

  // Swap State
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState<string>("1.0");
  const [toAmount, setToAmount] = useState<string>("154.18");

  // Modal States
  const [showTokenSelect, setShowTokenSelect] = useState<"from" | "to" | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [swapState, setSwapState] = useState<"idle" | "simulating" | "confirming" | "success">("idle");
  const [simulationStep, setSimulationStep] = useState<string>("");
  const [txSignature, setTxSignature] = useState<string>("");
  const [copiedTx, setCopiedTx] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Recalculate exchange rate
  useEffect(() => {
    const val = parseFloat(fromAmount);
    if (!isNaN(val) && val > 0) {
      const usdValue = val * fromToken.price;
      const targetAmount = (usdValue / toToken.price).toFixed(toToken.price < 0.01 ? 0 : 2);
      setToAmount(targetAmount);
    } else {
      setToAmount("0.00");
    }
  }, [fromAmount, fromToken, toToken]);

  const handleFlipTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleMaxAmount = () => {
    setFromAmount(fromToken.balance.toString());
  };

  const executeSwap = () => {
    setSwapState("simulating");
    setSimulationStep("Querying 30+ Solana DEXs for optimal price...");

    setTimeout(() => {
      setSimulationStep("Locking MEV-protected Jito bundle...");
    }, 800);

    setTimeout(() => {
      setSimulationStep("Executing sub-second settlement (<0.4s)...");
    }, 1600);

    setTimeout(() => {
      const randomSig = "5Kn7" + Math.random().toString(36).substring(2, 10) + "Jup" + Math.random().toString(36).substring(2, 10);
      setTxSignature(randomSig);
      setSwapState("success");
    }, 2400);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* ======================================================== */}
      {/* 1. TOP CONTROL BAR (Interactive Evaluation Switchers)    */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-emerald-400 to-amber-400 flex items-center justify-center shadow-lg shadow-purple-900/30">
              <span className="text-xl">🪐</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Jupiter Smart Swap</span>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
                  Solana Redesign
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Superteam Earn Open Bounty ($1,500 USDC)</p>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Before vs After Switcher */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode("after")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "after"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>After (Smart Swap)</span>
              </button>
              <button
                onClick={() => setViewMode("before")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "before"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Before (Overloaded UI)</span>
              </button>
            </div>

            {/* Device View Switcher */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  deviceMode === "mobile"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
                title="iPhone 16 Mobile Touch Preview"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
              <button
                onClick={() => setDeviceMode("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  deviceMode === "desktop"
                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Widescreen Desktop Interface"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
            </div>

            {/* Guided Actions */}
            <button
              onClick={() => {
                setShowOnboarding(true);
                setOnboardingStep(1);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">3-Step Tour</span>
            </button>

            <button
              onClick={() => setShowAuditModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-800/40 rounded-xl text-xs font-semibold transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>UX Audit</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN WORKSPACE / CANVAS                              */}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/15 via-emerald-500/10 to-cyan-500/15 blur-[120px] pointer-events-none rounded-full" />

        {/* Dynamic Container depending on Device Mode */}
        {deviceMode === "mobile" ? (
          /* ===================================================== */
          /* MOBILE FRAME (iPhone 16 Pro Frame with Dynamic Island)*/
          /* ===================================================== */
          <div className="iphone-frame w-[390px] h-[820px] bg-[#0A0D14] flex flex-col relative overflow-hidden text-slate-100 z-10 border border-slate-800/80">
            {/* Status Bar */}
            <div className="pt-3 px-6 pb-2 flex items-center justify-between text-xs font-semibold text-slate-300 select-none">
              <span>9:41</span>
              {/* Dynamic Island */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mr-2" />
                <span className="text-[10px] text-slate-400 font-mono">Jup 0.4s</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                  <div className="h-full w-full bg-emerald-400 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Mobile Content Scroll Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
              {viewMode === "after" ? (
                <SmartSwapExperience
                  smartMode={smartMode}
                  setSmartMode={setSmartMode}
                  fromToken={fromToken}
                  toToken={toToken}
                  fromAmount={fromAmount}
                  setFromAmount={setFromAmount}
                  toAmount={toAmount}
                  onFlipTokens={handleFlipTokens}
                  onMaxAmount={handleMaxAmount}
                  onOpenTokenSelect={setShowTokenSelect}
                  onExecuteSwap={executeSwap}
                  isMobile={true}
                />
              ) : (
                <OldJupiterOverloadedUI isMobile={true} />
              )}
            </div>

            {/* Home Indicator */}
            <div className="pb-2 pt-1 flex justify-center">
              <div className="w-32 h-1 bg-slate-600/60 rounded-full" />
            </div>
          </div>
        ) : (
          /* ===================================================== */
          /* DESKTOP VIEW (Widescreen Clean Layout)                 */
          /* ===================================================== */
          <div className="w-full max-w-4xl z-10">
            {viewMode === "after" ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Column: Product Value Props & Proof */}
                <div className="md:col-span-5 space-y-5 pt-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next-Gen Web3 Consumer Architecture</span>
                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Swap anything on Solana in <span className="solana-gradient-text">under 0.4 seconds</span>.
                  </h1>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    Zero jargon. No micro-lamports or slippage math. Guaranteed minimum output with institutional-grade MEV protection.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Front-Running Shield</h4>
                        <p className="text-xs text-slate-400">Jito private bundle eliminates sandwich attacks.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">{"Sub-Cent Gas (<$0.001)"}</h4>
                        <p className="text-xs text-slate-400">1,000x cheaper than Ethereum L1 swaps.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Best Execution Across 30+ DEXs</h4>
                        <p className="text-xs text-slate-400">Aggregated liquidity from Raydium, Orca, Meteora & Phoenix.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Card */}
                <div className="md:col-span-7 flex justify-center">
                  <div className="w-full max-w-md">
                    <SmartSwapExperience
                      smartMode={smartMode}
                      setSmartMode={setSmartMode}
                      fromToken={fromToken}
                      toToken={toToken}
                      fromAmount={fromAmount}
                      setFromAmount={setFromAmount}
                      toAmount={toAmount}
                      onFlipTokens={handleFlipTokens}
                      onMaxAmount={handleMaxAmount}
                      onOpenTokenSelect={setShowTokenSelect}
                      onExecuteSwap={executeSwap}
                      isMobile={false}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl mx-auto">
                <OldJupiterOverloadedUI isMobile={false} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* 3. TOKEN SELECTOR DRAWER / MODAL                         */}
      {/* ======================================================== */}
      {showTokenSelect && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E131F] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Select a Token</h3>
              <button
                onClick={() => setShowTokenSelect(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search name or mint address..."
                className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
              {TOKENS.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    if (showTokenSelect === "from") {
                      setFromToken(token);
                    } else {
                      setToToken(token);
                    }
                    setShowTokenSelect(null);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${token.color} flex items-center justify-center font-bold text-white text-base`}>
                      {token.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{token.symbol}</div>
                      <div className="text-xs text-slate-400">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">{token.balance.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">${token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(2)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. TRANSACTION SIMULATION & SUCCESS MODAL                */}
      {/* ======================================================== */}
      {swapState !== "idle" && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E131F] border border-slate-800 rounded-3xl p-6 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {swapState === "simulating" ? (
              <div className="py-6 space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white text-lg">Routing Smart Swap</h3>
                  <p className="text-xs text-emerald-400 font-mono animate-pulse">{simulationStep}</p>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 text-left text-xs space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Sending</span>
                    <span className="text-white font-medium">{fromAmount} {fromToken.symbol}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Guaranteed minimum</span>
                    <span className="text-emerald-400 font-medium">{toAmount} {toToken.symbol}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>MEV protection</span>
                    <span className="text-purple-400 font-medium">Jito Bundle Active</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Success State & Beautiful Receipt Card */
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-xl text-white">Swap Completed!</h3>
                  <p className="text-xs text-slate-400">Finalized on Solana in 0.38s • Network fee: &lt;$0.001</p>
                </div>

                {/* Receipt Card */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-left space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">Exchange Outcome</span>
                    <span className="text-emerald-400 font-semibold">100% Best Execution</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${fromToken.color} flex items-center justify-center text-xs text-white`}>
                        {fromToken.icon}
                      </div>
                      <span className="font-semibold text-white">{fromAmount} {fromToken.symbol}</span>
                    </div>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 rotate-90" />
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${toToken.color} flex items-center justify-center text-xs text-white`}>
                        {toToken.icon}
                      </div>
                      <span className="font-semibold text-emerald-400">{toAmount} {toToken.symbol}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Saved vs CEX Spread:</span>
                      <span className="text-emerald-400 font-medium">+$3.42 (No custodian fee)</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Transaction Signature:</span>
                      <button
                        onClick={() => copyToClipboard(txSignature)}
                        className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-mono"
                      >
                        <span>{txSignature.slice(0, 8)}...{txSignature.slice(-6)}</span>
                        {copiedTx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setCopiedShare(true);
                      setTimeout(() => setCopiedShare(false), 2000);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedShare ? "Link Copied!" : "Share Receipt"}</span>
                  </button>

                  <button
                    onClick={() => setSwapState("idle")}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. INTERACTIVE 3-STEP ONBOARDING TOUR MODAL              */}
      {/* ======================================================== */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0E131F] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪐</span>
                <span className="font-bold text-white text-sm">Human Onboarding (Step {onboardingStep} of 3)</span>
              </div>
              <button
                onClick={() => setShowOnboarding(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all ${
                    onboardingStep >= step ? "bg-gradient-to-r from-purple-500 to-emerald-400" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            {onboardingStep === 1 && (
              <div className="space-y-4 py-2">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl mx-auto">
                  ⚡
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-lg text-white">Why Swap on Solana?</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Solana settles in <strong className="text-white">400 milliseconds</strong> with gas fees less than a tenth of a cent (&lt;$0.001). You never have to worry about expensive failed transactions.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> Instant finality (<span className="font-mono">0.4s</span>)
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> 1,000x cheaper than Ethereum
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4 py-2">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl mx-auto">
                  🛡️
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-lg text-white">How Jupiter Protects Your Money</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Jupiter aggregates over 30 decentralized exchanges to give you the exact best market price, with automated front-running protection built in.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> Zero MEV sandwich attacks via Jito
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> Guaranteed minimum output or transaction safely cancels
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-4 py-2">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl mx-auto">
                  🎯
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-lg text-white">Smart Mode vs. Pro Mode</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Default <strong className="text-emerald-400">Human Mode</strong> simplifies everything into plain English. If you ever need deep charts, routing graphs, and slippage micro-tuning, switch to <strong className="text-purple-400">Pro Mode</strong> in one tap.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> 1-Click mode switcher in top right corner
                  </div>
                  <div className="flex items-center gap-2 text-amber-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> Fully customizable for beginners & pros alike
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {onboardingStep > 1 && (
                <button
                  onClick={() => setOnboardingStep((s) => s - 1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (onboardingStep < 3) {
                    setOnboardingStep((s) => s + 1);
                  } else {
                    setShowOnboarding(false);
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-400 hover:opacity-95 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                {onboardingStep === 3 ? "Start Swapping with Confidence" : "Next Step"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. UX AUDIT MODAL (SPIN & JTBD Inspection)               */}
      {/* ======================================================== */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0E131F] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-lg text-white">Product & UX Audit Report</h3>
                <p className="text-xs text-slate-400">SPIN & Jobs-to-be-Done Framework for Superteam Earn Bounty</p>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/30">
                <span className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">1. The Core Situation</span>
                <p className="mt-1 leading-relaxed text-slate-300">
                  Jupiter handles 80%+ of Solana swap volume. However, its interface was architected for DeFi veterans. The next wave of 100M retail users entering via Solana Mobile & Blinks face immediate cognitive paralysis.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-800/30">
                <span className="font-bold text-red-300 uppercase tracking-wider text-[10px]">2. The Problem (Cognitive Paralysis)</span>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-300">
                  <li><strong>14+ parameters exposed at once:</strong> Slippage %, Priority Fees in micro-lamports, 5-DEX split routes, versioned txs.</li>
                  <li><strong>Zero human guarantees:</strong> Users have no reassurance of the minimum fiat value they will receive.</li>
                  <li><strong>Fear of irreversible errors:</strong> Over 60% of first-time users abandon their swap before signing.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
                <span className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">3. The Need-Payoff (Our Redesign)</span>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-300">
                  <li><strong>Dual Mode Architecture:</strong> Smart Human Mode (clean & guaranteed) + Pro Mode (technical control).</li>
                  <li><strong>Human-Friendly Ledger Translation:</strong> Micro-lamports translated to &quot;&lt;$0.001&quot;, MEV bundle translated to &quot;Front-Running Shield Active&quot;.</li>
                  <li><strong>Confidence-Building Receipt:</strong> Beautiful post-swap breakdown with verifiable onchain proof.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowAuditModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
            >
              Close Audit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==============================================================
// 7. COMPONENT: NEW SMART SWAP EXPERIENCE (After Redesign)     
// ==============================================================
interface SmartSwapProps {
  smartMode: "human" | "pro";
  setSmartMode: (mode: "human" | "pro") => void;
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  setFromAmount: (val: string) => void;
  toAmount: string;
  onFlipTokens: () => void;
  onMaxAmount: () => void;
  onOpenTokenSelect: (type: "from" | "to") => void;
  onExecuteSwap: () => void;
  isMobile: boolean;
}

function SmartSwapExperience({
  smartMode,
  setSmartMode,
  fromToken,
  toToken,
  fromAmount,
  setFromAmount,
  toAmount,
  onFlipTokens,
  onMaxAmount,
  onOpenTokenSelect,
  onExecuteSwap,
  isMobile,
}: SmartSwapProps) {
  return (
    <div className="w-full space-y-3">
      {/* Top Header Card */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Swap</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Human vs Pro Mode Toggle */}
        <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setSmartMode("human")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              smartMode === "human"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Human
          </button>
          <button
            onClick={() => setSmartMode("pro")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              smartMode === "pro"
                ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Pro ⚙️
          </button>
        </div>
      </div>

      {/* Main Swap Card */}
      <div className="bg-[#0C101A] border border-slate-800/90 rounded-3xl p-4 shadow-xl space-y-3 relative glow-solana">
        {/* SEND SECTION */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-2 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>You Send</span>
            <div className="flex items-center gap-1.5">
              <span>Bal: {fromToken.balance.toLocaleString()}</span>
              <button
                onClick={onMaxAmount}
                className="text-[10px] font-bold text-purple-400 hover:text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded"
              >
                MAX
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="w-1/2 bg-transparent text-2xl font-bold text-white focus:outline-none placeholder-slate-600"
            />

            <button
              onClick={() => onOpenTokenSelect("from")}
              className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 px-3 py-1.5 rounded-xl transition-all"
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${fromToken.color} flex items-center justify-center text-xs text-white`}>
                {fromToken.icon}
              </div>
              <span className="font-semibold text-xs text-white">{fromToken.symbol}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            ~${(parseFloat(fromAmount || "0") * fromToken.price).toFixed(2)} USD
          </div>
        </div>

        {/* FLIP BUTTON */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={onFlipTokens}
            className="w-9 h-9 rounded-full bg-[#111726] border border-slate-700 text-purple-400 hover:text-emerald-400 hover:border-emerald-500/50 flex items-center justify-center transition-all shadow-md hover:rotate-180 duration-300"
            title="Invert tokens"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* RECEIVE SECTION */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-2 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>You Receive (Guaranteed)</span>
            <span>Bal: {toToken.balance.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="w-1/2 text-2xl font-bold text-emerald-400">
              {toAmount}
            </div>

            <button
              onClick={() => onOpenTokenSelect("to")}
              className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 px-3 py-1.5 rounded-xl transition-all"
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${toToken.color} flex items-center justify-center text-xs text-white`}>
                {toToken.icon}
              </div>
              <span className="font-semibold text-xs text-white">{toToken.symbol}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            ~${(parseFloat(toAmount || "0") * toToken.price).toFixed(2)} USD
          </div>
        </div>

        {/* HUMAN-READABLE PARAMETER TRANSLATION CARD */}
        {smartMode === "human" ? (
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800/60 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Front-running Shield</span>
              </div>
              <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Zero MEV Risk
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Network Speed</span>
              </div>
              <span className="text-slate-200">Sub-second (&lt;0.4s) • Fee: &lt;$0.001</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Price Protection</span>
              </div>
              <span className="text-slate-200">Guaranteed min: {toAmount} {toToken.symbol}</span>
            </div>
          </div>
        ) : (
          /* PRO MODE TECHNICAL DRAWER */
          <div className="bg-purple-950/20 rounded-xl p-3 border border-purple-800/40 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Slippage Tolerance</span>
              <span className="text-purple-300 font-semibold">0.5% (Dynamic)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Priority Fee</span>
              <span className="text-purple-300">10,000 µLamports</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Routing Split</span>
              <span className="text-slate-300">65% Raydium CLMM / 35% Orca</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Versioned Tx</span>
              <span className="text-emerald-400">Enabled (v0)</span>
            </div>
          </div>
        )}

        {/* PRIMARY CALL TO ACTION BUTTON */}
        <button
          onClick={onExecuteSwap}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-extrabold text-sm transition-all shadow-lg glow-button active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Smart Swap (Instant)</span>
        </button>
      </div>
    </div>
  );
}

// ==============================================================
// 8. COMPONENT: OLD JUPITER OVERLOADED UI (Before Redesign)     
// ==============================================================
function OldJupiterOverloadedUI({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="w-full space-y-3">
      {/* Visual Annotation Callout */}
      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-red-400 font-bold">
          <AlertTriangle className="w-4 h-4" />
          <span>Before Redesign: 14+ Overwhelming Technical Knobs</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Users encounter micro-lamports, split routes, slippage sliders, and ambiguous warnings without understanding their financial meaning.
        </p>
      </div>

      {/* Cluttered Old Swap Container */}
      <div className="bg-[#131824] border border-slate-700 rounded-3xl p-4 shadow-xl space-y-3 text-xs">
        {/* Navigation Overload */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] overflow-x-auto text-slate-400 gap-3">
          <span className="text-amber-400 font-bold border-b-2 border-amber-400 pb-1">Swap</span>
          <span>Limit</span>
          <span>DCA</span>
          <span>VA</span>
          <span>Bridge</span>
          <span>Perps</span>
          <span className="ml-auto text-slate-300">⚙️ Advanced</span>
        </div>

        {/* Slippage & Priority Warning */}
        <div className="bg-amber-950/20 border border-amber-800/40 p-2.5 rounded-xl space-y-1 text-[11px]">
          <div className="flex justify-between text-amber-300 font-medium">
            <span>Slippage Tolerance: 0.5% (Dynamic)</span>
            <span>Priority Fee: 10000 µLamports</span>
          </div>
          <div className="text-slate-400 text-[10px]">
            ⚠️ High slippage risk during network volatility. Transaction might fail or be front-run.
          </div>
        </div>

        {/* Input 1 */}
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>You Pay</span>
            <span>Balance: 2.45104 SOL</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-mono font-bold text-white">1.0</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded text-white font-semibold">SOL ▼</span>
          </div>
        </div>

        {/* Complex Routing Graph Representation */}
        <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800 text-[10px] space-y-1 text-slate-400 font-mono">
          <div className="flex justify-between text-slate-300 font-sans">
            <span>Route Split Graph (4 Pools):</span>
            <span className="text-purple-400">3 Hops</span>
          </div>
          <div>55% Raydium CLMM (Pool: 8s...kQ)</div>
          <div>35% Orca Whirlpool (Pool: 7m...2X)</div>
          <div>10% Meteora DLMM (Pool: 4p...9L)</div>
        </div>

        {/* Input 2 */}
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>You Receive</span>
            <span>~$154.21</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-mono font-bold text-slate-200">154.219842</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded text-white font-semibold">USDC ▼</span>
          </div>
        </div>

        {/* Dense Parameter Dump */}
        <div className="space-y-1 text-[10px] text-slate-400 font-mono pt-1">
          <div className="flex justify-between">
            <span>Price Impact:</span>
            <span>0.04%</span>
          </div>
          <div className="flex justify-between">
            <span>Minimum Received:</span>
            <span>153.448743 USDC</span>
          </div>
          <div className="flex justify-between">
            <span>MEV Protection:</span>
            <span>Strict Jito Bundle</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Network Fee:</span>
            <span>0.00015 SOL ($0.023)</span>
          </div>
        </div>

        {/* Ambiguous Action Button */}
        <button className="w-full py-3 bg-amber-500/80 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all">
          Swap with Jupiter
        </button>
      </div>
    </div>
  );
}
