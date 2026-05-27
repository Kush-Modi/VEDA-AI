import { IAssignment } from '../models/Assignment';
export declare const assignmentService: {
    createAssignment: (data: Partial<IAssignment>) => Promise<{
        success: boolean;
        jobId: string | undefined;
        assignment: import("mongoose").Document<unknown, {}, IAssignment, {}, import("mongoose").DefaultSchemaOptions> & IAssignment & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    getAssignments: () => Promise<(import("mongoose").Document<unknown, {}, IAssignment, {}, import("mongoose").DefaultSchemaOptions> & IAssignment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    deleteAssignment: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IAssignment, {}, import("mongoose").DefaultSchemaOptions> & IAssignment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=assignmentService.d.ts.map