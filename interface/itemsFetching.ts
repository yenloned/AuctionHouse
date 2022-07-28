export type fetchAllItemsType = {
    findAll_items: allItemsType
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
    photo_URL: string
}

export type userFromItemType = {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    iconURL: string
} 