export const trimErrorMessage = (errorMessage: string) => {
    const regex = /KalEl:.*?(?=Version)/;
    const match = errorMessage.match(regex);
    return match ? match[0] : errorMessage;
};
