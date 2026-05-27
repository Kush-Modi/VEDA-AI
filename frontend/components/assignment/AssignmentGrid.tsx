'use client';

import { Assignment } from '@/types/assignment';
import { AssignmentCard } from './AssignmentCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface AssignmentGridProps {
  assignments: any[];
  onDelete: (id: string) => void;
}

export function AssignmentGrid({ assignments, onDelete }: AssignmentGridProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-1">Manage and view all your class assignments</p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative w-full md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search assignments..." 
              className="pl-9 bg-card border-border/50 focus-visible:ring-primary shadow-sm rounded-full"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-card border-border/50 hover:bg-secondary/80 text-foreground rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment._id} assignment={assignment} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
