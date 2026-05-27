'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAssignmentStore } from '@/store/assignmentStore';
import { QuestionTypeRow } from './QuestionTypeRow';
import { AdditionalInfo } from './AdditionalInfo';
import { UploadBox } from './UploadBox';
import { Button } from '../ui/button';
import { Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import { assignmentService } from '@/services/assignmentService';
import { GeneratingOverlay } from './GeneratingOverlay';
import { useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
  instructions: z.string().optional(),
  dueDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AssignmentForm() {
  const router = useRouter();
  const { 
    questionTypes, 
    updateQuestionTypes, 
    uploadedFile,
    setGeneratedPaper 
  } = useAssignmentStore();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const addQuestionType = () => {
    updateQuestionTypes([
      ...questionTypes,
      {
        id: Date.now().toString(),
        text: 'Multiple Choice Questions',
        difficulty: 'Moderate',
        marks: 1,
        count: 5
      }
    ]);
  };

  const updateQuestionType = (id: string, field: keyof typeof questionTypes[0], value: string | number) => {
    updateQuestionTypes(
      questionTypes.map(qt => qt.id === id ? { ...qt, [field]: value } : qt)
    );
  };

  const removeQuestionType = (id: string) => {
    if (questionTypes.length > 1) {
      updateQuestionTypes(questionTypes.filter(qt => qt.id !== id));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Start generating UI
      setIsGenerating(true);

      const formData = new FormData();
      formData.append('title', 'New AI Assignment');
      formData.append('instructions', data.instructions || '');
      formData.append('dueDate', data.dueDate || new Date().toISOString());
      formData.append('questionTypes', JSON.stringify(questionTypes.map((q: any) => ({
        type: q.text || q.type || 'Unknown Type',
        count: q.count || 5,
        marks: q.marks || 1
      }))));

      if (uploadedFile) {
        formData.append('file', uploadedFile);
        console.log("File uploaded");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/assignment`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success && result.assignment) {
        setCurrentJobId(result.assignment._id);
        toast.success('Assignment submitted to AI queue');
      } else {
        setIsGenerating(false);
        toast.error('Failed to start generation: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      toast.error('Error connecting to backend API');
    }
  };

  const handleGenerationComplete = () => {
    setIsGenerating(false);
    // Real app would fetch the generated paper from DB here
    // For now we just route to preview
    if (currentJobId) {
      router.push(`/paper-preview/${currentJobId}`);
    } else {
      router.push('/paper-preview');
    }
  };

  const totalQuestions = questionTypes.reduce((acc, curr) => acc + curr.count, 0);
  const totalMarks = questionTypes.reduce((acc, curr) => acc + (curr.marks * curr.count), 0);

  return (
    <>
    {isGenerating && currentJobId && (
      <GeneratingOverlay 
        assignmentId={currentJobId} 
        onComplete={handleGenerationComplete} 
      />
    )}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 w-full">
      {/* Progress Bar Mockup */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-primary w-1/2 h-full rounded-full transition-all duration-500"></div>
      </div>

      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Create Assignment</h1>
        <p className="text-slate-500">Upload source material and configure question types.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Source Material</h3>
        <UploadBox />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Due Date</h3>
        <input 
          type="date" 
          className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...register('dueDate')}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-800">Question Configuration</h3>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={addQuestionType}
            className="text-slate-900 font-semibold hover:bg-slate-100 px-3 rounded-full"
          >
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center mr-2">
              <Plus className="w-4 h-4" />
            </div>
            Add Question Type
          </Button>
        </div>
        
        <div className="space-y-3">
          {questionTypes.map((qt, index) => (
            <QuestionTypeRow 
              key={qt.id}
              questionType={qt}
              onUpdate={updateQuestionType}
              onRemove={removeQuestionType}
            />
          ))}
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between border border-slate-100 gap-4">
        <div>
          <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Summary</p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-slate-900">{totalQuestions}</span>
              <span className="text-xs font-medium text-slate-500 uppercase">Total Sections</span>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-slate-900">{totalMarks}</span>
              <span className="text-xs font-medium text-slate-500 uppercase">Total Marks</span>
            </div>
          </div>
        </div>
      </div>

      <AdditionalInfo register={register} errors={errors} />

      <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
        <Button 
          type="button" 
          variant="outline" 
          size="lg" 
          onClick={() => router.back()}
          className="rounded-full px-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-105"
        >
          Generate Paper <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
    </>
  );
}
