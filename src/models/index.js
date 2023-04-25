// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Usernames, Classes, ProductivityScore } = initSchema(schema);

export {
  Usernames,
  Classes,
  ProductivityScore
};