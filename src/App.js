import moment from "moment";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // variaveis da lista e do filtro de países
  const [covidPaises, setCovidPaises] = useState(null);
  const [pais, setPais] = useState("");

  // variaveis da lista e do filtro de estados
  const [covidEstados, setCovidEstados] = useState(null);
  const [estado, setEstado] = useState("");

  // variaveis do fórmulario
  const [estadoForm, setEstadoForm] = useState("");
  const [casosForm, setCasosForm] = useState("");
  const [confirmadosForm, setConfirmadosForm] = useState("");
  const [mortosForm, setMortosForm] = useState("");
  const [recuperadosForm, setRecuperadosForm] = useState("");
  const [dataForm, setDataForm] = useState("");

  //chamada das apis
  useEffect(() => {
    fetch("https://covid19-brazil-api.vercel.app/api/report/v1")
      .then((response) => response.json())
      .then((data) => {
        setCovidEstados(data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API: " + error);
      });
  }, []);

  useEffect(() => {
    fetch("https://covid19-brazil-api.vercel.app/api/report/v1/countries")
      .then((response) => response.json())
      .then((data) => {
        setCovidPaises(data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API: " + error);
      });
  }, []);

  const handlePais = (e) => {
    setPais(e.target.value);
  };

  // verificação para o filtro de paises
  const paisSelecionado = (covidPaises || []).find(
    (dados) => dados.country === pais
  );

  const handleEstado = (e) => {
    setEstado(e.target.value);
  };

  // verificação para o filtro de estados
  const estadoSelecionado = (covidEstados || []).find(
    (dados) => dados.state === estado
  );

  const handleEstadoForm = (e) => {
    setEstadoForm(e.target.value);
  };

  const handleCasosForm = (e) => {
    setCasosForm(e.target.value);
  };

  const handleConfirmadosForm = (e) => {
    setConfirmadosForm(e.target.value);
  };

  const handleMortosForm = (e) => {
    setMortosForm(e.target.value);
  };

  const handleRecuperadosForm = (e) => {
    setRecuperadosForm(e.target.value);
  };

  const handleDataForm = (e) => {
    setDataForm(e.target.value);
  };

  // pega os dados do formulário e apresenta no log
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      estadoForm,
      casosForm,
      confirmadosForm,
      mortosForm,
      recuperadosForm,
      dataForm,
    };
    console.log(data);
  };

  return (
    <main className="content">
      <div className="App">
        <div className="row">
          <div className="col-md-3 m-5">
            <label className="form-label m-2">
              <b>Filtre por Estado</b>
            </label>
            <select
              className="form-select ms-4"
              onChange={handleEstado}
              value={estado}
            >
              <option value={""}>Selecione</option>
              {covidEstados &&
                covidEstados.map((value) => {
                  return <option value={value.state}>{value.state}</option>;
                })}
            </select>
            {estadoSelecionado && (
              <p className="ms-4">
                <b>{estadoSelecionado.state} </b> - <b>Casos: </b>
                {estadoSelecionado.cases} - <b>Mortes: </b>
                {estadoSelecionado.deaths} - <b>Suspeitas: </b>
                {estadoSelecionado.suspects}
              </p>
            )}
          </div>
          <div className="col-md-4 m-5">
            <label className="form-label m-2">
              <b>Filtre por país</b>
            </label>
            <select
              className="form-select ms-4"
              onChange={handlePais}
              value={pais}
            >
              <option value={""}>Selecione</option>
              {covidPaises &&
                covidPaises.map((value) => {
                  return <option value={value.country}>{value.country}</option>;
                })}
            </select>
            {paisSelecionado && (
              <p className="ms-4">
                <b>{paisSelecionado.country} </b> - <b>Casos: </b>
                {paisSelecionado.confirmed} - <b>Mortes: </b>
                {paisSelecionado.deaths} - <b>Data: </b>
                {moment(paisSelecionado.dateTime).format("DD/MM/YYYY")}
              </p>
            )}
          </div>
        </div>
        <div className="card-body col-md-5">
          <h3 className="m-2">Estados Brasileiros</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Estado</th>
                <th scope="col">Casos</th>
                <th scope="col">Mortes</th>
                <th scope="col">Suspeitas</th>
                <th scope="col">Data</th>
              </tr>
            </thead>
            <tbody>
              {covidEstados &&
                covidEstados.map((value) => {
                  return (
                    <tr>
                      <td>
                        {value.uf} - {value.state}
                      </td>
                      <td>{value.cases}</td>
                      <td>{value.deaths}</td>
                      <td>{value.suspects}</td>
                      <td>{moment(value.datetime).format("DD/MM/YYYY")}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="card-body col-md-5">
          <h3 className="m-2">Países</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">País</th>
                <th scope="col">Confirmados</th>
                <th scope="col">Mortes</th>
                <th scope="col">Data</th>
              </tr>
            </thead>
            <tbody>
              {covidPaises &&
                covidPaises.map((value) => {
                  return (
                    <tr>
                      <td>{value.country ? value.country : "-"}</td>
                      <td>{value.confirmed ? value.confirmed : "-"}</td>
                      <td>{value.deaths ? value.deaths : "-"}</td>
                      <td>
                        {moment(value.datetime).format("DD/MM/YYYY")
                          ? moment(value.datetime).format("DD/MM/YYYY")
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <h3 className="m-3">Formulário</h3>
        <div className="row">
          <div className="col-md-2 m-3">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              value={estadoForm}
              onChange={handleEstadoForm}
            >
              <option value={""}>Selecione</option>
              {covidEstados &&
                covidEstados.map((value) => {
                  return <option value={value.state}>{value.state}</option>;
                })}
            </select>
          </div>
          <div className="col-md-2 m-3">
            <label className="form-label">Casos</label>
            <input
              type="text"
              className="form-control"
              onChange={handleCasosForm}
            />
          </div>
          <div className="col-md-2 m-3">
            <label className="form-label">Confirmados</label>
            <input
              type="text"
              className="form-control"
              onChange={handleConfirmadosForm}
            />
          </div>
          <div className="col-md-2 m-3">
            <label className="form-label">Mortos</label>
            <input
              type="text"
              className="form-control"
              onChange={handleMortosForm}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 m-3">
            <label className="form-label">Recuperados</label>
            <input
              type="text"
              className="form-control"
              onChange={handleRecuperadosForm}
            />
          </div>
          <div className="col-md-2 m-3">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              onChange={handleDataForm}
            />
          </div>
          <div className="col-md-3 m-5">
            <button type="submit" className="btn btn-success">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default App;
