import { Dispatch, SetStateAction } from "react"

export type LoginStatusType = {
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export type navBarIcon = {
    iconURL: string,
    setIconURL: Dispatch<SetStateAction<string>>
}

export type navBarBalance = {
    balance: number,
    setBalance: Dispatch<SetStateAction<number>>
}