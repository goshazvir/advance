#!/usr/bin/env node
/**
 * Script to scaffold new frontend components with proper structure
 * Usage: node scripts/create-component.js ComponentName [--view]
 */
import fs from 'fs';
import path from 'path';

function createComponentStructure(componentName, isView = false) {
  const basePath = isView
    ? path.join('src', 'views', 'flexx-apps', componentName.toLowerCase())
    : path.join('src', 'components', componentName);

  // Create directories
  fs.mkdirSync(basePath, {recursive: true});
  fs.mkdirSync(path.join(basePath, 'domain'), {recursive: true});

  if (isView) {
    fs.mkdirSync(path.join(basePath, 'components'), {recursive: true});
    fs.mkdirSync(path.join(basePath, 'hooks'), {recursive: true});
  }

  // Create main component file
  const componentContent = createComponentTemplate(componentName, isView);
  const fileName = `${componentName}.tsx`;
  fs.writeFileSync(path.join(basePath, fileName), componentContent);

  // Create domain types file
  const domainContent = createDomainTemplate(componentName);
  fs.writeFileSync(
    path.join(basePath, 'domain', `${componentName.toLowerCase()}.ts`),
    domainContent,
  );

  if (isView) {
    // Create hook file for views
    const hookContent = createHookTemplate(componentName);
    fs.writeFileSync(
      path.join(basePath, 'hooks', `use${componentName}.tsx`),
      hookContent,
    );

    // Create example component
    const exampleComponentContent =
      createExampleComponentTemplate(componentName);
    fs.writeFileSync(
      path.join(basePath, 'components', `${componentName}Card.tsx`),
      exampleComponentContent,
    );
  }

  // eslint-disable-next-line no-console
  console.log(`✅ Created ${isView ? 'view' : 'component'}: ${componentName}`);
  // eslint-disable-next-line no-console
  console.log(`📁 Location: ${basePath}`);
  // eslint-disable-next-line no-console
  console.log('📝 Next steps:');
  // eslint-disable-next-line no-console
  console.log('1. Update component implementation');
  // eslint-disable-next-line no-console
  console.log('2. Add to appropriate index files');
  if (isView) {
    // eslint-disable-next-line no-console
    console.log('3. Add route to navigation');
    // eslint-disable-next-line no-console
    console.log('4. Update API integration in hooks');
  } else {
    // eslint-disable-next-line no-console
    console.log('3. Export from components index');
    // eslint-disable-next-line no-console
    console.log('4. Add to Storybook if needed');
  }
}

function createComponentTemplate(componentName, isView) {
  return `'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

import { ${componentName}Props } from './domain/${componentName.toLowerCase()}';
${
  isView
    ? `import { use${componentName} } from './hooks/use${componentName}';
import { ${componentName}Card } from './components/${componentName}Card';`
    : ''
}

const ${componentName}: React.FC<${componentName}Props> = ({
  ${isView ? '// Add props here' : 'title, children, ...props'}
}) => {
  ${
    isView
      ? `const { 
    data, 
    isLoading, 
    error,
    // Add other hook returns 
  } = use${componentName}();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }`
      : ''
  }

  return (
    <${isView ? 'Box' : 'Paper'} ${
      isView ? '' : 'elevation={1} sx={{ p: 2 }} {...props}'
    }>
      <Typography variant="${isView ? 'h4' : 'h6'}" component="${
        isView ? 'h1' : 'h2'
      }" gutterBottom>
        ${isView ? componentName : '{title}'}
      </Typography>
      ${
        isView
          ? `
      {/* Add your view content here */}
      <Box sx={{ mt: 2 }}>
        {data?.map((item) => (
          <${componentName}Card key={item.id} data={item} />
        ))}
      </Box>`
          : `
      {/* Add your component content here */}
      {children}`
      }
    </${isView ? 'Box' : 'Paper'}>
  );
};

export default ${componentName};
`;
}

function createDomainTemplate(componentName) {
  return `/**
 * ${componentName} domain types and interfaces
 */

export interface ${componentName}Props {
  ${
    componentName === componentName
      ? `// Add prop types here
  title?: string;
  children?: React.ReactNode;`
      : `// Add view-specific props here`
  }
}

export interface ${componentName}Data {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  // Add other data types here
}

export interface ${componentName}Filters {
  search?: string;
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  // Add filter types here
}

export interface ${componentName}CreateRequest {
  name: string;
  description?: string;
  // Add creation fields here
}

export interface ${componentName}UpdateRequest {
  name?: string;
  description?: string;
  // Add update fields here
}

// Add other types and interfaces as needed
export type ${componentName}Status = 'active' | 'inactive' | 'pending';
export type ${componentName}SortField = 'name' | 'createdAt' | 'updatedAt';
`;
}

function createHookTemplate(componentName) {
  return `'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { ${componentName}Data, ${componentName}Filters, ${componentName}CreateRequest, ${componentName}UpdateRequest } from '../domain/${componentName.toLowerCase()}';
// Import your API functions here
// import { fetch${componentName}s, create${componentName}, update${componentName}, delete${componentName} } from '@/flexxApi/flexxApiService';

export const use${componentName} = () => {
  const [filters, setFilters] = useState<${componentName}Filters>({});
  const queryClient = useQueryClient();

  // Fetch data
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['${componentName.toLowerCase()}s', filters],
    queryFn: () => {
      // Replace with actual API call
      // return fetch${componentName}s(filters);
      return Promise.resolve([]);
    },
    enabled: true,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (newItem: ${componentName}CreateRequest) => {
      // Replace with actual API call
      // return create${componentName}(newItem);
      return Promise.resolve(newItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${componentName.toLowerCase()}s'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ${componentName}UpdateRequest }) => {
      // Replace with actual API call
      // return update${componentName}(id, data);
      return Promise.resolve(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${componentName.toLowerCase()}s'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      // Replace with actual API call
      // return delete${componentName}(id);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${componentName.toLowerCase()}s'] });
    },
  });

  // Actions
  const handleCreate = (data: ${componentName}CreateRequest) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (id: string, data: ${componentName}UpdateRequest) => {
    updateMutation.mutate({ id, data });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleFiltersChange = (newFilters: ${componentName}Filters) => {
    setFilters(newFilters);
  };

  return {
    // Data
    data: data || [],
    isLoading,
    error: error?.message || null,
    
    // Filters
    filters,
    setFilters: handleFiltersChange,
    
    // Actions
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
    refetch,
    
    // Loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
`;
}

function createExampleComponentTemplate(componentName) {
  return `'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

import { ${componentName}Data } from '../domain/${componentName.toLowerCase()}';

interface ${componentName}CardProps {
  data: ${componentName}Data;
  onClick?: (item: ${componentName}Data) => void;
}

export const ${componentName}Card: React.FC<${componentName}CardProps> = ({
  data,
  onClick
}) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { elevation: 3 } : {}
      }}
      onClick={() => onClick?.(data)}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
          <Typography variant="h6" component="h3">
            {data.name}
          </Typography>
          <Chip 
            label="Active" 
            color="success" 
            size="small" 
          />
        </Box>
        
        {data.description && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            {data.description}
          </Typography>
        )}
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(data.createdAt).toLocaleDateString()}
          </Typography>
          {data.updatedAt && (
            <Typography variant="caption" color="text.secondary">
              Updated: {new Date(data.updatedAt).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
`;
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  // eslint-disable-next-line no-console
  console.log('Usage: node create-component.js ComponentName [--view]');
  // eslint-disable-next-line no-console
  console.log('');
  // eslint-disable-next-line no-console
  console.log('Examples:');
  // eslint-disable-next-line no-console
  console.log('  node scripts/create-component.js MyComponent');
  // eslint-disable-next-line no-console
  console.log('  node scripts/create-component.js notifications --view');
  // eslint-disable-next-line no-console
  console.log('');
  // eslint-disable-next-line no-console
  console.log('Options:');
  // eslint-disable-next-line no-console
  console.log('  --view    Create a view component in src/views/flexx-apps/');
  // eslint-disable-next-line no-console
  console.log('');
  // eslint-disable-next-line no-console
  console.log('This will create:');
  // eslint-disable-next-line no-console
  console.log('  - Main component file');
  // eslint-disable-next-line no-console
  console.log('  - Domain types file');
  // eslint-disable-next-line no-console
  console.log('  - Custom hook (for views)');
  // eslint-disable-next-line no-console
  console.log('  - Example sub-component (for views)');
  process.exit(1);
}

const componentName = args[0];
const isView = args.includes('--view');

// Validate component name
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Component name must start with uppercase letter and contain only letters and numbers',
  );
  process.exit(1);
}

createComponentStructure(componentName, isView);
