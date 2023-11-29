import React from 'react'
import ReactDOM from 'react-dom/client'
import { Principal } from './components/Principal'
import { ArchivoProvider, GraficasProvider } from './context'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ArchivoProvider>
        <GraficasProvider>
            <Principal/>
        </GraficasProvider>
    </ArchivoProvider>
    
  
)
