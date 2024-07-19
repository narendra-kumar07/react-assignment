import React, { useEffect, useState } from 'react';
import { getCustomerDetials } from '../services/customer';
import { useParams, Link } from 'react-router-dom';
import { toast } from '../utils/common/toast';

const TransactionDetail = () => {
    const [transactionDetail, setTransactionDetail] = useState([]);
    const params = useParams();

    useEffect(()=>{
        const getCustomerTransactions = async() => {
            try{
                let customerId = parseInt(params.id);
                const customerData = await getCustomerDetials();
                if(customerData && customerData.status === true){
                    let data = customerData.data?.filter((row) => row.custID === customerId)
                    setTransactionDetail(data);
                }else{
                    toast({
                        message:'Some Error',
                        type: 'error'
                    })
                }
            }catch(e){
                toast({
                    message:'Some Error',
                    type: 'error'
                })
            }
        }
        getCustomerTransactions();
    },[params.id])

    return (
        <div>
            <h4>Customer Transaction Detail</h4>
            <button className='back-btn'><Link to="/">Back</Link></button>
            <table align='center' cellPadding={5} cellSpacing={2} border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Month</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactionDetail.length > 0 && transactionDetail.map((row, index)=>{
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
                </tbody>
            </table>
        </div>
    );
}

export default TransactionDetail;
