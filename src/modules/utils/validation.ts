import { validationList } from "../../models/validation_data";

export const validateField = (input: HTMLInputElement): boolean => {
  const rule : RegExp = validationList[input.name];
    if ( !rule)
        return true;

    const isValid : boolean = rule.test( input.value);
    if ( !isValid) {
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = 'Ошибка валидации';
      
      const oldError = input.nextElementSibling as HTMLElement;
      if (oldError && oldError.classList.contains('error-message')) {
        oldError.remove();
      }
      
      input.insertAdjacentElement('afterend', errorElement);
    } else {
      const errorElement = input.nextElementSibling as HTMLElement;
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
      }
    }
    
    return isValid;
  };
  
  export const validateForm = ( form: HTMLFormElement): boolean => {
    let isValid : boolean = true;
    const fields = form.querySelectorAll<HTMLInputElement>('input');
    
    fields.forEach( input => {
      if ( !validateField( input))
        isValid = false;
    });
    
    return isValid;
  };
  
