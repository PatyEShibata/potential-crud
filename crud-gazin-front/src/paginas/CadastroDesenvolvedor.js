import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api';
import Input from '../componentes/Input';

import '../styles/cadastro.css';

const initialState = {
  name: '',
  datanascimento: '',
  sexo: 'M',
  hobby: '',
};
const initialErrors = {
  name: '',
  datanascimento: '',
  hobby: '',
};

const CadastroDesenvolvedor = (props) => {
  const [desenvolvedor, setDesenvolvedor] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(initialErrors);
  const { id } = useParams();
  const isNew = id === 'new';

  const onChange = (event) => {
    const { name, value } = event.target;
    setDesenvolvedor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      api
        .get(`/developers/${id}`)
        .then((response) => {
          const datanascimentoAdaptado = format(new Date(response.data.datanascimento), "dd/MM/yyyy");

          setDesenvolvedor({
            ...response.data,
            datanascimento: datanascimentoAdaptado
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const validation = () => {
    const dataNascimentoTamanho = !!desenvolvedor.datanascimento && desenvolvedor.datanascimento.length > 10;

    return {
      name: !desenvolvedor.name && 'Preencha campo nome',
      datanascimento: (!desenvolvedor.datanascimento || dataNascimentoTamanho) && 'Data inválida',
      hobby: !desenvolvedor.hobby && 'Preencha campo hobby'
    }
  }

  const save = () => {
    const erros = validation()
    setErrors(erros)
    const possuiErro = Object.values(erros).some(value => !!value)
 
    if (possuiErro) {
      return
    }

    setLoading(true);

    const [dia, mes, ano] = desenvolvedor.datanascimento.split('/')
    const body = {
      ...desenvolvedor,
      datanascimento: `${ano}-${mes}-${dia}`
    }
    isNew ? saveNew(body) : update(body)
  };

  const saveNew = (body) => {
    api.post(`/developers`, body)
      .then((response) => {
        setDesenvolvedor(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
      props.history.goBack()
  } 

  const update = (body) => {
    api.put(`/developers/${body.id}`, body)
      .then((response) => {
        setDesenvolvedor(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
    props.history.goBack();
  };
  
  const cancel = () => {
    props.history.goBack();
  }

  return (
    <div>
      <h2 className="header"> {isNew ? 'Novo desenvolvedor' : 'Editar desenvolvedor'} </h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Input
            label="Nome:"
            type="text"
            name="name"
            value={desenvolvedor.name}
            onChange={onChange}
            error={errors.name}
          />
          <div className="field" onChange={onChange}>
            <label> Sexo: </label>
            <div>
              <input type="radio" id="masculino" name="sexo" value="M" checked={desenvolvedor.sexo === "M"}/>
              <label for="html">Masculino</label>
            </div>
            <div>
              <input type="radio" id="feminino" name="sexo" value="F" checked={desenvolvedor.sexo === "F"}/>
              <label for="html">Feminino</label>
            </div>
          </div>
          <Input
            label="Data de nascimento:"
            type="text"
            name="datanascimento"
            value={desenvolvedor.datanascimento}
            onChange={onChange}
            placeholder="dd/mm/aaaa"
            style={{maxWidth: '140px'}}
            error={errors.datanascimento}
          />
          <Input
            label="Hobby:"
            name="hobby"
            value={desenvolvedor.hobby}
            onChange={onChange}
            error={errors.hobby}
          />
        </>
      )}
      <button className="button-save" onClick={save}> Salvar </button>
      <button className="button-cancel" onClick={cancel}> Cancelar </button>
    </div>
  );
};

export default CadastroDesenvolvedor;
