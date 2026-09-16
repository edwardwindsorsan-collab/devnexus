import React, { useState } from 'react';
import { Radio, Mic, Video, PowerOff, Fingerprint, AlertTriangle, ShieldAlert, Youtube, Activity, VideoOff } from 'lucide-react';

export function EmergencyProtocolEmulator() {
  const [soundRec, setSoundRec] = useState(false);
  const [ytBroadcast, setYtBroadcast] = useState(false);
  const [fakePowerDown, setFakePowerDown] = useState(false);
  const [diplomaticImmunity, setDiplomaticImmunity] = useState(false);

  return (
    <div className="space-y-6">
      {/* Emergency Protocol Controls */}
      <div>
        <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" /> Emergency Protocol & Broadcasting
        </label>
        
        <div className="bg-zinc-950 p-5 rounded-2xl border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
            <div className="mb-6 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-rose-400">Extreme Threat Level Protocols</h4>
                    <p className="text-[10px] text-zinc-400 mt-1">
                        These features operate at the kernel level and will persist through standard power cycle events and screen locks.
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {/* Continuous Sound Recognition */}
                <button 
                    onClick={() => setSoundRec(!soundRec)}
                    className="w-full bg-zinc-900 p-4 rounded-xl flex justify-between items-center border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${soundRec ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            <Mic className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-sm font-medium">Continuous Sound Recognition</span>
                            <span className="text-[10px] text-zinc-500">Always-on background listening mask</span>
                        </div>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${soundRec ? 'bg-emerald-500' : 'bg-zinc-800'}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${soundRec ? 'bg-zinc-900 right-0.5 shadow-sm' : 'bg-zinc-400 left-0.5'}`}></div>
                    </div>
                </button>

                {/* YouTube Live Broadcast */}
                <button 
                    onClick={() => setYtBroadcast(!ytBroadcast)}
                    className="w-full bg-zinc-900 p-4 rounded-xl flex justify-between items-center border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${ytBroadcast ? 'bg-rose-500/20 text-rose-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            <Youtube className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-sm font-medium">Emergency YouTube Broadcast</span>
                            <span className="text-[10px] text-zinc-500">Stream audio/video directly to linked channel</span>
                        </div>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${ytBroadcast ? 'bg-rose-500' : 'bg-zinc-800'}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${ytBroadcast ? 'bg-white right-0.5 shadow-sm' : 'bg-zinc-400 left-0.5'}`}></div>
                    </div>
                </button>
            </div>
        </div>
      </div>

      {/* Advanced Lock & Wipe */}
      <div>
        <label className="text-xs text-zinc-500 uppercase font-semibold tracking-widest block mb-4 flex items-center gap-2">
            <PowerOff className="w-4 h-4 text-amber-500" /> Device Integrity Overrides
        </label>
        
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/50 space-y-4">
            
            {/* Fake Power Down */}
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <PowerOff className={`w-5 h-5 ${fakePowerDown ? 'text-amber-400' : 'text-zinc-500'}`} />
                    <div>
                        <p className="text-sm font-medium text-zinc-200">Fake Power-Down Mode</p>
                        <p className="text-[10px] text-zinc-500">Screen goes black, services remain active</p>
                    </div>
                </div>
                <button 
                    onClick={() => setFakePowerDown(!fakePowerDown)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${fakePowerDown ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}
                >
                    {fakePowerDown ? 'Simulating' : 'Enable'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Print Override */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between">
                    <Fingerprint className="w-5 h-5 text-indigo-400 mb-3" />
                    <p className="text-xs font-medium text-zinc-200 mb-1">Print Override</p>
                    <p className="text-[9px] text-zinc-500 mb-3">Require secondary finger to trigger wipe instead of unlock.</p>
                    <button className="text-xs bg-zinc-800 hover:bg-zinc-700 py-1.5 rounded-lg transition-colors w-full">Config Print</button>
                </div>

                {/* Diplomatic Immunity */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between">
                    <ShieldAlert className={`w-5 h-5 mb-3 ${diplomaticImmunity ? 'text-rose-500' : 'text-zinc-500'}`} />
                    <p className="text-xs font-medium text-zinc-200 mb-1">Diplomatic Immunity</p>
                    <p className="text-[9px] text-zinc-500 mb-3">Instantly corrupt encryption headers upon unauthorized PIN.</p>
                    <button 
                        onClick={() => setDiplomaticImmunity(!diplomaticImmunity)}
                        className={`text-xs py-1.5 rounded-lg transition-colors w-full ${diplomaticImmunity ? 'bg-rose-500 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}
                    >
                        {diplomaticImmunity ? 'Armed' : 'Arm Protocol'}
                    </button>
                </div>
            </div>

            {/* Broadcast Status Visualizer */}
            {(ytBroadcast || soundRec) && (
              <div className="mt-4 bg-zinc-900 p-4 rounded-xl border border-rose-500/30 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-rose-500 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                          LIVE BROADCASTING
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-1">Uplink: youtube.com/live/encrypted-stream</p>
                  </div>
                  <Activity className="w-5 h-5 text-rose-500 animate-pulse" />
              </div>
            )}

        </div>
      </div>
    </div>
  );
}
