export type fetchAllItemsType = {
    defaultSortedItems: allItemsType[]
}

export type fetchOneItemType = {
    finalData: allItemsType
}

export type allItemsType = {
    _id: string,
    name: string,
    description: string,
    owner_data: userFromItemType,
    start_price: number,
    per_price: number,
    current_price: number | null,
    bidder_data: userFromItemType,
    start_time: string,
    end_time: string,
    bidder_time: string | null,
    time_left: string | null,
    photo_URL: string
}

export type fetchAllActivitiesType = {
    findUser_Activity: allActivitiesType[]
}

export type allActivitiesType = {
    _id: string,
    user_data: marketUserFormType,
    item_data: marketItemFormType,
    bid_price: number | null,
    timestamp: string,
    sortedTimestamp: number | null,
    action: string
}

export type marketUserFormType = {
    firstname: string,
    lastname: string,
    iconURL: string
}

export type marketItemFormType = {
    _id: string,
    name: string,
    photo_URL: string
}

export type userFromItemType = {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    iconURL: string
} 