import React, { useEffect, useState } from 'react';
import { getCustomerDetials } from '../services/customer';
import { toast } from '../utils/common/toast';
import { Link } from 'react-router-dom';
import { calculatePonits, calculateTotalPoints } from '../utils/common/calculate';

const CustomerDetail = () => {
    const [loader, setLoader] = useState(false);
    const [customerData, setCustomerData] = useState([]);

    useEffect(()=>{
        const getCustomers = async () => {
            try{
                setLoader(true);
                const customerData = await getCustomerDetials();
                if(customerData && customerData.status === true){
                    const customerPoints = [];
                    customerData.data?.forEach((res)=> {
                        let points = calculatePonits(res.amount);
                        const month = (new Date(res.transactionDate).getMonth())+1;
                        let objIndex = customerPoints.findIndex(row => (row?.month === month && row.custID === res.custID));
                        if(objIndex === -1){
                            customerPoints.push({...res, points, month})
                        }else{
                            customerPoints[objIndex].points += points;
                            customerPoints[objIndex].amount += res.amount;
                        }
                    });
                    let totolPointsCustomer = calculateTotalPoints(customerPoints);
                    setCustomerData(totolPointsCustomer);
                    setLoader(false);
                }else{
                    setLoader(false);
                    toast({
                        message:'Some Error',
                        type: 'error'
                    })
                }
            }catch(e){
                setLoader(false);
                toast({
                    message:'Some Error',
                    type: 'error'
                })
            }
        }
        getCustomers();
    },[]);

    return (
        <div>
            <h4>Reward points for each Customer per month and total</h4>
            <table align='center' cellPadding={5} cellSpacing={2} border={1}>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Amount</th>
                        <th>Month</th>
                        <th>Points</th>
                        <th>Total Points</th>
                        <th>Action</th>
                    </tr>
                </thead>
            <tbody>
            {
                customerData.length > 0 && customerData?.map((row,index)=>{
                    return (
                        row?.data?.map((record,idx)=>{
                            return(
                                <tr key={idx}>
                                    { idx === 0 ? <td rowSpan={row?.data?.length}>{record.name}</td> : '' }
                                    <td>${record.amount}</td>
                                    <td>{new Date(record.transactionDate).toLocaleString('en-us',{month:'long'})}</td>
                                    <td><b>{record.points}</b></td>
                                    {
                                       idx === 0 ? <td rowSpan={row?.data?.length}><b>{row.total}</b></td> : ''
                                    }
                                    {
                                       idx === 0 ? <td rowSpan={row?.data?.length}><Link to={`/transactionDetail/${record.custID}`}>View All Transactions</Link></td> : ''
                                    }
                                </tr>
                            )
                        })
                    )
                })
            }
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

export default CustomerDetail;
