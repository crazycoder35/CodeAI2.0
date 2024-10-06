import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useAgents } from '../contexts/AgentContext';
import { Project, Task } from '../types';
import { PlusCircle, Edit3, ChevronDown, ChevronUp } from 'lucide-react';

const ProjectCreation: React.FC = () => {
  const { setProject } = useProject();
  const { agents, updateAgentStatus } = useAgents();
  const [projectName, setProjectName] = useState('');
  const [projectPath, setProjectPath] = useState('');
  const [template, setTemplate] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<Task[]>([]);
  const [showTaskReview, setShowTaskReview] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  const generateTasks = (title: string, template: string): Task[] => {
    let tasks: Task[] = [];
    const lowercaseTitle = title.toLowerCase();
    const lowercaseTemplate = template.toLowerCase();

    if (lowercaseTitle.includes('e-commerce') || lowercaseTemplate.includes('e-commerce')) {
      tasks = [
        {
          id: '1',
          description: 'Set up frontend structure',
          assignedTo: 'Developer',
          status: 'pending',
          priority: 'high',
          submodule: 'Frontend',
          subtasks: [
            { id: '1-1', description: 'Create React app', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Frontend' },
            { id: '1-2', description: 'Set up routing', assignedTo: 'Developer', status: 'pending', priority: 'medium', submodule: 'Frontend' },
          ]
        },
        {
          id: '2',
          description: 'Implement backend API',
          assignedTo: 'Developer',
          status: 'pending',
          priority: 'high',
          submodule: 'Backend',
          subtasks: [
            { id: '2-1', description: 'Set up Express server', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Backend' },
            { id: '2-2', description: 'Create API endpoints', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Backend' },
          ]
        },
        { id: '3', description: 'Design database schema', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Database' },
        { id: '4', description: 'Implement user authentication', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Security' },
        { id: '5', description: 'Set up payment gateway', assignedTo: 'Developer', status: 'pending', priority: 'medium', submodule: 'Payment' },
        { id: '6', description: 'Implement product search functionality', assignedTo: 'Developer', status: 'pending', priority: 'medium', submodule: 'Search' },
        { id: '7', description: 'Create admin dashboard', assignedTo: 'Developer', status: 'pending', priority: 'low', submodule: 'Admin' },
        { id: '8', description: 'Implement inventory management', assignedTo: 'Developer', status: 'pending', priority: 'medium', submodule: 'Inventory' },
        { id: '9', description: 'Set up CI/CD pipeline', assignedTo: 'DevOps', status: 'pending', priority: 'low', submodule: 'DevOps' },
        { id: '10', description: 'Perform security audit', assignedTo: 'Security Expert', status: 'pending', priority: 'high', submodule: 'Security' },
      ];
    } else if (lowercaseTitle.includes('ai') || lowercaseTitle.includes('machine learning') || lowercaseTemplate.includes('ai')) {
      tasks = [
        {
          id: '1',
          description: 'Set up AI/ML environment',
          assignedTo: 'Developer',
          status: 'pending',
          priority: 'high',
          submodule: 'Environment',
          subtasks: [
            { id: '1-1', description: 'Install necessary libraries', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Environment' },
            { id: '1-2', description: 'Configure GPU support', assignedTo: 'Developer', status: 'pending', priority: 'medium', submodule: 'Environment' },
          ]
        },
        {
          id: '2',
          description: 'Data preprocessing',
          assignedTo: 'Data Scientist',
          status: 'pending',
          priority: 'high',
          submodule: 'Data',
          subtasks: [
            { id: '2-1', description: 'Data cleaning', assignedTo: 'Data Scientist', status: 'pending', priority: 'high', submodule: 'Data' },
            { id: '2-2', description: 'Feature engineering', assignedTo: 'Data Scientist', status: 'pending', priority: 'high', submodule: 'Data' },
          ]
        },
        { id: '3', description: 'Model selection', assignedTo: 'ML Engineer', status: 'pending', priority: 'high', submodule: 'Model' },
        { id: '4', description: 'Model training', assignedTo: 'ML Engineer', status: 'pending', priority: 'high', submodule: 'Model' },
        { id: '5', description: 'Model evaluation', assignedTo: 'ML Engineer', status: 'pending', priority: 'medium', submodule: 'Model' },
        { id: '6', description: 'API development for model serving', assignedTo: 'Developer', status: 'pending', priority: 'medium', submodule: 'API' },
        { id: '7', description: 'Frontend development for model interaction', assignedTo: 'Developer', status: 'pending', priority: 'low', submodule: 'Frontend' },
        { id: '8', description: 'Set up monitoring for model performance', assignedTo: 'DevOps', status: 'pending', priority: 'low', submodule: 'Monitoring' },
        { id: '9', description: 'Implement CI/CD for ML pipeline', assignedTo: 'DevOps', status: 'pending', priority: 'medium', submodule: 'DevOps' },
        { id: '10', description: 'Document model architecture and usage', assignedTo: 'Technical Writer', status: 'pending', priority: 'low', submodule: 'Documentation' },
      ];
    } else {
      tasks = [
        {
          id: '1',
          description: 'Set up project structure',
          assignedTo: 'Developer',
          status: 'pending',
          priority: 'high',
          submodule: 'Setup',
          subtasks: [
            { id: '1-1', description: 'Initialize repository', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Setup' },
            { id: '1-2', description: 'Set up basic folder structure', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Setup' },
          ]
        },
        { id: '2', description: 'Define project requirements', assignedTo: 'Project Manager', status: 'pending', priority: 'high', submodule: 'Planning' },
        { id: '3', description: 'Create initial project timeline', assignedTo: 'Project Manager', status: 'pending', priority: 'medium', submodule: 'Planning' },
        { id: '4', description: 'Set up development environment', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Setup' },
        { id: '5', description: 'Implement core functionality', assignedTo: 'Developer', status: 'pending', priority: 'high', submodule: 'Development' },
      ];
    }

    return tasks;
  };

  const handleGenerateTasks = () => {
    const tasks = generateTasks(projectName, template);
    setGeneratedTasks(tasks);
    setShowTaskReview(true);
  };

  const handleTaskUpdate = (taskId: string, newDescription: string) => {
    setGeneratedTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submodules = Array.from(new Set(generatedTasks.map(task => task.submodule)));
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      path: projectPath,
      tasks: generatedTasks,
      submodules
    };
    setProject(newProject);

    // Update agent statuses based on assigned tasks
    agents.forEach(agent => {
      const agentTasks = generatedTasks.filter(task => task.assignedTo === agent.name);
      if (agentTasks.length > 0) {
        updateAgentStatus(agent.id, 'working', agentTasks[0].description);
      }
    });

    setProjectName('');
    setProjectPath('');
    setTemplate('');
    setGeneratedTasks([]);
    setShowTaskReview(false);
  };

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Project</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Enter the details for your new AI coding project.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-1/3">
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                id="projectName"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label htmlFor="projectPath" className="block text-sm font-medium text-gray-700">
                Project Path
              </label>
              <input
                type="text"
                name="projectPath"
                id="projectPath"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Project Path"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                required
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                Project Template
              </label>
              <select
                id="template"
                name="template"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                required
              >
                <option value="">Select a template</option>
                <option value="e-commerce">E-Commerce Web App</option>
                <option value="ai">AI-Based Application</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          {!showTaskReview && (
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleGenerateTasks}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Generate Tasks
                </button>
              </div>
            </div>
          )}
          {showTaskReview && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Review Generated Tasks</h4>
              <ul className="space-y-3">
                {generatedTasks.map((task) => (
                  <li key={task.id} className="border border-gray-200 rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-grow">
                        <input
                          type="text"
                          value={task.description}
                          onChange={(e) => handleTaskUpdate(task.id, e.target.value)}
                          className="flex-grow focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <span className="text-sm text-gray-500">{task.assignedTo}</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-sm text-gray-500">{task.submodule}</span>
                      </div>
                      {task.subtasks && task.subtasks.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleTaskExpansion(task.id)}
                          className="ml-2 text-gray-400 hover:text-gray-500"
                        >
                          {expandedTasks.includes(task.id) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>
                    {task.subtasks && task.subtasks.length > 0 && expandedTasks.includes(task.id) && (
                      <ul className="mt-2 pl-6 space-y-2">
                        {task.subtasks.map((subtask) => (
                          <li key={subtask.id} className="flex items-center space-x-3">
                            <input
                              type="text"
                              value={subtask.description}
                              onChange={(e) => handleTaskUpdate(subtask.id, e.target.value)}
                              className="flex-grow focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            <span className="text-sm text-gray-500">{subtask.assignedTo}</span>
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                              subtask.priority === 'high' ? 'bg-red-100 text-red-800' :
                              subtask.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {subtask.priority}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create Project
                </button>
                <button
                  type="button"
                  onClick={() => setShowTaskReview(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProjectCreation;