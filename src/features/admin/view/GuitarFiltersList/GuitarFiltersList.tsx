import { useLazyQuery } from "@apollo/client";
import { gql } from "__generated__";
import {
  GetGuitarFiltersQuery,
  GuitarFilterTypeEnum,
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
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import filtersMap from "./data/filtersMap";

const GET_GUITAR_FILTERS = gql(/* GraphQL */ `
  query GetGuitarFilters(
    $type: GuitarFilterTypeEnum!
    $limit: Int!
    $offset: Int!
  ) {
    getGuitarFilters(type: $type, limit: $limit, offset: $offset) {
      data {
        _id
        name
        description
        type
      }
      totalItems
    }
  }
`);

const GuitarFiltersList = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<{
    type: GuitarFilterTypeEnum;
    limit: number;
    offset: number;
  }>({
    limit: 5,
    offset: 0,
    type: GuitarFilterTypeEnum.Producer,
  });

  const [fetch, { data, loading }] = useLazyQuery(GET_GUITAR_FILTERS, {
    errorPolicy: "all",
    variables: {
      limit: params.limit,
      offset: params.offset,
      type: params.type,
    },
  });

  const fetchFilters = useCallback(() => {
    if (params) {
      fetch({
        variables: {
          limit: params.limit,
          offset: params.offset,
          type: params.type,
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
    <ShopLayout title="Panel admina - lista filtrów">
      <HelmetDecorator title="lista filtrów" />
      <Table
        isLoading={loading}
        // data={characters.data}
        // for some reason I need to pass ` || ([] as Character[])` in order to make react-snap work
        data={
          data?.getGuitarFilters.data ||
          ([] as GetGuitarFiltersQuery["getGuitarFilters"]["data"])
        }
        tableName={"Filtry"}
        pagination={{
          currentPage: params.offset / params.limit + 1, // for pagination starting with 0 page
          pageSize: params.limit,
          totalItems: data?.getGuitarFilters.totalItems || 0,
        }}
        sort={{
          sortBy: "default",
          sortDirection: "asc",
        }}
        onChangePage={handleOnChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        // onChangeSort={onChangeSort}
        //
        filters={
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={params.type}
            onChange={handleChangeFilterType}
          >
            {filtersMap.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value as unknown as string}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        }
        isFiltersBarVisibleInitially={true}
        columns={[
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
            title: "Typ",
            key: "type",
            render: (row) => row.type,
            // isSortable: true,
          },

          {
            title: "Akcje",
            key: "actions",
            noWrap: true,
            render: (row) => (
              <Box display="flex">
                <IconButton
                  onClick={() => navigate(PATHS_ADMIN.SINGLE_FILTER(row._id))}
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
    </ShopLayout>
  );
};

export default GuitarFiltersList;
