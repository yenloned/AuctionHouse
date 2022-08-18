export type BidItemType = {
    item_id: string,
    userID: string,
    bid_price: number
}

export type CreateItemType = {
    name: string,
    description: string,
    owner_id: string,
    start_price: number,
    per_price: number,
    start_time: string,
    end_time: string,
    photo_URL: string
}

export type ChangeItemURLType = {
    id: string,
    newURL: string
}