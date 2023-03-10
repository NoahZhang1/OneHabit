import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





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