import React, { useCallback, useState, memo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useSubCategoryActions, useSubCategoryState } from '../context/subCategoriesContext';
import { SubCategory } from '../models/SubCategory';
import DeleteDialog from './DeleteDialog';
import CreateSubCategoryModal from './CreateSubCategoryModal';
import UpdateSubCategoryModal from './UpdateSubCategoryModal';
import CircularProgressPage from './CircularProgressPage';
import {
  Alert,
  Snackbar,
} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv, Options } from 'export-to-csv-fix-source-map';


const columns: MRT_ColumnDef<SubCategory>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
  ];

const csvOptions: Options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  filename: 'SubCategory Table',
  title: 'SubCategories Table',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),// <-- Won't work with useKeysAsHeaders present!
};
const csvExporter = new ExportToCsv(csvOptions);

const SubCategoryTable = memo(() => {
  const subCategoryActions = useSubCategoryActions();
  const { subCategories, loadingData, isDeleting, createError, updateError, deleteError, openSnack } = useSubCategoryState();

  const [createOpen, setCreateOpen] = useState(false);
  const [subCategoryToUpdate, setSubCategoryToUpdate] = useState<SubCategory | null>(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState<string>("");

  const handleClose = useCallback(() => {
    subCategoryActions.clearErrorsAndCloseSnack();
  }, [subCategoryActions]);

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };
  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSubCategoryToUpdate(null);
  };
  const handleUpdateOpen = useCallback(
    (row: MRT_Row<SubCategory>) => {
      // const id = row.getValue('id');
      // const subCategory = subCategories.find((el) => el.id === id);
      const subCategory = row.original;
      if(subCategory ) {
        setSubCategoryToUpdate(subCategory);
        setUpdateOpen(true);
      } else alert("something went wrong")
    },
    [],
  );

  const handleDeleteOpen = useCallback(
    (row: MRT_Row<SubCategory>) => {
      setIdToDelete(row.getValue('id'));
      setDeleteOpen(true);
    },
    [],
  );
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleExportRows = (rows: MRT_Row<SubCategory>[]) => {
    // the order of the columns are based on the order of objects entries in the array
    csvExporter.generateCsv(rows.map((row) => {
      const { id, name } = row.original;
      return { id, name };
    }));
  };
  const handleExportData = useCallback(() => {
    // the order of the columns are based on the order of objects entries in the array
    csvExporter.generateCsv(subCategories.map((subCategory) => {
      const { id, name } = subCategory;
      return { id, name };
    }));
  }, [subCategories]);

  return (
    <>
      {loadingData ? (
        <CircularProgressPage />
      ) : (
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          muiTableProps={{
            sx: {
              tableLayout: 'fixed',
            },
          }}
          columns={columns}
          data={subCategories}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          // onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}
          // initialState={{ columnVisibility: { imageUrl: false } }} 
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => handleUpdateOpen(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteOpen(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
            >
              <Button
                onClick={() => {
                  handleCreateOpen();
                }}
                variant="contained"
              >
                Create New Sub Category
              </Button>
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Data
              </Button>
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                //export all rows, including from the next page, (still respects filtering and sorting)
                onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Rows
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                onClick={() => handleExportRows(table.getRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Page Rows
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Selected Rows
              </Button>
            </Box>
          )}
        />
      )}
      {createOpen && (
        <CreateSubCategoryModal
          open={createOpen}
          onClose={handleCreateClose}
        />
      )}
      {subCategoryToUpdate && (
        <UpdateSubCategoryModal
          open={updateOpen}
          onClose={handleUpdateClose}
          subCategory={subCategoryToUpdate}
        />
      )}
      {deleteOpen && (
        <DeleteDialog
          id={idToDelete}
          open={deleteOpen}
          isDeleting={isDeleting}
          onCancel={() => handleDeleteClose()}
        />
      )}
      {openSnack ? (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={openSnack}
          autoHideDuration={7000}
          onClose={handleClose}
        >
          {(!updateError && !updateError && !deleteError) ? (
            <Alert onClose={handleClose} severity="success">
              Succesful
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              {createError || updateError || deleteError}
            </Alert>
          )}
        </Snackbar>
      ) : (<></>)}
    </>
  );
});

export default SubCategoryTable;
