import React from 'react';
import './global.css'
import Routes from './routes'

/* Conceitos de estado (state) 
 * 
 * Nunca atualizar a variavel diretamente
 * Usar uma segunda funcção para isso
 * useState() pega o estado atual
 * setState() atualiza o state
 * 
 * [valor, função de atualização] = useState()
*/

function App() {
  return (
    <Routes />
  );
};

export default App;
