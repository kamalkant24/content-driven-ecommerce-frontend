export const logout = () => {
    localStorage.removeItem('access_token');
}

export const getFullProductUrl = (str: string) => `http://192.168.31.57:8080/image/${str}`;
