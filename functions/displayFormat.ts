export const formatMoney = (money: number) => {
    return (Math.round(money * 100) / 100).toLocaleString();
}