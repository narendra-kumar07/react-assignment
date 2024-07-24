import React,{ useEffect, useState } from 'react';
import TableData from '../components/TableData';
import { calculatePonits, calculateTotalPoints } from '../utils/common/calculation';
import { getCustomerDetials } from '../services/customer';
import { toast } from '../utils/common/toast';

const Home = () => {

    const columns = ['Customer Name','Amount','Month','Points','Total Points','Action'];
    const type = "customerDetail";

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
            <h2>Rewards React Assignment</h2>
            <h4>Reward points for each Customer per month and total</h4>
            <TableData type={type} loader={loader} columns={columns} customerData={customerData} />
        </div>
    );
}

export default Home;
