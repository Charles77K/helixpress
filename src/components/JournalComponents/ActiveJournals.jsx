import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../../services/hooks';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import SkeletonTable from '../LoadingSkeletons/SkeletonTables';
import Error from '../../utils/Error';
import NotFound from '../NotFound';

export default function ActiveJournals() {
  const {
    data: journalData,
    isError,
    isPending,
    refetch,
  } = useFetch('/journals/');
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);

  // Define columns for the table
  const columns = [
    {
      accessorKey: 'index',
      header: '#',
      cell: (info) => info.row.index + 1,
      size: 50,
    },
    {
      accessorKey: 'name',
      header: 'Journal Name',
      cell: (info) => (
        <div className="flex items-center space-x-2 text-gray-600">
          {info.row.original.pic && (
            <img
              src={info.row.original.pic}
              alt={info.row.original.name}
              className="w-8 h-8 object-cover rounded-sm"
            />
          )}
          <Link
            to={`/journal/${info.row.original.name
              .replace(/\s+/g, '-')
              .toLowerCase()}/${info.row.original.id}`}
            className="hover:underline"
          >
            <span>{info.row.original.name}</span>
          </Link>
        </div>
      ),
      size: 400,
    },
    {
      accessorKey: 'issn',
      header: 'ISSN',
      size: 100,
    },
    {
      accessorKey: 'date_created',
      header: 'Launch Date',
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString('en-US', {
          year: 'numeric',
        }),
      size: 100,
    },
    {
      accessorKey: 'impact',
      header: 'IF',
      size: 50,
      meta: {
        className: 'hidden lg:table-cell',
      },
    },
    {
      accessorKey: 'cite_score',
      header: 'Cite Score',
      size: 50,
      meta: {
        className: 'hidden lg:table-cell',
      },
    },
    {
      accessorKey: 'currentIssue',
      header: 'Current Issue',
      size: 120,
      meta: {
        className: 'hidden lg:table-cell',
      },
    },
    {
      accessorKey: 'totalArticles',
      header: 'Total Articles',
      size: 120,
    },
  ];

  // Initialize the table
  const table = useReactTable({
    data: journalData || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex p-4 gap-2 overflow-hidden flex-col items-start justify-center text-slate-700 max-w-[60rem] bg-white">
      <section className="p-3 flex-col items-start flex gap-3">
        <h1 className="text-3xl font-bold">Helixpress Journal List</h1>
        <h2 className="text-xl font-bold">{journalData?.length} Journals</h2>
        <p className="text-xs">
          Helixpress currently publishes 418 peer-reviewed journals, and 9
          conference journals which are dedicated to publishing outputs from
          academic conferences.
        </p>
        {/* <h1 className="text-xl font-bold">Journal Proposal</h1>
        <p className="text-xs">
          As an open access pioneer and innovative publisher, Helixpress is
          always interested in exploring new opportunities for collaboration,
          including the launch of new journals and the transfer of existing
          journals. Researchers interested in submitting a proposal for a new
          journal for consideration, or interested in having their journal
          published by Helixpress, can submit their proposal here.
        </p> */}
      </section>
      <div className="overflow-x-auto p-3 w-full">
        <table className="min-w-full bg-white border-gray-200 rounded-md shadow-md">
          <thead className="border-gray-200 text-[8px] sm:text-xs md:text-[12px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-3 text-left text-gray-600 ${
                      header.column.columnDef.meta?.className || ''
                    }`}
                    style={{ width: header.column.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] || null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isPending ? (
              <SkeletonTable />
            ) : isError ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-red-600"
                >
                  <Error
                    title={'Error'}
                    text={'An error occurred while fetching data'}
                    onRetry={() => refetch}
                  />
                </td>
              </tr>
            ) : journalData && journalData.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 text-[8px] sm:text-[10px] md:text-xs"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 text-gray-600 ${
                        cell.column.columnDef.meta?.className || ''
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-gray-600"
                >
                  <NotFound
                    label="Journal"
                    actionText="Go back"
                    onAction={() => navigate(-1)}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls */}
        {journalData && journalData.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {'<<'}
              </button>
              <button
                className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'<'}
              </button>
              <button
                className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>'}
              </button>
              <button
                className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {'>>'}
              </button>
            </div>
            <span className="text-xs">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <select
              className="text-xs border rounded px-1 py-0.5"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
