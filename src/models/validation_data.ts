
export const validationList: {[key: string]: RegExp} = {
    first_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
    second_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
    login: /^(?![0-9_-]+$)[a-zA-Z0-9_-]{3,20}$/,
    email: /^$/,
    password: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9_-]{8,40}$/,
    phone: /^$/,
    message: /^$/
};

// латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, 
// нет спецсимволов (допустим только дефис).

// login — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, 
// без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).

// email — латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, 
// обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.

// password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.

// phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.

// message — не должно быть пустым.
/*// Типы для валидации
type ValidationRule = {
  pattern: RegExp;
  errorMessage: string;
};

type FormValidationRules = Record<string, ValidationRule>;

// Правила валидации для разных типов полей
const VALIDATION_RULES: FormValidationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Введите корректный email'
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    errorMessage: 'Пароль должен содержать минимум 8 символов, буквы и цифры'
  },
  phone: {
    pattern: /^\+?\d{10,15}$/,
    errorMessage: 'Введите корректный номер телефона'
  },
  text: {
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s]{2,}$/,
    errorMessage: 'Минимум 2 буквы'
  }
};

// Получаем тип валидации для поля
const getValidationType = (input: HTMLInputElement): string => {
  return input.type === 'email' ? 'email' : 
         input.type === 'tel' ? 'phone' : 
         input.type === 'password' ? 'password' : 'text';
};

// Валидация одного поля
const validateField = (input: HTMLInputElement): boolean => {
  const validationType = getValidationType(input);
  const rule = VALIDATION_RULES[validationType];
  const isValid = rule.pattern.test(input.value);
  
  if (!isValid) {
    input.classList.add('invalid');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = rule.errorMessage;
    
    // Удаляем старые сообщения об ошибках
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
