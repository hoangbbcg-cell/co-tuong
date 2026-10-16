import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EntryGate } from './app/EntryGate'
import { Providers } from './app/providers'
import './app/styles/index.css'

createRoot(document.getElementById('root')!).render(<StrictMode><Providers><EntryGate /></Providers></StrictMode>)
