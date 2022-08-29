import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import App from './App'
import './index.css'
import {CookiesProvider} from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CookiesProvider>
            <RecoilRoot>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </RecoilRoot>
        </CookiesProvider>
    </React.StrictMode>
)
