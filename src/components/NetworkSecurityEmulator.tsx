import React, { useState } from 'react';
import { Shield, Globe, MapPin, HardDrive, Database, RefreshCw, Power, Network } from 'lucide-react';

export function VPNSecuritySimulator() {
  const [vpnConnected, setVpnConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [server, setServer] = useState('switzerland');
  
  const [macAddress, setMacAddress] = useState('00:00:00:00:00:00');
  const [spoofing, setSpoofing] = useState(false);

  const toggleVpn = () => {
    if (vpnConnected) {
        setVpnConnected(false);
    } else {
        setConnecting(true);
        setTimeout(() => {
            setConnecting(false);
            setVpnConnected(true);
        }, 1200);
    }
  };

  const generateMac = () => {
    const hexDigits = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
        mac += hexDigits.charAt(Math.floor(Math.random() * 16));
        mac += hexDigits.charAt(Math.floor(Math.random() * 16));
        if (i !== 5) mac += ":";
    }
    setMacAddress(mac);
    setSpoofing(true);
  };

  return (
    <div className="space-y-4">
      {/* VPN Section */}
      <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/50">
        <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" /> Secure Tunnel (VPN)
        </label>
        
        <div className="flex gap-3 mb-4">
            <select 
                value={server} 
                onChange={(e) => setServer(e.target.value)}
                disabled={vpnConnected || connecting}
                className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-lg px-3 py-2 flex-1 outline-none disabled:opacity-50"
            >
                <option value="switzerland">Zurich, CH (Privacy+)</option>
                <option value="iceland">Reykjavik, IS (No-Log)</option>
                <option value="panama">Panama City, PA</option>
                <option value="romania">Bucharest, RO (Tor Node)</option>
            </select>
            
            <button 
                onClick={toggleVpn}
                disabled={connecting}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                    vpnConnected 
                        ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' 
                        : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                }`}
            >
                {connecting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Power className="w-3 h-3" />}
                {vpnConnected ? 'Disconnect' : 'Connect'}
            </button>
        </div>
        
        {vpnConnected && (
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-1">
                    <span>Virtual IP: <span className="text-emerald-400 font-mono">185.12.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}</span></span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Encrypted</span>
                </div>
            </div>
        )}
      </div>

      {/* MAC Spoofing Section */}
      <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/50">
        <div className="flex justify-between items-center mb-4">
            <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-400" /> MAC Spoofing
            </label>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex justify-between items-center">
            <div>
                <p className="text-[10px] text-zinc-500 uppercase mb-1">Hardware ID</p>
                <p className={`font-mono text-sm ${spoofing ? 'text-emerald-400' : 'text-zinc-300'}`}>{macAddress}</p>
            </div>
            <button 
                onClick={generateMac}
                className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-xs transition-colors text-zinc-300"
            >
                Randomize
            </button>
        </div>
      </div>
    </div>
  );
}

export function CloudStorageEmulator() {
    const [driveMounted, setDriveMounted] = useState(false);
    const [teraboxMounted, setTeraboxMounted] = useState(false);

    return (
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/50 h-full flex flex-col">
            <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" /> Virtual Mounts
            </label>
            
            <div className="space-y-3 flex-1 flex flex-col">
                <div className={`p-4 rounded-xl border flex justify-between items-center transition-colors ${driveMounted ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-zinc-900 border-zinc-800'}`}>
                    <div className="flex items-center gap-3">
                        <Database className={`w-5 h-5 ${driveMounted ? 'text-indigo-400' : 'text-zinc-500'}`} />
                        <div>
                            <p className="text-sm font-medium text-zinc-200">G-Drive Node</p>
                            <p className="text-[10px] text-zinc-500">{driveMounted ? '2.1TB / 2.1TB Free • /mnt/gdrive' : 'Unmounted'}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setDriveMounted(!driveMounted)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${driveMounted ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                    >
                        {driveMounted ? 'Unmount' : 'Mount'}
                    </button>
                </div>

                <div className={`p-4 rounded-xl border flex justify-between items-center transition-colors ${teraboxMounted ? 'bg-amber-500/5 border-amber-500/20' : 'bg-zinc-900 border-zinc-800'}`}>
                    <div className="flex items-center gap-3">
                        <HardDrive className={`w-5 h-5 ${teraboxMounted ? 'text-amber-400' : 'text-zinc-500'}`} />
                        <div>
                            <p className="text-sm font-medium text-zinc-200">Terabox Cluster</p>
                            <p className="text-[10px] text-zinc-500">{teraboxMounted ? '1024GB Free • /mnt/terabox' : 'Unmounted'}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setTeraboxMounted(!teraboxMounted)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${teraboxMounted ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-zinc-800 border-amber-500/30 text-amber-400 hover:bg-zinc-700'}`}
                    >
                        {teraboxMounted ? 'Unmount' : 'Mount'}
                    </button>
                </div>
                
                {/* Visualizer Block */}
                <div className="mt-auto pt-4">
                     <p className="text-[10px] text-zinc-500 mb-2">VIRTUAL STORAGE ALLOCATION</p>
                     <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex gap-0.5">
                        <div className="w-[12%] bg-emerald-500 h-full"></div>
                        <div className={`transition-all duration-500 ${driveMounted ? 'w-[43%]' : 'w-0'} bg-indigo-500 h-full`}></div>
                        <div className={`transition-all duration-500 ${teraboxMounted ? 'w-[20%]' : 'w-0'} bg-amber-500 h-full`}></div>
                     </div>
                     <div className="flex gap-4 mt-2">
                        <span className="text-[9px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> System</span>
                        {driveMounted && <span className="text-[9px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> G-Drive</span>}
                        {teraboxMounted && <span className="text-[9px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Terabox</span>}
                     </div>
                </div>
            </div>
        </div>
    )
}
