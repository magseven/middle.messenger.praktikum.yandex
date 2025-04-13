export const getCurrentPage = () : string => {
    const str : string[] = window.location.pathname.split('/').filter(part => part !== '');
    return !str.length ? "index" : str[str.length - 1];
};

export const printFormData = ( form_name: string) : void => {
    const form : HTMLFormElement = document.getElementById( form_name) as HTMLFormElement;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const formData = new FormData(form);
        const data: Record<string, unknown> = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log('Данные формы:', data);
    });
};
