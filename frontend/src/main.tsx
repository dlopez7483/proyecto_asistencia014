import { createRoot } from 'react-dom/client'

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { RouterProvider } from 'react-router-dom'
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from '@common/store';
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';

dayjs.locale('es-mx');

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
