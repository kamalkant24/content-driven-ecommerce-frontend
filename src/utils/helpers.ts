export const logout = () => {
    localStorage.removeItem('access_token');
}

export const getFullProductUrl = (str: string) => `http://localhost:8080/image/${str}`;

export const discountedProductPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
}