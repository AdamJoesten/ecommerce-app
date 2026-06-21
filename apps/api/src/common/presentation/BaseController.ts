
export abstract class BaseController {
    constructor() {}

    protected handleError(error: unknown) {
        if (error instanceof Error) throw error;
    }
}