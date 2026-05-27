import mongoose, { Document } from 'mongoose';
export interface IQuestionType {
    type: string;
    count: number;
    marks: number;
}
export interface IAssignment extends Document {
    title: string;
    dueDate: Date;
    questionTypes: IQuestionType[];
    instructions: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    filePath?: string;
    fileName?: string;
    createdAt: Date;
}
export declare const Assignment: mongoose.Model<IAssignment, {}, {}, {}, mongoose.Document<unknown, {}, IAssignment, {}, mongoose.DefaultSchemaOptions> & IAssignment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAssignment>;
//# sourceMappingURL=Assignment.d.ts.map