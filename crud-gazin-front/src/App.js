import { BrowserRouter, Route } from 'react-router-dom';
import ListaDesenvolvedores from './paginas/ListaDesenvolvedores';
import CadastroDesenvolvedor from './paginas/CadastroDesenvolvedor';
import VisualizarCadastroDesenvolvedor from './paginas/VisualizarCadastroDesenvolvedor';

function App() {
  return (
   <BrowserRouter>
    <Route path="/" exact component={ListaDesenvolvedores}/>
    <Route path="/developers/:id"  exact component={CadastroDesenvolvedor}/>
    <Route path="/developers/:id/view" exact component={VisualizarCadastroDesenvolvedor}/>
   </BrowserRouter>
  );
}

export default App;
