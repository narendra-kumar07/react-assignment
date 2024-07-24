import React from 'react';
import TableRow from './TableRow';

const TableData = ({type, loader, columns, customerData}) => {

    return (
        <div>
            <table align='center' cellPadding={5} cellSpacing={2} border={1}>
                <thead>
                    <tr>
                        {
                            columns && columns?.map((row, index) => <th key={index}>{row}</th> )
                        }
                    </tr>
                </thead>
            <tbody>
                <TableRow type={type} data={customerData} />
                {
                    (loader && customerData?.length === 0) && <tr><td colSpan={6}>Loading...</td></tr>
                }
                {
                    (!loader && customerData?.length === 0) && <tr><td colSpan={6}>No Record Found</td></tr>
                }
            </tbody>
            </table>
        </div>
    );
}

export default TableData;
