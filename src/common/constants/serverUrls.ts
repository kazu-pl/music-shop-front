import { GRAPHQL_SERVER_URL } from "./env";

const SERVER_URLs = {
  MAIN: GRAPHQL_SERVER_URL,
  GRAPH_QL: `${GRAPHQL_SERVER_URL}/graphql`,
  /**
   *
   * @param fileId id of a file to be downloaded form server
   */
  FILES: (fileId: string) => `${GRAPHQL_SERVER_URL}/files/${fileId}`,
};

export default SERVER_URLs;
