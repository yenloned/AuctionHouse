export const getCurrentFormattedTime = () => {
    return new Date();
}

export const getCurrentRawTime = () => {
    return new Date().getTime();
}

//parameter will be recieved as Raw Format
export const addSecondstoTime = (timestamp: number, second: number) => {
    return timestamp + second*1000;
}

export const secondsDifference = (timestamp1: number, timestamp2: number) => {
    return Math.abs(timestamp1 - timestamp2) / 1000;
}

//seconds in a year = 60*60*24*365 = 31536000
//seconds in a month = 60*60*24*30 = 2592000
//seconds in a day = 60*60*24 = 86400
//seconds in a hour = 60*60 = 3600

export const timeDifference = (seconds: number) => {
    //Year
    if(seconds >= 31536000){
        const monthsInSeconds = seconds % 31536000
        const daysInMonths = monthsInSeconds % 2592000
    
        if(monthsInSeconds && daysInMonths){
            const years = Math.floor(seconds / 31536000)
            const months = Math.floor(monthsInSeconds / 2592000)
            const days = Math.floor(daysInMonths / 86400)
            return `${years} y ${months} m ${days} d`
        }
        if(monthsInSeconds){
            const years = Math.floor(seconds / 31536000)
            const months = Math.floor(monthsInSeconds / 2592000)
            return `${years} y ${months} m`
        }

        if(daysInMonths){
            const years = Math.floor(seconds / 31536000)
            const days = Math.floor(daysInMonths / 86400)
            return `${years} y ${days} d`
        }

        return `${seconds/31536000} y`
    }
    //Month
    if (seconds >= 2592000){
        const daysInMonths = seconds % 2592000

        if(daysInMonths){
            const months = Math.floor (seconds / 2592000)
            const days = Math.floor(daysInMonths / 86400)
            return `${months} m ${days} d`
        }
        return `${seconds/2592000} m`
    }
    //Days
    if (seconds >= 86400){
        const hoursInDays = seconds % 86400
        const minutesInDays = hoursInDays % 3600

        if(hoursInDays && minutesInDays){
            const days = Math.floor(seconds / 86400)
        }
    }
}


export const checkIfTimeOutdated = (timestamp: number) => {
    return new Date().getTime() > timestamp;
}
