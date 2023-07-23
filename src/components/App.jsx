import { UserForm } from './UserForm/UserForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { PreLoader } from './Preloader/PreLoader';

// ^ Рефакторінг у RTK Query
import { useGetContactsQuery } from 'store/contactsRTKQueryApi';

export const App = () => {
  // * При використанні RTK Query:
  // const data = useGetContactsQuery();
  // console.log('UserForm >> data:', data);
  const { isLoading, isError: error } = useGetContactsQuery();

  // Повертаю розмітку:
  return (
    <div className={css.mainContainer}>
      <h1>Phonebook</h1>
      <UserForm />
      <h2>Contacts</h2>
      <Filter />
      <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
        {isLoading && !error && <PreLoader />}
      </div>

      <Contacts />
      {error && <h2>Error: {error}</h2>}
    </div>
  );
};
