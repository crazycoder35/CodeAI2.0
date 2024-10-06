import React from 'react';
import { useAgents } from '../contexts/AgentContext';
import { Activity, Code, Search, Bug, User } from 'lucide-react';

const AgentList: React.FC = () => {
  const { agents } = useAgents();

  const getAgentIcon = (role: string) => {
    switch (role) {
      case 'Developer':
        return <Code className="w-6 h-6" />;
      case 'Researcher':
        return <Search className="w-6 h-6" />;
      case 'Tester':
        return <Activity className="w-6 h-6" />;
      case 'Bug Fixer':
        return <Bug className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {agents.map((agent) => (
          <li key={agent.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getAgentIcon(agent.role)}
                  <p className="ml-3 text-sm font-medium text-gray-900">{agent.name}</p>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    agent.status === 'idle' ? 'bg-green-100 text-green-800' :
                    agent.status === 'working' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {agent.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {agent.role}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>{agent.currentTask || 'No current task'}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;