import React from 'react';
import DataTable from 'react-data-table-component';

interface IDataItem {
  id: number;
  name: string;
  age: number;
}

interface IProps {
  data: IDataItem[];

}

const MyDataTable: React.FC<IProps> = ({data}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any[] = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
    },
  ];

  return (
   
  );
};

export default MyDataTable;