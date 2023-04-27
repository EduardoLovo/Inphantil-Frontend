import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Calculadora.css";
import "../../Style/style.css"

export const Calculadora = () => {
  const navigate = useNavigate();
  const [resultado, setResultado] = useState("");
  const [valorEntrada, setValorEntrada] = useState("");
  const [valorTotal, setValorTotal] = useState("");

  const calcular = (event) => {
    event.preventDefault();
    const ve = event.target.ve.value;
    const vt = event.target.vt.value;

    const ve6 = ve * (6 / 100);
    const result = vt - ve - ve6;

    setResultado(result.toFixed(2).replace(".", ","));
    setValorEntrada(ve.replace(".", ","));
    setValorTotal(vt.replace(".", ","));
  };

  return (
    <div className="container text-center">

      <div className="">
        <h1>Calculadora Á Vista / Prazo</h1>
      </div>

      <div class="row align-items-start">
        <div className="row col">
          <form onSubmit={calcular} class="col"> 
            <div class="mb-3">
              <label for="exampleInputNumber1" class="form-label">Valor da entrada</label>
              <input 
                type="number" 
                class="form-control" 
                id="ve" 
                step="0.01" 
                min="0.01"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputNumber1" class="form-label">Valor total (sem o valor do frete)</label>
              <input 
                type="number" 
                class="form-control" 
                id="vt" 
                step="0.01" 
                min="0.01"
              />
            </div>
            
            <input class="btn btn-primary" type="submit" value="Calcular"></input>
          </form>
          
          <div className="resultsCal col">
            <div>
              <h3>Resultado:</h3>
            </div>
            {!resultado ? (
              ""
            ) : (
              <div>
                <p>
                  O valor da entrada é: R${" "}
                  <span>
                    {valorEntrada.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                  </span>
                </p>
                <p>
                  O valor total é: R${" "}
                  <span>
                    {valorTotal.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                  </span>
                </p>
                <p>
                  O valor que ficará para o cliente pagar a prazo é: R${" "}
                  <span className="numberResult">
                    {resultado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>   

      <div className="divBtnBack">
        <button onClick={() => navigate('/home')} className="btnBack">
            Voltar
        </button>
      </div>  

    </div>
  );
};
