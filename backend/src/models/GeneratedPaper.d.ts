import mongoose, { Document } from 'mongoose';
export interface IGeneratedPaper extends Document {
    assignmentId: mongoose.Types.ObjectId;
    sections: any[];
}
export declare const GeneratedPaper: mongoose.Model<IGeneratedPaper, {}, {}, {}, mongoose.Document<unknown, {}, IGeneratedPaper, {}, mongoose.DefaultSchemaOptions> & IGeneratedPaper & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGeneratedPaper>;
//# sourceMappingURL=GeneratedPaper.d.ts.map