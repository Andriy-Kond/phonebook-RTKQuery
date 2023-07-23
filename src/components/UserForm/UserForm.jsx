import css from './UserForm.module.css';
import { useState } from 'react';

// ^ Рефакторінг у RTK Query
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'store/contactsRTKQueryApi';

export const UserForm = () => {
  // Локальні стейти немає сенсу переносити у глобальний Redux:
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');

  // * При використанні RTK Query:
  // const data = useGetContactsQuery();
  // console.log('UserForm >> data:', data);
  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  // Записую дані полів інпут у відповідні стейти
  const getInput = ({ target: { name, value } }) => {
    if (name === 'name') {
      setUserName(value);
    } else {
      setUserNumber(value);
    }
  };

  // Спроба записати новий контакт
  const setNewContact = async e => {
    e.preventDefault();

    // Перевірка чи є вже такий контакт:
    const isExist = contacts.find(contact => contact.name === userName);

    if (isExist) {
      // alert працює як return
      alert(`${userName} is already in contacts`);
    } else {
      // спроба створити об'єкт:
      const isCreated = await addContact({
        name: userName,
        phone: userNumber,
      });
      // console.log('setContact >> isCreated.data:', isCreated.data);

      // Якщо новий об'єкт створений успішно, то обнуляємо поля інпутів у формі
      if (isCreated) {
        setUserName('');
        setUserNumber('');
      }
    }
  };

  // Повертаю розмітку:
  return (
    <form className={css.addUserForm} onSubmit={setNewContact}>
      <div className={css.userFormWrapper}>
        <div className={css.inputWrapper}>
          <label className={css.formLabel} htmlFor="UserId">
            Name
          </label>
          <input
            className={css.formInput}
            id="UserId"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={getInput}
            value={userName}
          />
        </div>

        <div className={css.inputWrapper}>
          <label className={css.formLabel} htmlFor="number">
            Phone Number
          </label>
          <input
            className={css.formInput}
            id="number"
            onChange={getInput}
            value={userNumber}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>

        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};
