import { Request, Response, NextFunction } from 'express';
export declare const assignmentController: {
    createAssignment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAssignments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAssignment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=assignmentController.d.ts.map