/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Network, Shield, Smartphone, Key, RefreshCcw, Box, Signal, Battery, Cpu, Activity, Lock, Globe, AlertOctagon } from 'lucide-react';
import { CreditCardEmulator } from './components/CreditCardEmulator';
import { VPNSecuritySimulator, CloudStorageEmulator } from './components/NetworkSecurityEmulator';
import { EsimOperaSimulator } from './components/EsimOperaSimulator';
import { EmergencyProtocolEmulator } from './components/EmergencyProtocolEmulator';

export default function App() {
  const [imeiRandomization, setImeiRandomization] = useState(true);
  const [gpsSpoofing, setGpsSpoofing] = useState(false);
  const [activeTab, setActiveTab] = useState('console');
  
  const [logs, setLogs] = useState<string[]>([
    '> initializing virtual_hardware_abstraction_layer...',
    '> mapping system_permissions.root -> active',
    '> spoofing network_stack.mac_address -> [REDACTED]',
    '> vpn_tunnel.connect(port: 443, protocol: wireguard)',
    '> background_processing_manager.service_start(pkg: system.core)',
    '> esim.virtual_link_established(id: virtual_8291)',
  ]);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const messages = [
        '> nfc_chip.standby(type: felica/mifare)',
        '> network.simulate_latency(ms: 12)',
        '> secure_enclave.ping() -> OK',
        '> battery.virtual_drain(rate: 0.1%)',
        '> gps.mock_location(lat: 35.6895, lng: 139.6917)',
        '[WARN] thermal_throttle.limit: 42°C (STABLE)',
        '> diagnostic_report.upload_skipped (OFFLINE_MODE)'
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setLogs(prev => [...prev.slice(-15), randomMessage]);
    }, 3500);
    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans flex overflow-hidden">
      {/* Navigation Sidebar */}
      <nav className="w-72 bg-zinc-900/50 border-r border-zinc-800 p-8 flex flex-col shrink-0 overflow-y-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-indigo-400 italic">DevNexus OS</h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Advanced Build v14.2.0-Alpha</p>
        </div>
        
        <div className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('console')}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-colors ${activeTab === 'console' ? 'bg-zinc-800' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
          >
            {activeTab === 'console' ? (
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] shrink-0"></div>
            ) : (
              <Terminal className="w-4 h-4 shrink-0" />
            )}
            <span className="text-sm font-medium">System Console</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('network')}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-colors ${activeTab === 'network' ? 'bg-zinc-800' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
          >
            <Network className="w-4 h-4 shrink-0" />
            <span className="text-sm">Network Virtualization</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-colors ${activeTab === 'security' ? 'bg-zinc-800' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span className="text-sm">Security & Sandbox</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('device')}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-colors ${activeTab === 'device' ? 'bg-zinc-800' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span className="text-sm">Device Emulation</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('auth')}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-colors ${activeTab === 'auth' ? 'bg-zinc-800' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
          >
            <Key className="w-4 h-4 shrink-0" />
            <span className="text-sm">Auth Flow Debugger</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('emergency')}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-colors ${activeTab === 'emergency' ? 'bg-rose-500/10 text-rose-400' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
          >
            <AlertOctagon className="w-4 h-4 shrink-0" />
            <span className="text-sm">Emergency Protocol</span>
          </button>
        </div>

        <div className="pt-8 border-t border-zinc-800 mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">DEV</span>
            </div>
            <div>
              <p className="text-sm font-medium">Root Admin</p>
              <p className="text-[10px] text-zinc-500 uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Terminal Active
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col p-6 lg:p-10 h-screen overflow-y-auto">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-light mb-2">Device Overview</h2>
            <p className="text-zinc-400 max-w-lg">System health, virtual hardware configuration, and root-level network telemetry.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-zinc-100 text-zinc-950 text-sm font-semibold rounded-full hover:bg-white transition-colors flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              Refresh Metrics
            </button>
            <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-500 transition-colors flex items-center gap-2">
              <Box className="w-4 h-4" />
              Deploy Build
            </button>
          </div>
        </header>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] flex flex-col justify-between">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" /> Core Processing
              </p>
              <div className="text-3xl font-mono mb-2">12.4%</div>
            </div>
            <div>
              <div className="w-full h-1 bg-zinc-800 rounded-full mb-3">
                <div className="w-1/4 h-full bg-indigo-500 rounded-full"></div>
              </div>
              <p className="text-[10px] text-zinc-500">8 CORES ACTIVE | 3.2GHz MAX</p>
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] flex flex-col justify-between">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" /> Virtual Memory
              </p>
              <div className="text-3xl font-mono mb-2">4.2 / 16 GB</div>
            </div>
            <div>
              <div className="w-full h-1 bg-zinc-800 rounded-full mb-3">
                <div className="w-1/3 h-full bg-emerald-500 rounded-full"></div>
              </div>
              <p className="text-[10px] text-zinc-500">LPDDR5X | SWAP ENABLED</p>
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Network Privacy
              </p>
              <div className="text-3xl font-mono mb-2 text-indigo-400">ENCRYPTED</div>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 bg-zinc-800 text-[10px] rounded uppercase border border-zinc-700 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  VPN Active
                </span>
                <span className="px-2 py-0.5 bg-zinc-800 text-[10px] rounded uppercase border border-zinc-700 text-emerald-400 flex items-center gap-1">
                  MAC Randomized
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">IP: 192.168.12.84 (VIRTUAL TUNNEL)</p>
            </div>
          </div>
        </div>

        {/* Advanced Controls Section */}
        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden flex flex-col min-h-[400px]">
          <div className="border-b border-zinc-800 px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest">Hardware Emulation Controls</h3>
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> NFC SENSOR ACTIVE</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> eSIM VIRTUALIZED</span>
              <span className="text-[11px] text-amber-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> VOIP TUNNELING IDLE</span>
            </div>
          </div>
          
          <div className="flex-1 p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 overflow-y-auto">
            
            {/* Left Column Controls */}
            <div className="space-y-8">
              
              {activeTab === 'security' ? (
                 <VPNSecuritySimulator />
              ) : activeTab === 'auth' ? (
                 <CreditCardEmulator />
              ) : activeTab === 'emergency' ? (
                 <EmergencyProtocolEmulator />
              ) : (
                <div>
                  <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4">Hardware Identity Manager</label>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setImeiRandomization(!imeiRandomization)}
                      className="w-full bg-zinc-950 p-4 rounded-2xl flex justify-between items-center border border-zinc-800/50 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">IMEI Randomization</span>
                        <span className="text-[10px] text-zinc-500">Circumvent device fingerprinting</span>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${imeiRandomization ? 'bg-indigo-600' : 'bg-zinc-800'}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${imeiRandomization ? 'bg-white right-0.5 shadow-sm' : 'bg-zinc-400 left-0.5'}`}></div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setGpsSpoofing(!gpsSpoofing)}
                      className="w-full bg-zinc-950 p-4 rounded-2xl flex justify-between items-center border border-zinc-800/50 hover:border-zinc-700 transition-colors"
                    >
                       <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">Virtual GPS Spoofing</span>
                        <span className="text-[10px] text-zinc-500">Override location services</span>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${gpsSpoofing ? 'bg-indigo-600' : 'bg-zinc-800'}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${gpsSpoofing ? 'bg-white right-0.5 shadow-sm' : 'bg-zinc-400 left-0.5'}`}></div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'device' ? (
                 <CloudStorageEmulator />
              ) : activeTab === 'network' ? (
                 <EsimOperaSimulator />
              ) : (
                <div>
                  <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4">Connectivity Suite</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-zinc-950 rounded-2xl text-left border border-zinc-800 hover:border-indigo-500 transition-colors relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Signal className="w-4 h-4 text-zinc-400 mb-2 group-hover:text-indigo-400 transition-colors" />
                      <p className="text-[10px] text-zinc-500 uppercase mb-1">eSIM Profile</p>
                      <p className="text-sm font-medium">Provisioning-02</p>
                    </button>
                    
                    <button className="p-4 bg-zinc-950 rounded-2xl text-left border border-zinc-800 hover:border-indigo-500 transition-colors relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Network className="w-4 h-4 text-zinc-400 mb-2 group-hover:text-indigo-400 transition-colors" />
                      <p className="text-[10px] text-zinc-500 uppercase mb-1">VoIP Gateway</p>
                      <p className="text-sm font-medium text-amber-400">Bridge Mode</p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-zinc-950 rounded-3xl p-6 flex flex-col border border-zinc-900 shadow-inner h-64 lg:h-auto">
              <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4 flex items-center justify-between">
                Live Activity Monitor
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> REC</span>
              </label>
              <div className="flex-1 font-mono text-[11px] leading-relaxed space-y-1 overflow-y-auto pr-2 pb-2">
                {logs.map((log, i) => {
                  let color = "text-emerald-400/90";
                  if (log.includes("[WARN]")) color = "text-amber-500 font-medium";
                  if (log.includes("REDACTED")) color = "text-indigo-400";
                  if (log.includes("skipped") || log.includes("standby")) color = "text-zinc-500";
                  
                  return (
                    <p key={i} className={color}>{log}</p>
                  );
                })}
                <p className="text-zinc-500 animate-pulse mt-1">_</p>
                <div ref={bottomRef} />
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

