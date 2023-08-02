import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Api } from '../../Api/Api';

export const LencolPECasal = () => {
    const type = localStorage.getItem("user");
    const navigate = useNavigate();
  
    const [lencolAplique, setLencolAplique] = useState([]);
   
    const loadData = async () => {
      const response = await Api.buildApiGetRequest(Api.readAllLencolUrl());
      const results = await response.json();
          
      setLencolAplique(results);
    };
      useEffect(() => {
          loadData();
      }, []);
  
      function compare(a, b) {
        if (a.number < b.number) return -1;
        if (a.number > b.number) return 1;
        return 0;
      }
  
      lencolAplique.sort(compare)
  
    return (
      <div>
        <h1>Casal</h1>
          <div className='container'>
              {lencolAplique.map((lencol, index) => (
                  <div key={index} className={lencol.tamanho === "Casal" ? "col " : "display"}>
                    <div className="card border-dark mb-3">
                      <img src={lencol.img} className="card-img-top" alt="..."/>
                      <div className="card-body text-warning">
                        <h5 className="card-title text-center">{lencol.number} </h5>
                        <div className="d-flex justify-content-between">
                          <p>Estoque: {lencol.quantidade}</p>
                          {type === "adm" ? (
                            <button onClick={()=>{navigate(`/lencol-edit/${lencol._id}`)}} type="button" className="btn btn-outline-warning">Editar</button>
                          ): ""}
                        </div>
                        <span>{lencol.tamanho}</span>
                        <span> - {lencol.cor}</span>
                      </div>
                    </div>
                </div>   
              ))}
          </div>
      </div>
    )
}
