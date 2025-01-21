import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUserAsync } from "../../store/authSlice/loginSlice";
import DataTable from "react-data-table-component";
import { CircularProgress } from "@mui/material";
import UserInput from "../../components/UserInput";

export default function AllUsers() {
  const dispatch = useDispatch();

  const { allUser, isUserLoading } = useSelector(
    (state: object) => state.login
  );
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const columns: any = [
    {
      name: "Name",
      selector: (row: string) => row?.name,
    },
    {
      name: "Email",
      selector: (row: object) => row?.email,
    },
    {
      name: "Phone",
      selector: (row: object) => row?.phone,
    },
  ];

  useEffect(() => {
    dispatch(allUserAsync({ page: page, pageSize: limit, search: search }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(allUserAsync({ page: page, pageSize: limit, search: search }));
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch,search]);

  return (
    <div>
      <div className="container px-0 my-4 rounded shadow-lg">
        <DataTable
          title={
            <div className="flex justify-between ">
              <div>My Data Table</div>
              <div className="px-4">
                <UserInput
                  placeholder="Search User"
                  onChange={(e: any) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          }
          columns={columns}
          data={allUser.data}
          paginationPerPage={limit}
          pagination
          progressPending={isUserLoading == "pending" ? true : false}
          responsive
          paginationServer
          onChangeRowsPerPage={(perpage) => {
            setLimit(perpage);
          }}
          noDataComponent={<div className="py-1 my-1">No Data Found</div>}
          progressComponent={
            <div className="py-1 my-1">
              <CircularProgress color="primary" />
            </div>
          }
          selectableRowsHighlight={true}
          paginationRowsPerPageOptions={[3, 10, 20, 30, 50]}
          paginationTotalRows={allUser.total}
          highlightOnHover={true}
          fixedHeader
          onChangePage={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
}
