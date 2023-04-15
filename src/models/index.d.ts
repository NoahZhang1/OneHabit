import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerClasses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Classes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly className: string;
  readonly goal: number;
  readonly progress?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClasses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Classes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly className: string;
  readonly goal: number;
  readonly progress?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Classes = LazyLoading extends LazyLoadingDisabled ? EagerClasses : LazyClasses

export declare const Classes: (new (init: ModelInit<Classes>) => Classes) & {
  copyOf(source: Classes, mutator: (draft: MutableModel<Classes>) => MutableModel<Classes> | void): Classes;
}

type EagerProductivityScore = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductivityScore, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userName?: string | null;
  readonly score?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProductivityScore = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductivityScore, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userName?: string | null;
  readonly score?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProductivityScore = LazyLoading extends LazyLoadingDisabled ? EagerProductivityScore : LazyProductivityScore

export declare const ProductivityScore: (new (init: ModelInit<ProductivityScore>) => ProductivityScore) & {
  copyOf(source: ProductivityScore, mutator: (draft: MutableModel<ProductivityScore>) => MutableModel<ProductivityScore> | void): ProductivityScore;
}