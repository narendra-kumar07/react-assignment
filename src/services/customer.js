import axios from 'axios';

const baseUrl = ' http://localhost:5000'

export const getCustomerDetials = async() => {
    try{
        let records = await axios.get(`${baseUrl}/transactionDetail`);
        return{
          status: true,
          message: 'SUCCESS',
          data: records?.data
        }
    }catch(e){
        return{
            status: false,
            message: 'ERROR OCCURED',
            data: []
        }
    }
}