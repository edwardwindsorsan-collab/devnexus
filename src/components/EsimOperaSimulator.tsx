import React, { useState } from 'react';
import { Signal, Globe, Download, RefreshCw, Key, Smartphone, Maximize, AlertCircle } from 'lucide-react';

export function EsimOperaSimulator() {
  const [esimStatus, setEsimStatus] = useState<string>('Unprovisioned');
  const [carrier, setCarrier] = useState<string>('None');
  const [iccid, setIccid] = useState<string>('8900000000000000000');
  const [installing, setInstalling] = useState(false);

  const [operaVpnActive, setOperaVpnActive] = useState(false);

  const handleInstall = () => {
    setInstalling(true);
    setEsimStatus('Negotiating Profile...');
    setTimeout(() => {
        setEsimStatus('Active');
        setCarrier('AlphaNet Global');
        setIccid('8944' + Math.floor(100000000000000 + Math.random() * 900000000000000).toString());
        setInstalling(false);
    }, 2500);
  };

  const resetEsim = () => {
    setEsimStatus('Unprovisioned');
    setCarrier('None');
    setIccid('8900000000000000000');
  };

  return (
    <div className="space-y-6">
      {/* eSIM UI Manager */}
      <div>
        <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4 flex items-center gap-2">
            <Signal className="w-4 h-4 text-indigo-400" /> eSIM Install UI Manager
        </label>
        
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/50">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-sm font-medium">Virtual eSIM Provisioning</h4>
                    <p className="text-[10px] text-zinc-500">Inject raw SM-DP+ profiles directly to the virtual modem.</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded uppercase tracking-wider font-semibold ${esimStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
                    {esimStatus}
                </span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3 mb-4">
                <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                    <span className="text-xs text-zinc-500 flex items-center gap-1"><Smartphone className="w-3 h-3" /> Virtual Carrier</span>
                    <span className="text-sm font-medium text-zinc-300">{carrier}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                    <span className="text-xs text-zinc-500 flex items-center gap-1"><Key className="w-3 h-3" /> ICCID</span>
                    <span className="text-sm font-mono text-indigo-400">{iccid}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-zinc-500 flex items-center gap-1"><Signal className="w-3 h-3" /> Signal</span>
                    <span className="text-sm font-medium text-zinc-300">{esimStatus === 'Active' ? '-68 dBm (5G SA)' : 'No Signal'}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={handleInstall}
                    disabled={installing || esimStatus === 'Active'}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    {installing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    Install Profile
                </button>
                <button 
                    onClick={resetEsim}
                    disabled={esimStatus !== 'Active'}
                    className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                >
                    Wipe
                </button>
            </div>
        </div>
      </div>

      {/* Opera UI Integration */}
      <div>
        <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-rose-500" /> Opera Workspace Integration
        </label>
        
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 overflow-hidden">
            {/* Mock Opera Browser Header */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-3 py-2 flex items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                </div>
                <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-1 flex items-center gap-2">
                    <button 
                        onClick={() => setOperaVpnActive(!operaVpnActive)}
                        className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded transition-colors ${operaVpnActive ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                    >
                        VPN
                    </button>
                    <span className="text-[10px] text-zinc-500 flex-1 truncate">opera://network-isolation-sandbox</span>
                </div>
                <Maximize className="w-3 h-3 text-zinc-500" />
            </div>
            
            {/* Mock Opera Content */}
            <div className="p-5 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px] bg-gradient-to-b from-zinc-950 to-zinc-900/50">
                <Globe className={`w-8 h-8 ${operaVpnActive ? 'text-emerald-500' : 'text-rose-500'} transition-colors`} />
                <div>
                    <h5 className="text-sm font-semibold">{operaVpnActive ? 'Tunnel Secured via Opera VPN' : 'Opera Core Sandbox Ready'}</h5>
                    <p className="text-[10px] text-zinc-400 mt-1 max-w-[200px] mx-auto">
                        {operaVpnActive 
                            ? 'Encrypted proxy route active isolating web traffic from host system.' 
                            : 'Web traffic routing natively through virtualized network interfaces.'}
                    </p>
                </div>
                {!operaVpnActive && (
                    <div className="flex items-center gap-1.5 mt-2 bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-[9px] border border-amber-500/20">
                        <AlertCircle className="w-3 h-3" />
                        <span>ISOLATE TRAFFIC BEFORE TESTING</span>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
