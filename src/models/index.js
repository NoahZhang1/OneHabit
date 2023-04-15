// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Classes, ProductivityScore } = initSchema(schema);

export {
  Classes,
  ProductivityScore
};