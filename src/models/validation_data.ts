
export const validationList: {[key: string]: RegExp} = {
    first_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
    second_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
    login: /^[a-zA-Z_-]{3,20}$/,
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    phone: /^\+?\d{10,15}$/,
    message: /^.+$/
};

/*
const validateField = (input: HTMLInputElement): boolean => {
  const rule : RegExp = validationList[input.name];
  console.log( 'validation rule for field', input.name, ":", rule);
  const isValid = rule.test( input.value);
  
  if ( !isValid) {
    input.classList.add('invalid');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = 'Ошибка валидации' rule.errorMessage;
    
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
*/
/*
// Валидация всей формы
const validateForm = (form: HTMLFormElement): boolean => {
  let isFormValid = true;
  const inputs = form.querySelectorAll<HTMLInputElement>('input[required]');
  
  inputs.forEach(input => {
    const isValid = validateField(input);
    if (!isValid) isFormValid = false;
  });
  
  return isFormValid;
};

// Инициализация валидации формы
export const initFormValidation = (formId: string): void => {
  const form = document.getElementById(formId) as HTMLFormElement;
  
  if (!form) {
    console.error(`Форма с id "${formId}" не найдена`);
    return;
  }
  
  // Валидация по blur
  form.querySelectorAll<HTMLInputElement>('input[required]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });
  
  // Валидация при отправке
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const isFormValid = validateForm(form);
    
    if (isFormValid) {
      const formData = new FormData(form);
      const data: Record<string, unknown> = {};
      
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      console.log('Форма валидна. Данные:', data);
      // Здесь можно отправить данные на сервер
    } else {
      console.log('Форма содержит ошибки');
    }
  });
}; */
/*.invalid {
  border-color: #ff4444 !important;
}

.error-message {
  color: #ff4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
} */
//  initFormValidation('myForm');
