import React, { useContext, useEffect } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { movieContext } from "../../context/movieContext/movieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import Loading from "../../components/loading/Loading";

export default function ProductList() {
  const { movies, dispatch, isFetching } = useContext(movieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 120,
    },
    {
      field: "year",
      headerName: "year",
      width: 120,
    },
    {
      field: "limit",
      headerName: "limit",
      width: 120,
    },
    {
      field: "isSeries",
      headerName: "isSeries",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/product/ ${params.row._id}`}
              state={{ movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newProduct">
        <button className="productAddButton">Add Movie</button>
      </Link>
      {isFetching && <Loading />}
      <DataGrid
        disableSelectionOnClick
        rows={movies}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
