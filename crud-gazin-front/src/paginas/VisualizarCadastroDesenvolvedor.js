import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { format, differenceInYears } from 'date-fns';

import '../styles/visualizarCadastroDesenvolvedores.css';

const initialState = {
  name: '',
  datanascimento: '',
  sexo: '',
  hobby: '',
  idade: ''
};

const CadastroDesenvolvedor = (props) => {
  const [desenvolvedor, setDesenvolvedor] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
      setLoading(true);
      api
        .get(`/developers/${id}`)
        .then((response) => {
          setDesenvolvedor({
            ...response.data,
            datanascimento: format(new Date(response.data.datanascimento), "dd/MM/yyyy"),
            idade: differenceInYears(new Date(), new Date(response.data.datanascimento))
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
      setLoading(false);
  }, [id]);

  const voltar = () => {
    props.history.goBack();
  } 

  return (
    <div>
      <h2 className="header"> Visualizar cadastro desenvolvedor</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="field">
            <label> Nome: </label>
            <label className="labelInfo"> {desenvolvedor.name} </label>
          </div>
          <div className="fieldLine">
            <div className="field">
              <label> Sexo: </label>
              <label style={{width: '150px'}} className="labelInfo"> 
                {desenvolvedor.sexo === "F" ? "Feminino" : "Masculino"} 
              </label>
            </div>
            <div className="field">
              <label> Idade: </label>
              <label style={{width: '150px'}} className="labelInfo"> {desenvolvedor.idade} anos</label>
            </div>
            <div className="field">
              <label> Data de nascimento: </label>
              <label style={{width: '150px'}} className="labelInfo"> {desenvolvedor.datanascimento} </label>
            </div>
          </div>
          <div className="field">
            <label> Hobby: </label>
            <label className="labelInfo"> {desenvolvedor.hobby} </label>
          </div>
        </>
      )}
      <button className="button-save" onClick={voltar}> Voltar </button>
    </div>
  );
};

export default CadastroDesenvolvedor;
