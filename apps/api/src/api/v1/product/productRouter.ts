import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';


export const productRegistry = new OpenAPIRegistry();
const productRouter: Router = Router();

productRegistry.registerPath({

})

export { productRouter }