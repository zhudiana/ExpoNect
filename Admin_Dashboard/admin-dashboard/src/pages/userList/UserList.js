import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { rows } from "../../dummyData";
import { Link } from "react-router-dom";

export default function UserList() {
  const [data, setData] = useState(rows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: " Name", width: 130 },
    { field: "nameOfCompany", headerName: "Company Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "country", headerName: "Country", width: 160 },
    { field: "city", headerName: "City", width: 160 },
    { field: "product", headerName: "Product", width: 160 },
    { field: "tinNumber", headerName: "Tin Number", width: 160 },
    { field: "tradingLicenceNo", headerName: "Trading Licence No", width: 160 },
    { field: "verified", headerName: "Verified", width: 160 },
    { field: "createdAt", headerName: "Created At", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/ " + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
