import React, { useState } from 'react';
import { CreditCard, CheckCircle, XCircle, RefreshCw, DollarSign } from 'lucide-react';

export function CreditCardEmulator() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [simulateBalance, setSimulateBalance] = useState(false);
  const [balanceResult, setBalanceResult] = useState<string | null>(null);

  const generateCard = () => {
    // Generate mock Visa-like card
    let num = '4';
    for (let i = 0; i < 15; i++) {
        num += Math.floor(Math.random() * 10).toString();
    }
    // Format: "4xxx xxxx xxxx xxxx"
    setCardNumber(num.replace(/(.{4})/g, '$1 ').trim());
    
    // Generate expiry (future date)
    const month = Math.floor(Math.random() * 12) + 1;
    const year = new Date().getFullYear() % 100 + Math.floor(Math.random() * 5) + 1;
    setExpiry(`${month.toString().padStart(2, '0')}/${year}`);
    
    // Generate CVV
    setCvv(Math.floor(100 + Math.random() * 900).toString());
    
    setIsValid(null);
    setBalanceResult(null);
  };

  const validateCard = () => {
    if (cardNumber.length >= 19) { // 16 digits + 3 spaces
        setIsValid(true);
    } else {
        setIsValid(false);
    }
  };

  const checkBalance = () => {
    if (!isValid) return;
    setSimulateBalance(true);
    setTimeout(() => {
        const balance = Math.floor(Math.random() * 50000) / 100;
        setBalanceResult(`$${balance.toFixed(2)} (MOCK)`);
        setSimulateBalance(false);
    }, 800);
  };

  return (
    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            Financial Sandbox
        </h4>
        <button onClick={generateCard} className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded text-zinc-300 flex items-center gap-1 transition-colors">
            <RefreshCw className="w-3 h-3" /> Gen CC
        </button>
      </div>

      <div className="space-y-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-sm relative">
            <input 
                type="text" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)} 
                placeholder="XXXX XXXX XXXX XXXX" 
                className="bg-transparent outline-none w-full text-zinc-100 placeholder:text-zinc-600"
            />
            {isValid === true && <CheckCircle className="w-4 h-4 text-emerald-500 absolute right-3 top-3" />}
            {isValid === false && <XCircle className="w-4 h-4 text-rose-500 absolute right-3 top-3" />}
        </div>
        
        <div className="flex gap-3">
            <input 
                type="text" 
                value={expiry} 
                onChange={(e) => setExpiry(e.target.value)} 
                placeholder="MM/YY" 
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-sm w-1/2 outline-none text-zinc-100 placeholder:text-zinc-600"
            />
            <input 
                type="text" 
                value={cvv} 
                onChange={(e) => setCvv(e.target.value)} 
                placeholder="CVV" 
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-sm w-1/2 outline-none text-zinc-100 placeholder:text-zinc-600"
            />
        </div>

        <div className="flex gap-2 pt-2">
            <button 
                onClick={validateCard} 
                disabled={!cardNumber}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium py-2 rounded-lg transition-colors"
            >
                Validate
            </button>
            <button 
                onClick={checkBalance} 
                disabled={!isValid || simulateBalance}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
                {simulateBalance ? <RefreshCw className="w-3 h-3 animate-spin" /> : <DollarSign className="w-3 h-3" />}
                Run Auth test
            </button>
        </div>
        
        {balanceResult && (
            <div className="mt-2 text-center text-[11px] text-emerald-400 font-mono bg-emerald-500/10 py-1.5 rounded">
                Auth Success: Available Credit {balanceResult}
            </div>
        )}
      </div>
    </div>
  );
}
