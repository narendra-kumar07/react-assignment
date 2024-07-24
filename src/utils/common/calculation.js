export const calculatePonits = (transactionAmount) => {
    let points = 0;
    if (transactionAmount > 100) {    
      points = 2*(transactionAmount-100)+50;
    } else if (transactionAmount > 50 && transactionAmount<=100) {
      points = transactionAmount - 50;      
    }
    else{
      points = 0;
    }
    return points;
}

export const calculateTotalPoints = (customerPoints) => {
    let totalPointsData = [];
    customerPoints.forEach((row)=>{
        let objIndex = totalPointsData.findIndex(row2 => (row2?.cusID === row.custID));
        if(objIndex === -1){
            totalPointsData.push({total: row.points, cusID: row.custID, data: [{...row}] })
        }else{
            totalPointsData[objIndex].total += row.points;
            totalPointsData[objIndex].data = [...totalPointsData[objIndex].data,{...row}];
        }
    })
    return totalPointsData;
}