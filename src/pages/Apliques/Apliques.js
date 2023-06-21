import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListeApliques } from "../../components/ListApliques/ListeApliques";
import { Api } from "../../Api/Api";
import "./Apliques.css";

export const Apliques = () => {

  const type = localStorage.getItem("user");
  const navigate = useNavigate();

  const backPage = () => {
    navigate("/home");
  };

  // Filtro===============================================
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [result, setResult] = useState("");

  const loadFilter = async () => {
    const response = await Api.buildApiGetRequest(Api.readAllApliquesUrl());
    const results = await response.json();
    setSearchFilter(results)
  }

  useEffect(() => {
    loadFilter();
  }, []);

  useEffect(() => {
    const results = searchFilter.filter((resp) =>
      resp.number.toLowerCase().includes(result)
    );
    setData(results);
    // eslint-disable-next-line
  }, [result]); 

  const [display, setDisplay] = useState('listAplic')

  function compare(a, b) {
    if (a.number < b.number) return -1;
    if (a.number > b.number) return 1;
    return 0;
  }

  data.sort(compare)

  const onChange = (evt) => {
    setResult(evt.target.value);
    if(evt.target.value === '') {
      setDisplay('listAplic')
    } else {
      setDisplay('display')
    }
  };

//===========================================================

  return (
    <div className="contentAplique">
      <div className="divH1">
        <h1>Estoque de apliques</h1>
      </div>
     
      <div className="divBtnBack">
        
        <button onClick={backPage} className="btnBack">
          Voltar
        </button>
      </div>

      <div>
        {type === "adm" ? (
          <button
          type="button" className="btn btn-outline-primary"
            onClick={() => {
              navigate("/create");
            }}
          >
            Adicionar novo aplique
          </button>
        ) : (
          ""
        )}
      </div>
      
      <div className={type === "adm" ? "inputCheck" : "display"} >
        <button  type="button" className="btn btn-outline-primary" onClick={()=>{navigate("/filtrados")}}> Mostrar apliques com 4 ou menos para cortar</button>
      </div>
      <div className={type === "adm" ? "inputCheck" : "display"}>
        <button onClick={()=>{navigate("/comprar-apliques")}} type="button" className="btn btn-outline-primary"> Apliques para comprar</button>
      </div>

      {/* <Filter />; */}
      <div className="">
          <div className="position-relative d-flex justify-content-center">
            <div className="input-group mb-3 w-25" >
              <span className="input-group-text bg-black text-white" id="inputGroup-sizing-default">Procurar</span>
              <input 
                type="text" 
                className="form-control --bs-primary-bg-subtle" 
                aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-default"
                onChange={onChange}
                value={result}
                />
            </div>
          </div>

          <div className={display === '' ? 'display': 'listAplic'}>
              {data.map((aplique, index) => (
                <div className="col alingListCards" key={index}>
                <div className="card">
                  <img src={aplique.img} className="card-img-top" alt="..."/>
                  <div className={aplique.estoque === "Nao" ? "card-body text-danger" : "card-body text-success"}>
                    <h5 className="card-title">{aplique.number} </h5>
                    <p className="card-text">
                      Estoque = {aplique.quantidade}
                      {type === "adm" ? (
                      <button
                        type="button" 
                        className="btn btn-outline-warning"
                        onClick={() => {
                          navigate(`/aplique/${aplique._id}`);
                        }}>
                          Editar
                      </button>
                    ): ""}
                      </p>
                  </div>
                </div>
              </div>  
              ))}  
          </div>

      </div>

      {/* <div className={filtrados}>
        <div>{data.map((aplique, i) => (
          <div key={i} className={aplique.quantidade < 5 && aplique.estoque !== 'Nao' ? '': 'display'}>
            <div  className={aplique.estoque === "Nao" ? "cartRed" : "cart"}>
              <h3 className="numberCart">{aplique.number}</h3>
              <img src={aplique.img} alt="img" className="imgCart"/>
              <p className="quantCart">
                Em estoque:{" "}
                <span className={aplique.estoque === "Nao"  ? "red" : "green"}>
                  {" "}
                  {aplique.quantidade}
                </span>
              </p>
            </div>
          </div>
        ))}
        </div> 
      </div> */}

      <div className={display}> 
        <ListeApliques />  
      </div>

      <div className="divBtnBack">
        <button onClick={backPage} className="btnBack">
          Voltar
        </button>
      </div>
    </div>
  );
};

