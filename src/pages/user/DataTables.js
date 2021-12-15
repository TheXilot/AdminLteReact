/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {React, useEffect, useState, useRef} from 'react';
import {debounce} from 'lodash';
import Loading from '@app/components/loading/loading';
import axios from '../../utils/axios';
import './DataTables.scss';
// const $ = require('jquery');
// $.DataTable = require('datatables.net');
const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const DataTables = ({columns, url, columnsName}) => {
    const [data, setData] = useState(undefined);
    const [perPage, setPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(columns[0]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [search, setSearch] = useState('');
    const [isloading, setIsLoading] = useState(true);
    const [nbElements, setNbElements] = useState(0);
    const [nbPage, setNbPage] = useState(0);
    // const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const Paginate = (value) => {
        setCurrentPage(value);
    };
    const renderPaginate = (nbPages) => {
        const pages = Array.from({length: nbPages}, (_, i) => i + 1);
        console.log('pages : ', pages);
        return pages.map((value) => {
            return (
                <li className="page-item" key={value}>
                    <a
                        className="page-link"
                        onClick={() => Paginate(value)}
                        // href="#"
                    >
                        {value}
                    </a>
                </li>
            );
        });
    };
    const render = (id, column, value) => {
        if (column === 'picture' && value) {
            return (
                <img
                    alt="#"
                    src={`${process.env.REACT_APP_GATEKEEPER_URL}/${value}`}
                    className="table-img"
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
    // const handleSearch = () => {
    //     debounce(() => {
    //         console.log('f');
    //     }, 500);
    // };
    const handleSearch = useRef(
        debounce((query) => {
            setSearch(query);
            setCurrentPage(1);
            setSortOrder(SORT_ASC);
            setSortColumn(columns[0]);
            setIsLoading(true);
            console.log('debounce');
        }, 500)
    ).current;
    useEffect(() => {
        console.log('useeffect');
        const fetchData = async () => {
            // setLoading(true)
            const params = {
                search,
                sort_field: sortColumn,
                sort_order: sortOrder,
                per_page: perPage,
                page: currentPage
            };
            // const { data } = await axios(fetchUrl, { params })
            const mydata = await axios.get(url, {params}).then((res) => {
                setIsLoading(false);
                return res;
            });
            console.log({mydata});
            setData(mydata.data.data);
            // eslint-disable-next-line radix
            setNbElements(parseInt(mydata.data.nbElements));
            // eslint-disable-next-line radix
            setNbPage(parseInt(mydata.data.nbPage));
            // setPagination(data.meta)
            // setTimeout(() => {
            // }, 300)
        };
        fetchData();
        setIsLoading(false);
        // }, [[perPage, sortColumn, sortOrder, search, currentPage]]);
    }, [perPage, sortColumn, sortOrder, currentPage, search]);
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
                            onChange={(e) => handleSearch(e.target.value)}
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
            <div className="table-responsive">
                <table id="example" className="display table table-striped">
                    <thead>
                        <tr>
                            {columns.map((column) => {
                                return (
                                    <th
                                        key={column}
                                        onClick={() => handleSort(column)}
                                    >
                                        {/* {column.toUpperCase().replace('_', ' ')} */}
                                        {columnsName
                                            ? columnsName[column]
                                            : column}

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
            </div>

            <ul className="pagination pagination-sm m-0 float-right">
                {nbElements && (
                    <>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                «
                            </a>
                        </li>
                        {renderPaginate(nbPage)}
                        <li className="page-item">
                            <a className="page-link" href="#">
                                »
                            </a>
                        </li>
                    </>
                )}
            </ul>
            {isloading && (
                <Loading isLoading={isloading} text="Chargement ..." />
            )}
        </>
    );
};

export default DataTables;
