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
