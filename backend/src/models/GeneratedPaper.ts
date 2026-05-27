import mongoose, { Schema, Document } from 'mongoose';

export interface IGeneratedPaper extends Document {
  assignmentId: mongoose.Types.ObjectId;
  sections: any[];
}

const GeneratedPaperSchema = new Schema(
  {
    assignmentId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Assignment', 
      required: true 
    },
    sections: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

export const GeneratedPaper = mongoose.model<IGeneratedPaper>('GeneratedPaper', GeneratedPaperSchema);
