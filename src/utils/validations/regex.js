
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;
    return re.test(String(email).toLowerCase());
}


export const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*$/;
    return re.test(String(username));
}