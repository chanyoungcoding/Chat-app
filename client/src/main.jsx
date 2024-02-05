import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App/>
      </RecoilRoot>
    </QueryClientProvider>
  </BrowserRouter>
)
