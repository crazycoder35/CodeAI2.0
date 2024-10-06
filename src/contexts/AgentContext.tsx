import React, { createContext, useState, useContext } from 'react';
import { Agent, AgentContextType } from '../types';

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'Developer', role: 'Developer', status: 'idle', currentTask: '' },
    { id: '2', name: 'Researcher', role: 'Researcher', status: 'idle', currentTask: '' },
    { id: '3', name: 'Tester', role: 'Tester', status: 'idle', currentTask: '' },
    { id: '4', name: 'Bug Fixer', role: 'Bug Fixer', status: 'idle', currentTask: '' },
  ]);

  const updateAgentStatus = (agentId: string, status: Agent['status'], currentTask: string) => {
    setAgents(prevAgents =>
      prevAgents.map(agent =>
        agent.id === agentId ? { ...agent, status, currentTask } : agent
      )
    );
  };

  return (
    <AgentContext.Provider value={{ agents, updateAgentStatus }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};