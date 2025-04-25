export const getCurrentPage = () : string => {
    const str : string[] = window.location.pathname.split('/').filter(part => part !== '');
    return !str.length ? "index" : str[str.length - 1];
};

// export const printFormData = () : void => {
//     const form: HTMLFormElement = document.querySelector('form') as HTMLFormElement|| null; 
//     if ( !form)
//         return;

//     form.addEventListener('submit', (event: SubmitEvent) => {
//         event.preventDefault();
  
//         const fd = new FormData(event.currentTarget as HTMLFormElement);
//         const data: Record<string, string> = {};

//         fd.forEach((value, key) => {
//             data[key] = value.toString();
//         });

//         console.log('Данные формы:', data);
//     });
// };

