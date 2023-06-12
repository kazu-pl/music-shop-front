/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddGuitarFilter($newGuitarFilter: AddGuitarFilterInput!) {\n    addGuitarFilter(newGuitarFilter: $newGuitarFilter) {\n      message\n    }\n  }\n": types.AddGuitarFilterDocument,
    "\n  query GetGuitarFilter($getGuitarFilterId: ID!) {\n    getGuitarFilter(id: $getGuitarFilterId) {\n      _id\n      name\n      description\n      type\n    }\n  }\n": types.GetGuitarFilterDocument,
    "\n  mutation UpdateGuitarFilter($guitarFilter: UpdateGuitarFilterInput!) {\n    updateGuitarFilter(guitarFilter: $guitarFilter) {\n      message\n    }\n  }\n": types.UpdateGuitarFilterDocument,
    "\n  mutation RemoveGuitarFilter($removeGuitarFilterId: ID!) {\n    removeGuitarFilter(id: $removeGuitarFilterId) {\n      message\n    }\n  }\n": types.RemoveGuitarFilterDocument,
    "\n  query GetGuitarFilters(\n    $type: GuitarFilterTypeEnum!\n    $limit: Int!\n    $offset: Int!\n  ) {\n    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {\n      data {\n        _id\n        name\n        description\n        type\n      }\n      totalItems\n    }\n  }\n": types.GetGuitarFiltersDocument,
    "\n  query GetUserDataForWrapper {\n    getUserData {\n      name\n      surname\n      email\n      street\n      streetNumber\n      postalCode\n      city\n      phone\n    }\n  }\n": types.GetUserDataForWrapperDocument,
    "\n  mutation UpdateUserData($data: User!) {\n    updateUserData(data: $data) {\n      message\n    }\n  }\n": types.UpdateUserDataDocument,
    "\n  mutation UpdateUserPassword($newPasswordInput: newPasswordInput!) {\n    updateUserPassword(newPasswordInput: $newPasswordInput) {\n      message\n    }\n  }\n": types.UpdateUserPasswordDocument,
    "\n  mutation RemoveUser {\n    removeUser {\n      message\n    }\n  }\n": types.RemoveUserDocument,
    "\n  mutation Login($loginCredentials: LoginCredentialsInput!) {\n    login(loginCredentials: $loginCredentials) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($registerCredentials: RegisterCredentialsInput!) {\n    register(registerCredentials: $registerCredentials) {\n      message\n    }\n  }\n": types.RegisterDocument,
    "\n  query GetGuitars(\n    $offset: Int!\n    $limit: Int!\n    $sort: GetGuitarsSortInput!\n    $filters: GetGuitarsFilters!\n  ) {\n    getGuitars(offset: $offset, limit: $limit, sort: $sort, filters: $filters) {\n      data {\n        _id\n        availability {\n          name\n          _id\n        }\n      }\n      totalItems\n    }\n  }\n": types.GetGuitarsDocument,
    "\n  query GetUserDataForShopLayout {\n    getUserData {\n      name\n      surname\n      email\n      street\n      streetNumber\n      postalCode\n      city\n      phone\n    }\n  }\n": types.GetUserDataForShopLayoutDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddGuitarFilter($newGuitarFilter: AddGuitarFilterInput!) {\n    addGuitarFilter(newGuitarFilter: $newGuitarFilter) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation AddGuitarFilter($newGuitarFilter: AddGuitarFilterInput!) {\n    addGuitarFilter(newGuitarFilter: $newGuitarFilter) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGuitarFilter($getGuitarFilterId: ID!) {\n    getGuitarFilter(id: $getGuitarFilterId) {\n      _id\n      name\n      description\n      type\n    }\n  }\n"): (typeof documents)["\n  query GetGuitarFilter($getGuitarFilterId: ID!) {\n    getGuitarFilter(id: $getGuitarFilterId) {\n      _id\n      name\n      description\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateGuitarFilter($guitarFilter: UpdateGuitarFilterInput!) {\n    updateGuitarFilter(guitarFilter: $guitarFilter) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateGuitarFilter($guitarFilter: UpdateGuitarFilterInput!) {\n    updateGuitarFilter(guitarFilter: $guitarFilter) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveGuitarFilter($removeGuitarFilterId: ID!) {\n    removeGuitarFilter(id: $removeGuitarFilterId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveGuitarFilter($removeGuitarFilterId: ID!) {\n    removeGuitarFilter(id: $removeGuitarFilterId) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGuitarFilters(\n    $type: GuitarFilterTypeEnum!\n    $limit: Int!\n    $offset: Int!\n  ) {\n    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {\n      data {\n        _id\n        name\n        description\n        type\n      }\n      totalItems\n    }\n  }\n"): (typeof documents)["\n  query GetGuitarFilters(\n    $type: GuitarFilterTypeEnum!\n    $limit: Int!\n    $offset: Int!\n  ) {\n    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {\n      data {\n        _id\n        name\n        description\n        type\n      }\n      totalItems\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserDataForWrapper {\n    getUserData {\n      name\n      surname\n      email\n      street\n      streetNumber\n      postalCode\n      city\n      phone\n    }\n  }\n"): (typeof documents)["\n  query GetUserDataForWrapper {\n    getUserData {\n      name\n      surname\n      email\n      street\n      streetNumber\n      postalCode\n      city\n      phone\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserData($data: User!) {\n    updateUserData(data: $data) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserData($data: User!) {\n    updateUserData(data: $data) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserPassword($newPasswordInput: newPasswordInput!) {\n    updateUserPassword(newPasswordInput: $newPasswordInput) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserPassword($newPasswordInput: newPasswordInput!) {\n    updateUserPassword(newPasswordInput: $newPasswordInput) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveUser {\n    removeUser {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveUser {\n    removeUser {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($loginCredentials: LoginCredentialsInput!) {\n    login(loginCredentials: $loginCredentials) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginCredentials: LoginCredentialsInput!) {\n    login(loginCredentials: $loginCredentials) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($registerCredentials: RegisterCredentialsInput!) {\n    register(registerCredentials: $registerCredentials) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation Register($registerCredentials: RegisterCredentialsInput!) {\n    register(registerCredentials: $registerCredentials) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGuitars(\n    $offset: Int!\n    $limit: Int!\n    $sort: GetGuitarsSortInput!\n    $filters: GetGuitarsFilters!\n  ) {\n    getGuitars(offset: $offset, limit: $limit, sort: $sort, filters: $filters) {\n      data {\n        _id\n        availability {\n          name\n          _id\n        }\n      }\n      totalItems\n    }\n  }\n"): (typeof documents)["\n  query GetGuitars(\n    $offset: Int!\n    $limit: Int!\n    $sort: GetGuitarsSortInput!\n    $filters: GetGuitarsFilters!\n  ) {\n    getGuitars(offset: $offset, limit: $limit, sort: $sort, filters: $filters) {\n      data {\n        _id\n        availability {\n          name\n          _id\n        }\n      }\n      totalItems\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserDataForShopLayout {\n    getUserData {\n      name\n      surname\n      email\n      street\n      streetNumber\n      postalCode\n      city\n      phone\n    }\n  }\n"): (typeof documents)["\n  query GetUserDataForShopLayout {\n    getUserData {\n      name\n      surname\n      email\n      street\n      streetNumber\n      postalCode\n      city\n      phone\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;