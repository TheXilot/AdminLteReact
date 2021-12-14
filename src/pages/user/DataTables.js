/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {React, useEffect, useState} from 'react';
import axios from '../../utils/axios';
// const $ = require('jquery');
// $.DataTable = require('datatables.net');
const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const DataTables = ({columns, url}) => {
    const [data, setData] = useState(undefined);
    const [perPage, setPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(columns[0]);
    const [sortOrder, setSortOrder] = useState('asc');
    // const [search, setSearch] = useState('');
    // const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const render = (id, column, value) => {
        if (column === 'picture' && value) {
            return (
                <img
                    alt="#"
                    src={`${process.env.REACT_APP_GATEKEEPER_URL}/${value}`}
                />
            );
        }
        return value;
    };
    const handleSort = (column) => {
        if (column === sortColumn) {
            // eslint-disable-next-line no-unused-expressions
            sortOrder === SORT_ASC
                ? setSortOrder(SORT_DESC)
                : setSortOrder(SORT_ASC);
        } else {
            setSortColumn(column);
            setSortOrder(SORT_ASC);
        }
    };
    const handlePerPage = (p) => {
        setCurrentPage(1);
        setPerPage(p);
    };
    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true)
            const params = {
                // search,
                sort_field: sortColumn,
                sort_order: sortOrder,
                per_page: perPage,
                page: currentPage
            };
            // const { data } = await axios(fetchUrl, { params })
            const mydata = await axios.get(url, params);
            console.log({mydata});
            setData(mydata.data);
            // setPagination(data.meta)
            // setTimeout(() => {
            //     setLoading(false)
            // }, 300)
        };
        fetchData();
        // }, [[perPage, sortColumn, sortOrder, search, currentPage]]);
    }, [[perPage, sortColumn, sortOrder, currentPage]]);
    return (
        <>
            {/* Search per page starts */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="input-group">
                        <input
                            className="form-control"
                            placeholder="Search..."
                            type="search"
                            onChange=""
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="input-group">
                        <label className="mt-2 me-2" htmlFor="select">
                            Per page
                        </label>
                        <select
                            className="form-select"
                            value={perPage}
                            onChange={(e) => handlePerPage(e.target.value)}
                            id="select"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Search per page ends  */}
            <table id="example" className="display table table-striped">
                <thead>
                    <tr>
                        {columns.map((column) => {
                            return (
                                <th
                                    key={column}
                                    onClick={() => handleSort(column)}
                                >
                                    {column.toUpperCase().replace('_', ' ')}
                                    {column === sortColumn ? (
                                        <span>
                                            {sortOrder === SORT_ASC ? (
                                                <i
                                                    className="ms-1 fa fa-arrow-up"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <i
                                                    className="ms-1 fa fa-arrow-down"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </span>
                                    ) : null}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                {data && (
                    <tbody>
                        {data.map((row) => {
                            return (
                                <tr key={row._id}>
                                    {columns.map((column) => {
                                        return (
                                            <td key={column}>
                                                {render(
                                                    row._id,
                                                    column,
                                                    row[column]
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                                // <tr key={row}>
                                //     {row.map((value) => {
                                //         return <td key={value}>{value}</td>;
                                //     })}
                                // </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
        </>
    );
};

export default DataTables;
