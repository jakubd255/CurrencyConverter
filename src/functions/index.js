const getDate = (miliseconds) => {
    let date = new Date();
    date.setTime(miliseconds);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if(day <= 9) day = "0"+day;
    if(month <=9 ) month = "0"+month;

    return year+"-"+month+"-"+day;
}

export default getDate;