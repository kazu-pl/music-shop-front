# using TextField as select throwns an error about uncontrolled input:

If you use `TextField` component with `select` prop set to `true` and you receive an error like this:

```zsh
MUI: A component is changing the uncontrolled value state of Select to be controlled.
Elements should not switch from uncontrolled to controlled (or vice versa).

```

then you have to provide `value` prop to the MUI component. Since you probably use the Formik component that returns TextField component you have to pass `value` prop:

```tsx
const TextFieldFormik = () => {
    return (
    <TextField
      name={field.name}
      value={field.value || (rest.select ? valueWhenSelect : undefined)} // pass here `value` key when `select` is `true` to not get any warning about controlled/uncontrolled input
      onBlur={field.onBlur}
      onChange={handleChange}
      error={meta.touched && !!meta.error}
      helperText={(meta.touched && meta.error) || helperText}
      {...rest}
    />

}
```

# How to generate TypeScript types for queries and mutations:

`1` - install dependencies: `yarn add -D @graphql-codegen/cli @graphql-codegen/client-preset`

`2` - create script that will generate the types:

```json
{
  "scripts": {
    "codegen": "graphql-codegen", // if you want to pass config file make the script value: "graphql-codegen --config codegen.ts"
    "codegen:watch": "graphql-codegen -w"
  }
}
```

`3` - create file `codegen.ts` in root folder that will be run by scripts from section `2`:

```ts
// <root>/codegen.ts

import { CodegenConfig } from "@graphql-codegen/cli";

const dotenv = require("dotenv");
dotenv.config();

const config: CodegenConfig = {
  schema: `${process.env.REACT_APP_GRAPHQL_SERVER_URL}/graphql`,
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
```

after that you use `yarn codegen` script to generate code and client

`4` - write query/mutation with generated function:

you have to visit the graphql studio of your server and write query there, then copy and paste the query into the function that was generated with `yarn codegen` script:

```ts
import { gql } from "./__generated__/gql";

const LOGIN = gql(/* GraphQL */ `
  mutation Login($loginCredentials: LoginCredentialsInput!) {
    login(loginCredentials: $loginCredentials) {
      accessToken
      refreshToken
    }
  }
`);
```

and when you copy and paste the query/mutatiton, then you have to use `yarn codegen` script to generate types for the query/mutation so when you pass that `LOGIN` const into your `useQuery` or `useLazyQuery` hook it will be typed:

```ts
const SomeComponent = () => {
  //
  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      // default variables
      loginCredentials: {
        email,
        password,
      },
    },
    onCompleted(data) {
      const { __typename, ...tokens } = data.login;
      saveTokens(tokens);
    },
  });
};
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
