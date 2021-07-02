import { useState, useEffect } from 'react';
import { format, differenceInYears } from 'date-fns';
import '../styles/desenvolvedores.css';
import api from '../api';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/svg/icon-search.svg';

const ListaDesenvolvedores = () => {
  const [desenvolvedores, setDesenvolvedores] = useState([]);
  const [desenvolvedoresPesquisar, setDesenvolvedoresPesquisar] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    listarDesenvolvedores();

  }, []);

  const listarDesenvolvedores = () => {
    api.get('/developers').then(response => {
      setDesenvolvedores(response.data);
      setDesenvolvedoresPesquisar(response.data);
    });
  }

  const excluir = async (idSelecionado) => {
    await api.delete(`/developers/${idSelecionado}`);
    listarDesenvolvedores();
  };

  const pesquisar = () => {
    if (!!search) {
      const filtrarDesenvolvedor = desenvolvedoresPesquisar.filter(item => {
        const nomeAdaptado = item.name.toLowerCase();
        return nomeAdaptado.includes(search)
      });
      setDesenvolvedores(filtrarDesenvolvedor)
    } else {
      listarDesenvolvedores();
    }
  }

  const onChangeSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      pesquisar();
    }
  }

  return (
    <div className="content">
      <div className="header">
        <h2>Desenvolvedores</h2>
        <div>
          <input type="text" name="search" placeholder="Pesquisar pelo nome" onChange={onChangeSearch} value={search} onKeyDown={handleKeyDown} />
          <img src={searchIcon} width='25px' className="button-search" onClick={pesquisar} />
        </div>
      </div>

      <div className="table">
        <div className="table-row-header">
          <div> Nome </div>
          <div> Idade </div>
          <div> Data de nascimento </div>
          <div> Ações </div>
        </div>
        {desenvolvedores.map(item => {
          const idade = differenceInYears(new Date(), new Date(item.datanascimento));

          return (
            <div className="table-row">
              <div>{item.name}</div>
              <div>{idade} anos</div>
              <div>{format(new Date(item.datanascimento), 'dd/MM/yyyy')}</div>
              <div>
                <Link to={`/developers/${item.id}`} className="button-edit"> Editar </Link>
                <button className="button-delete" onClick={() => excluir(item.id)}> Excluir </button>
                <Link to={`/developers/${item.id}/view`} className="button-view"> Visualizar </Link>
              </div>
            </div>
          )
        })
        }
      </div>
      <Link to="/developers/new" className="button-adicionar"> + </Link>
    </div>
  )
}

export default ListaDesenvolvedores;
