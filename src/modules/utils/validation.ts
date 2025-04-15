import { validationList } from "../../models/validation_data";

const validateField = (input: HTMLInputElement): boolean => {
    const rule : RegExp = validationList[input.name];
    if ( !rule)
        return true;

    const isValid : boolean = rule.test( input.value);
    
    if ( !isValid) {
      input.classList.add('invalid');
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = 'Ошибка валидации'/*rule.errorMessage*/;
      
      const oldError = input.nextElementSibling as HTMLElement;
      if (oldError && oldError.classList.contains('error-message')) {
        oldError.remove();
      }
      
      input.insertAdjacentElement('afterend', errorElement);
    } else {
      input.classList.remove('invalid');
      const errorElement = input.nextElementSibling as HTMLElement;
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
      }
    }
    
    return isValid;
  };
  
  const validateForm = ( form: HTMLFormElement): boolean => {
    let isValid : boolean = true;
    const fields = form.querySelectorAll<HTMLInputElement>('input');
    
    fields.forEach( input => {
      if ( !validateField( input))
        isValid = false;
    });
    
    return isValid;
  };
  
  export const initFormValidation = (): void => {
    const form : HTMLFormElement = document.querySelector('form') as HTMLFormElement;
    if ( !form)
      return;
    
    form.querySelectorAll<HTMLInputElement>( 'input').forEach( input => {
      input.addEventListener('blur', () => validateField(input));
    });
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      if ( validateForm(form)) {
        console.log('Форма не содержит ошибок.');
      } else {
        console.log('Форма содержит ошибки.');
      }
    });
  };
  