export const getCurrentPage = () : string => {
    const str : string[] = window.location.pathname.split('/').filter(part => part !== '');
    return !str.length ? "index" : str[str.length - 1];
};
