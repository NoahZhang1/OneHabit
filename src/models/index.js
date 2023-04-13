// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ProductivityScore } = initSchema(schema);

export {
  ProductivityScore
};