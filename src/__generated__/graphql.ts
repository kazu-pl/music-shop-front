/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  accessToken: Scalars['String'];
};

export type AddGuitarFilterInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: GuitarFilterTypeEnum;
};

export type AddGuitarInput = {
  availabilityId: Scalars['String'];
  bodyWoodId: Scalars['String'];
  bridgeId: Scalars['String'];
  description: Scalars['String'];
  fingerboardWoodId: Scalars['String'];
  fretsNumber: Scalars['Int'];
  guitarTypeId: Scalars['String'];
  name: Scalars['String'];
  pickupsSetId: Scalars['String'];
  price: Scalars['Int'];
  producerId: Scalars['String'];
  scaleLength: Scalars['Float'];
  shapeId: Scalars['String'];
  stringsNumber: Scalars['Int'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type GetGuitarsFilters = {
  /** Id of availability */
  availability?: InputMaybe<Scalars['ID']>;
  /** Id of bodyWood */
  bodyWood?: InputMaybe<Scalars['ID']>;
  /** Id of bridge */
  bridge?: InputMaybe<Scalars['ID']>;
  /** Id of fingerboardWood */
  fingerboardWood?: InputMaybe<Scalars['ID']>;
  /** Id of guitarType */
  guitarType?: InputMaybe<Scalars['ID']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  /** Id of pickupsSet */
  pickupsSet?: InputMaybe<Scalars['ID']>;
  price?: InputMaybe<PriceRange>;
  /** Id of producer */
  producer?: InputMaybe<Scalars['ID']>;
  /** Id of shape */
  shape?: InputMaybe<Scalars['ID']>;
  stringsNumber?: InputMaybe<Scalars['Int']>;
};

export type GetGuitarsSortInput = {
  sortBy: SortByKeys;
  sortOrder?: InputMaybe<SortOrder>;
};

export type Guitar = GuitarBase & {
  __typename?: 'Guitar';
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarBase = {
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarFilter = {
  __typename?: 'GuitarFilter';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: GuitarFilterTypeEnum;
};

export enum GuitarFilterTypeEnum {
  Availability = 'AVAILABILITY',
  BodyWood = 'BODY_WOOD',
  Bridge = 'BRIDGE',
  FingerboardWood = 'FINGERBOARD_WOOD',
  GuitarType = 'GUITAR_TYPE',
  PickupsSet = 'PICKUPS_SET',
  Producer = 'PRODUCER',
  Shape = 'SHAPE'
}

export type GuitarFiltersList = {
  __typename?: 'GuitarFiltersList';
  data: Array<GuitarFilter>;
  totalItems: Scalars['Int'];
};

export type GuitarPopulated = GuitarBase & {
  __typename?: 'GuitarPopulated';
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarWithDataLoader = GuitarBase & {
  __typename?: 'GuitarWithDataLoader';
  _id: Scalars['ID'];
  availability: GuitarFilter;
  bodyWood: GuitarFilter;
  bridge: GuitarFilter;
  description: Scalars['String'];
  fingerboardWood: GuitarFilter;
  fretsNumber: Scalars['Int'];
  guitarType: GuitarFilter;
  imageId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  pickupsSet: GuitarFilter;
  price: Scalars['Int'];
  producer: GuitarFilter;
  scaleLength: Scalars['Float'];
  shape: GuitarFilter;
  stringsNumber: Scalars['Int'];
};

export type GuitarsList = {
  __typename?: 'GuitarsList';
  data: Array<Guitar>;
  totalItems: Scalars['Int'];
};

export type GuitarsListPopulated = {
  __typename?: 'GuitarsListPopulated';
  data: Array<GuitarPopulated>;
  totalItems: Scalars['Int'];
};

export type GuitarsListWithdataLoder = {
  __typename?: 'GuitarsListWithdataLoder';
  data: Array<GuitarWithDataLoader>;
  totalItems: Scalars['Int'];
};

export type LoginCredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  addGuitar: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  addGuitarFilter: SuccessfulReqMsg;
  /** use this mutation to send email and password and get JWT tokens */
  login: Tokens;
  /**
   * Description for field
   * Supports **multi-line** description for your [API](http://example.com)!
   */
  register: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  removeGuitar: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  removeGuitarFilter: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   *
   * remove guitar image
   */
  removeGuitarImage: SuccessfulReqMsg;
  /** **PROTECTED** */
  removeUser: SuccessfulReqMsg;
  /** use this to get new accessToken if yours expired. Pass refreshToken to obtain accessToken */
  renewAccessToken: AccessTokenResponse;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  updateGuitar: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  updateGuitarFilter: SuccessfulReqMsg;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   *
   * Send guitar id and its new image and obtain id of the new image
   */
  updateGuitarImage: Scalars['ID'];
  /** **PROTECTED** */
  updateUserData: SuccessfulReqMsg;
  /** **PROTECTED** */
  updateUserPassword: SuccessfulReqMsg;
};


export type MutationAddGuitarArgs = {
  newGuitar: AddGuitarInput;
};


export type MutationAddGuitarFilterArgs = {
  newGuitarFilter: AddGuitarFilterInput;
};


export type MutationLoginArgs = {
  loginCredentials: LoginCredentialsInput;
};


export type MutationRegisterArgs = {
  registerCredentials: RegisterCredentialsInput;
};


export type MutationRemoveGuitarArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGuitarFilterArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGuitarImageArgs = {
  guitarId: Scalars['ID'];
};


export type MutationRenewAccessTokenArgs = {
  refreshCredentials: RefreshTokenInput;
};


export type MutationUpdateGuitarArgs = {
  guitar: UpdateGuitarInput;
};


export type MutationUpdateGuitarFilterArgs = {
  guitarFilter: UpdateGuitarFilterInput;
};


export type MutationUpdateGuitarImageArgs = {
  guitarId: Scalars['ID'];
  image: Scalars['Upload'];
};


export type MutationUpdateUserDataArgs = {
  data: User;
};


export type MutationUpdateUserPasswordArgs = {
  newPasswordInput: NewPasswordInput;
};

export type PriceRange = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getGuitar: Guitar;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  getGuitarFilter: GuitarFilter;
  /**
   * **PROTECTED**
   * -
   * **ONLY FOR ADMIN**
   */
  getGuitarFilters: GuitarFiltersList;
  getGuitars: GuitarsList;
  getGuitarsPopulated: GuitarsListPopulated;
  getGuitarsPopulatedOptionally: GuitarsListPopulated;
  getGuitarsWithDataLoader: GuitarsListWithdataLoder;
  /** **PROTECTED** */
  getUserData: UserType;
};


export type QueryGetGuitarArgs = {
  id: Scalars['ID'];
};


export type QueryGetGuitarFilterArgs = {
  id: Scalars['ID'];
};


export type QueryGetGuitarFiltersArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  type: GuitarFilterTypeEnum;
};


export type QueryGetGuitarsArgs = {
  filters: GetGuitarsFilters;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sort: GetGuitarsSortInput;
};


export type QueryGetGuitarsPopulatedArgs = {
  filters: GetGuitarsFilters;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sort: GetGuitarsSortInput;
};


export type QueryGetGuitarsPopulatedOptionallyArgs = {
  filters: GetGuitarsFilters;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sort: GetGuitarsSortInput;
};


export type QueryGetGuitarsWithDataLoaderArgs = {
  filters: GetGuitarsFilters;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sort: GetGuitarsSortInput;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type RegisterCredentialsInput = {
  data: User;
  password: Scalars['String'];
};

export enum SortByGeneral {
  Default = 'DEFAULT',
  Latest = 'LATEST'
}

export enum SortByKeys {
  Default = 'DEFAULT',
  Latest = 'LATEST',
  Name = 'NAME',
  Price = 'PRICE'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SuccessfulReqMsg = {
  __typename?: 'SuccessfulReqMsg';
  message: Scalars['String'];
};

export type Tokens = {
  __typename?: 'Tokens';
  /**
   * Description for field
   * Supports **multi-line** description for your [API](http://example.com)!
   */
  accessToken: Scalars['String'];
  /** Description for argument */
  refreshToken: Scalars['String'];
};

export type UpdateGuitarFilterInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: GuitarFilterTypeEnum;
};

export type UpdateGuitarInput = {
  availabilityId: Scalars['String'];
  bodyWoodId: Scalars['String'];
  bridgeId: Scalars['String'];
  description: Scalars['String'];
  fingerboardWoodId: Scalars['String'];
  fretsNumber: Scalars['Int'];
  guitarTypeId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  pickupsSetId: Scalars['String'];
  price: Scalars['Int'];
  producerId: Scalars['String'];
  scaleLength: Scalars['Float'];
  shapeId: Scalars['String'];
  stringsNumber: Scalars['Int'];
};

export type User = {
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['Int'];
  postalCode: Scalars['String'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  surname: Scalars['String'];
};

export type UserType = {
  __typename?: 'UserType';
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['Int'];
  postalCode: Scalars['String'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  surname: Scalars['String'];
};

export type NewPasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type AddGuitarFilterMutationVariables = Exact<{
  newGuitarFilter: AddGuitarFilterInput;
}>;


export type AddGuitarFilterMutation = { __typename?: 'Mutation', addGuitarFilter: { __typename?: 'SuccessfulReqMsg', message: string } };

export type GetGuitarFiltersQueryVariables = Exact<{
  type: GuitarFilterTypeEnum;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetGuitarFiltersQuery = { __typename?: 'Query', getGuitarFilters: { __typename?: 'GuitarFiltersList', totalItems: number, data: Array<{ __typename?: 'GuitarFilter', _id: string, name: string, description?: string | null, type: GuitarFilterTypeEnum }> } };

export type GetUserDataForWrapperQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataForWrapperQuery = { __typename?: 'Query', getUserData: { __typename?: 'UserType', name: string, surname: string, email: string, street: string, streetNumber: string, postalCode: string, city: string, phone: number } };

export type UpdateUserDataMutationVariables = Exact<{
  data: User;
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', updateUserData: { __typename?: 'SuccessfulReqMsg', message: string } };

export type UpdateUserPasswordMutationVariables = Exact<{
  newPasswordInput: NewPasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: { __typename?: 'SuccessfulReqMsg', message: string } };

export type RemoveUserMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'SuccessfulReqMsg', message: string } };

export type LoginMutationVariables = Exact<{
  loginCredentials: LoginCredentialsInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Tokens', accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  registerCredentials: RegisterCredentialsInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'SuccessfulReqMsg', message: string } };

export type GetGuitarsQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  sort: GetGuitarsSortInput;
  filters: GetGuitarsFilters;
}>;


export type GetGuitarsQuery = { __typename?: 'Query', getGuitars: { __typename?: 'GuitarsList', totalItems: number, data: Array<{ __typename?: 'Guitar', _id: string, availability: { __typename?: 'GuitarFilter', name: string, _id: string } }> } };

export type GetUserDataForShopLayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataForShopLayoutQuery = { __typename?: 'Query', getUserData: { __typename?: 'UserType', name: string, surname: string, email: string, street: string, streetNumber: string, postalCode: string, city: string, phone: number } };


export const AddGuitarFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddGuitarFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newGuitarFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddGuitarFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGuitarFilter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newGuitarFilter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newGuitarFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AddGuitarFilterMutation, AddGuitarFilterMutationVariables>;
export const GetGuitarFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGuitarFilters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GuitarFilterTypeEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGuitarFilters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}}]}}]} as unknown as DocumentNode<GetGuitarFiltersQuery, GetGuitarFiltersQueryVariables>;
export const GetUserDataForWrapperDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserDataForWrapper"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"streetNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<GetUserDataForWrapperQuery, GetUserDataForWrapperQueryVariables>;
export const UpdateUserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateUserDataMutation, UpdateUserDataMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"newPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginCredentials"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginCredentials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginCredentials"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerCredentials"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerCredentials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerCredentials"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetGuitarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGuitars"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetGuitarsSortInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetGuitarsFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGuitars"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"availability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}}]}}]} as unknown as DocumentNode<GetGuitarsQuery, GetGuitarsQueryVariables>;
export const GetUserDataForShopLayoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserDataForShopLayout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"streetNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<GetUserDataForShopLayoutQuery, GetUserDataForShopLayoutQueryVariables>;