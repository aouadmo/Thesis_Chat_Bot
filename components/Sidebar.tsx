import React from 'react';
import { FileText, GitBranch, Thermometer, Cpu } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-gray-900 text-white w-72 border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Thermometer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Cryo-FDSOI</h1>
            <p className="text-xs text-gray-400">Thesis Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        
        {/* Abstract Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Thesis Scope</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Modeling 28nm FDSOI transistors for Quantum Computing control interfaces at deep cryogenic temperatures (4.2K).
          </p>
        </div>

        {/* Key Stats */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-blue-400 text-xs mb-1">Temp Range</div>
              <div className="font-mono text-sm">4K - 300K</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-blue-400 text-xs mb-1">Node</div>
              <div className="font-mono text-sm">28nm FDSOI</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-blue-400 text-xs mb-1">Statistics</div>
              <div className="font-mono text-sm">Fermi-Dirac</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-blue-400 text-xs mb-1">Mobility</div>
              <div className="font-mono text-sm">Bell-shape</div>
            </div>
          </div>
        </div>

        {/* Navigation/Highlights */}
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Core Topics</h3>
          
          <div className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 cursor-default transition">
            <Cpu className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
            <span className="text-sm text-gray-300 group-hover:text-white">Cryo-Physics</span>
          </div>
          <div className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 cursor-default transition">
            <GitBranch className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
            <span className="text-sm text-gray-300 group-hover:text-white">Numerical Model</span>
          </div>
          <div className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 cursor-default transition">
            <FileText className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
            <span className="text-sm text-gray-300 group-hover:text-white">Compact Model</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
            MA
          </div>
          <div>
            <p className="text-xs font-medium text-white">Mohamed Aouad</p>
            <p className="text-[10px] text-gray-500">Author / UGA 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;