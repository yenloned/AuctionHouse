import { allItemsType } from "../interface/itemsFetching";

export const getCurrentFormattedTime = () => {
    return new Date();
}

export const getCurrentRawTime = () => {
    return new Date().getTime();
}

//For sorting in ServerSideProps
export const convertRawTimeToFormat = (rawtime: number | string) => {
    try{
        if (typeof rawtime === "string"){
            rawtime = parseInt(rawtime)
        }
        }catch(e){
            return null
    }
    return new Date(rawtime).toString();
}

//For display in market items
export const convertRawTimeToFormatV2 = (rawtime: number | string) =>{
    try{
        if (typeof rawtime === "string"){
            rawtime = parseInt(rawtime)
        }
        }catch(e){
            return null
    }
    return new Date(rawtime).toISOString().slice(0, 16).replace("T", " ")
}

//parameter will be recieved as Raw Format
export const addSecondstoTime = (timestamp: number, second: number) => {
    return timestamp + second*1000;
}

export const secondsDifference = (timestamp1: number, timestamp2: number) => {
    return Math.floor(Math.abs(timestamp1 - timestamp2) / 1000);
}

//seconds in a year = 60*60*24*365 = 31536000
//seconds in a month = 60*60*24*30 = 2592000
//seconds in a week = 60*60*24*7 = 604800
//seconds in a day = 60*60*24 = 86400
//seconds in a hour = 60*60 = 3600

export const timeDifference = (seconds: number) => {
    //Year
    if(seconds >= 31536000){
        const monthsInSeconds = seconds % 31536000
        const daysInMonths = monthsInSeconds % 2592000

        const years = Math.floor(seconds / 31536000)
        const months = Math.floor(monthsInSeconds / 2592000)
        const days = Math.floor(daysInMonths / 86400)
    
        if(monthsInSeconds && daysInMonths){
            return `${years} yr ${months} mth ${days} d`
        }
        if(monthsInSeconds){
            return `${years} yr ${months} mth`
        }

        if(daysInMonths){
            return `${years} yr ${days} d`
        }

        return `${years} years`
    }
    //Month
    if (seconds >= 2592000){
        const daysInMonths = seconds % 2592000

        const months = Math.floor (seconds / 2592000)
        const days = Math.floor(daysInMonths / 86400)

        if(daysInMonths){
            return `${months} mth ${days} d`
        }
        return `${months} months`
    }
    //Days
    if (seconds >= 86400){
        const hoursInDays = seconds % 86400
        const minutesInDays = hoursInDays % 3600
        const days = Math.floor(seconds / 86400)
        const hours = Math.floor( hoursInDays / 3600)
        const minutes = Math.floor(minutesInDays / 60)

        if(hoursInDays && minutesInDays){
            return `${days} days ${hours} hrs ${minutes} mins`
        }
        if(hoursInDays){
            return `${days} days ${hours} hrs`
        }
        if(minutesInDays){
            return `${days} days ${minutes} mins`
        }

        return `${days} days`
    }
    //Hours
    if (seconds >= 3600){
        const minutesInHours = seconds % 3600
        const secondsInMinutes = minutesInHours % 60
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor(minutesInHours / 60)

        if(minutesInHours && secondsInMinutes){
            return `${hours} hrs ${minutes} mins ${secondsInMinutes} s`
        }
        if(minutesInHours){
            return `${hours} hrs ${minutes} mins`
        }
        if(secondsInMinutes){
            return `${hours} hrs ${secondsInMinutes} s`
        }
        return `${hours} hrs`
    }
    //Minutes
    if (seconds >= 60){
        const secondsInMinutes = seconds % 60
        const minutes = Math.floor( seconds / 60)
        if(secondsInMinutes){
            return `${minutes} mins ${secondsInMinutes} s`
        }
        return `${minutes} mins`
    }
    //Seconds
    return `${seconds} s`
}

export const initTimeDifference = (endtime: number) => {
    if(endtime >= 31536000){
        return "more than a year"
    }
    if(endtime >= 2592000){
        const months = Math.floor(endtime / 2592000)
        return `more than ${months===1 ? `a month` : `${months} months`}`
    }
    if(endtime >= 604800){
        const weeks = Math.floor(endtime / 604800)
        return `more than ${weeks===1 ? `a week` : `${weeks} weeks`}`
    }
    if(endtime >= 86400){
        const days = Math.floor(endtime / 86400)
        return `more than ${days===1 ? `a week` : `${days} weeks`}`
    }
    if(endtime >= 3600){
        const hours = Math.ceil(endtime / 3600)
        return `less than ${hours===1 ? `a hour` : `${hours} hours`}`
    }
    if(endtime >= 60*15){
        return `less than a hour`
    }
    if(endtime >= 60*10){
        return `less than 15 minutes`
    }
    if(endtime >= 60*5){
        return `less than 10 minutes`
    }
    if(endtime > 60){
        const minutes = Math.ceil(endtime / 60)
        return `less than ${minutes===1 ? `a minute` : `${minutes} minutes`}`
    }
    return `less than a minute`
}

export const checkIfTimeStillValid = (timestamp: number | string) => {
    if(typeof timestamp === "string"){
        timestamp = new Date(timestamp).getTime()
    }
    return timestamp > new Date().getTime();
}

export const convertItemsTimestamp = (itemsList: allItemsType[]) => {
    itemsList.map((eachItemList) => {
        eachItemList.start_time = new Date(eachItemList.start_time).getTime().toString();
        eachItemList.end_time = new Date(eachItemList.end_time).getTime().toString();
    })
    return itemsList
}
