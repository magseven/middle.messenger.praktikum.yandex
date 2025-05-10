
export const validationList: {[key: string]: RegExp} = {
    first_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
    second_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
    login: /^[a-zA-Z_-]{3,20}$/,
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    phone: /^\+?\d{10,15}$/,
    message: /^.+$/
};

