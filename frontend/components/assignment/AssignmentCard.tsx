'use client';

import { Assignment } from '@/types/assignment';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Trash2, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface AssignmentCardProps {
  assignment: any; // Using any for now to bypass store types matching Mongo types
  onDelete: (id: string) => void;
}

export function AssignmentCard({ assignment, onDelete }: AssignmentCardProps) {

  return (
    <Card className="group relative flex flex-col justify-between min-h-[180px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-border/50 rounded-2xl">
      <CardHeader className="p-5 flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-[17px] leading-tight line-clamp-2 pr-6 text-slate-800">
          {assignment.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 pb-3 mt-auto">
        <div className="flex items-center justify-between text-[13px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Created:</span> {new Date(assignment.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={assignment.status === 'completed' ? 'text-green-500' : assignment.status === 'processing' ? 'text-orange-500' : 'text-slate-500'}>
              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex flex-col md:flex-row gap-2">
        <Button asChild className="w-full md:w-auto flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm" size="sm">
          <Link href={`/paper-preview/${assignment._id}`}>
            <Eye className="w-4 h-4 mr-2" />
            View Assignment
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            if(window.confirm('Are you sure you want to delete this assignment?')) {
              onDelete(assignment._id);
            }
          }} 
          className="w-full md:w-auto shrink-0 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 rounded-lg font-medium"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
