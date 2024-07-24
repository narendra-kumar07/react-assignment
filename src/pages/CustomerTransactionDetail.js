import React,{useState, useEffect} from 'react';
import { getCustomerDetials } from '../services/customer';
import { toast } from '../utils/common/toast';
import { useParams,Link } from 'react-router-dom';
import TableData from '../components/TableData';

const CustomerTransactionDetail = () => {
    const columns = ['Name','Amount','Month','Transaction Date'];
    const type = "transactionDetail"

    const [loader, setLoader] = useState(false);
    const [transactionDetail, setTransactionDetail] = useState([]);
    const params = useParams();

    useEffect(()=>{
        const getCustomerTransactions = async() => {
            try{
                setLoader(true);
                let customerId = parseInt(params.id);
                const customerData = await getCustomerDetials();
                if(customerData && customerData.status === true){
                    let data = customerData.data?.filter((row) => row.custID === customerId)
                    setTransactionDetail(data);
                    setLoader(false)
                }else{
                    toast({
                        message:'Some Error',
                        type: 'error'
                    })
                    setLoader(false)
                }
            }catch(e){
                toast({
                    message:'Some Error',
                    type: 'error'
                })
                setLoader(false);
            }
        }
        getCustomerTransactions();
    },[params.id])

    return (
        <div>
            <h2>Rewards React Assignment</h2>
            <h4>Customer Transaction Detail</h4>
            <button className='back-btn'><Link to="/">Back</Link></button>
            <TableData type={type} columns={columns} loader={loader} customerData={transactionDetail} />
        </div>
    );
}

export default CustomerTransactionDetail;
