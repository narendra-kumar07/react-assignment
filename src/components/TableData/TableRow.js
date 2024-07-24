import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({type, data}) => {
    return (
            <>
            {
                (type === 'customerDetail' && data?.length > 0) && data?.map((row,index)=>{
                    return (
                        row?.data?.map((record,idx)=>{
                            let dataCount = row?.data?.length;
                            return(
                                <tr key={idx}>
                                    { idx === 0 && <td rowSpan={dataCount}>{record.name}</td> }
                                    <td>${record.amount}</td>
                                    <td>{new Date(record.transactionDate).toLocaleString('en-us',{month:'long'})}</td>
                                    <td><b>{record.points}</b></td>
                                    { idx === 0 && <td rowSpan={dataCount}><b>{row.total}</b></td> }
                                    {
                                    idx === 0 && <td rowSpan={dataCount}><Link to={`/transactionDetail/${record.custID}`}>View All Transactions</Link></td>
                                    }
                                </tr>
                            )
                        })
                    )
                })
            }
            {
                (type === 'transactionDetail' && data.length > 0) && data.map((row, index)=>{
                    return(
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>${row.amount}</td>
                            <td>{new Date(row.transactionDate).toLocaleString('en-us',{month:'long'})}</td>
                            <td>{row.transactionDate}</td>
                        </tr>
                    )
                })
            }
            </>
    );
}

export default TableRow;
