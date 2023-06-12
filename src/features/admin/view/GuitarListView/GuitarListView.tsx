import { useLazyQuery } from "@apollo/client";
import { gql } from "__generated__";
import {
  GetGuitarFiltersQuery,
  GetGuitarsFilters,
  GetGuitarsWithDataLoaderQuery,
  GuitarFilterTypeEnum,
  SortByKeys,
  SortOrder,
} from "__generated__/graphql";
import HelmetDecorator from "components/HelmetDecorator/HelmetDecorator";
import ShopLayout from "layouts/ShopLayout/ShopLayout";
import { useCallback, useEffect, useState } from "react";
import Table from "components/Table";
import renderMaxLengthText from "utils/renderMaxLengthText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { PATHS_ADMIN } from "common/constants/paths";
import Button from "components/Button/Button";

const GET_GUITARS = gql(/* GraphQL */ `
  query GetGuitarsWithDataLoader(
    $limit: Int!
    $offset: Int!
    $sort: GetGuitarsSortInput!
    $filters: GetGuitarsFilters!
  ) {
    getGuitarsWithDataLoader(
      limit: $limit
      offset: $offset
      sort: $sort
      filters: $filters
    ) {
      data {
        _id
        name
        description
        fretsNumber
        imageId
        price
        scaleLength
        stringsNumber
        availability {
          _id
          name
          description
          type
        }
        bodyWood {
          _id
          description
          name
          type
        }
        bridge {
          _id
          description
          name
          type
        }
        fingerboardWood {
          _id
          description
          name
          type
        }
        guitarType {
          _id
          description
          name
          type
        }
        pickupsSet {
          _id
          description
          name
          type
        }
        producer {
          _id
          description
          name
          type
        }
        shape {
          _id
          description
          name
          type
        }
      }
      totalItems
    }
  }
`);

const GuitarListView = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<{
    sort: {
      sortBy: SortByKeys;
      sortOrder: SortOrder;
    };
    filters: GetGuitarsFilters;
    limit: number;
    offset: number;
  }>({
    limit: 5,
    offset: 0,
    sort: {
      sortBy: SortByKeys.Default,
      sortOrder: SortOrder.Asc,
    },
    filters: {},
  });

  const [fetch, { data, loading }] = useLazyQuery(GET_GUITARS, {
    errorPolicy: "all",
    variables: {
      limit: params.limit,
      offset: params.offset,
      sort: {
        sortBy: SortByKeys.Latest,
        sortOrder: SortOrder.Desc,
      },
      filters: {},
    },
    fetchPolicy: "network-only",
  });

  const fetchFilters = useCallback(() => {
    if (params) {
      fetch({
        variables: {
          ...params,
          limit: params.limit,
          offset: params.offset,
        },
      });
    }
  }, [fetch, params]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const handleOnChangePage = (page: number) => {
    setParams((prev) => ({ ...prev, offset: (page - 1) * prev.limit }));
  };

  const onChangeRowsPerPage = (rowsPerPage: number) => {
    setParams((prev) => ({ ...prev, limit: rowsPerPage }));
  };

  const handleChangeFilterType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParams((prev) => ({
      ...prev,
      type: event.target.value as unknown as GuitarFilterTypeEnum,
    }));
  };

  return (
    <ShopLayout
      title="Panel admina - lista gitar"
      extra={
        <Box ml="auto">
          <Button to={PATHS_ADMIN.FILTERS_LIST}>Przjedź do filtrów</Button>
        </Box>
      }
    >
      <HelmetDecorator title="lista gitar" />
      <Table
        isLoading={loading}
        // data={characters.data}
        // for some reason I need to pass ` || ([] as Character[])` in order to make react-snap work
        data={
          data?.getGuitarsWithDataLoader.data ||
          ([] as GetGuitarsWithDataLoaderQuery["getGuitarsWithDataLoader"]["data"])
        }
        tableName={"Filtry"}
        pagination={{
          currentPage: params.offset / params.limit + 1, // for pagination starting with 0 page
          pageSize: params.limit,
          totalItems: data?.getGuitarsWithDataLoader.totalItems || 0,
        }}
        sort={{
          sortBy: "default",
          sortDirection: "asc",
        }}
        onChangePage={handleOnChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        // onChangeSort={onChangeSort}
        //
        // filters={
        // <TextField
        //   id="outlined-select-currency"
        //   select
        //   label="Select"
        //   value={params.type}
        //   onChange={handleChangeFilterType}
        // >
        //   {filtersMap.map((option) => (
        //     <MenuItem
        //       key={option.value}
        //       value={option.value as unknown as string}
        //     >
        //       {option.label}
        //     </MenuItem>
        //   ))}
        // </TextField>
        // }
        isFiltersBarVisibleInitially={true}
        columns={[
          {
            title: "Producent",
            key: "type",
            render: (row) => row.producer.name,
            // isSortable: true,
          },
          {
            title: "Nazwa",
            key: "title",
            render: (row) => row.name,
          },
          {
            title: "Opis",
            key: "description",
            render: (row) => renderMaxLengthText(row.description || "", 100),
          },
          {
            title: "Dosepność",
            key: "type",
            render: (row) => row.availability.name,
            // isSortable: true,
          },
          {
            title: "Drewno korpusu",
            key: "type",
            render: (row) => row.bodyWood.name,
            // isSortable: true,
          },
          {
            title: "Mostek",
            key: "type",
            render: (row) => row.bridge.name,
            // isSortable: true,
          },
          {
            title: "Podstrunnica",
            key: "type",
            render: (row) => row.fingerboardWood.name,
            // isSortable: true,
          },
          {
            title: "Ilśćć progów",
            key: "type",
            render: (row) => row.fretsNumber,
            // isSortable: true,
          },

          {
            title: "Akcje",
            key: "actions",
            noWrap: true,
            render: (row) => (
              <Box display="flex">
                <IconButton
                  onClick={() => navigate(PATHS_ADMIN.SINGLE_GUITAR(row._id))}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    console.log("remove");
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ),
          },
        ]}
      />
      <Box mt={2} display={"flex"} justifyContent={"flex-end"}>
        <Button to={PATHS_ADMIN.ADD_GUITAR}>Dodaj nową</Button>
      </Box>
    </ShopLayout>
  );
};

export default GuitarListView;
