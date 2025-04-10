export const generateRandomNumber = () => {
    const randomNumber = Math.random();

    const randomString = randomNumber.toString().substring(2);

    return randomString;
}