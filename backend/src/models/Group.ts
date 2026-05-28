import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  className: string;
  section: string;
  subject: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const GroupSchema = new Schema(
  {
    className: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, default: '' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Group = mongoose.model<IGroup>('Group', GroupSchema);
