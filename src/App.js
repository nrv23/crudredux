import React from 'react';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';
import store from './Store/store'; // devuelve todo el state global combinadoo
import {Provider} from 'react-redux'; //este provider va rodear todos los componentes y lo que viene del store
// se hace visible para cualquier componente. Al provider se le pasa como parametro el store
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header/>  
          <div className="container mt-5">
            <Switch>
              <Route exact path="/" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />
            </Switch>
          </div>
      </Provider>
    </Router>
  );
}

export default App;
