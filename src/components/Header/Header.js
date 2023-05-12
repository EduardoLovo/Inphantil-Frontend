import React from "react";
import "./Header.css";
import logo from '../../images/logo.jfif'
import { useNavigate } from "react-router-dom";
import { GiRolledCloth } from "react-icons/gi";
import { BsCalculatorFill } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import { BiTask } from "react-icons/bi";

export const Header = () => {

  const navigate = useNavigate()

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary ">
      <div class="container-fluid ">

        <div class="d-flex align-items-center centralize">
          <img className="logoHeader" src={logo} alt='logo' />
          <p class="navbar-brand cursor" onClick={() => navigate('./home')}>INPHANTIL</p>
        </div>

       
        <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div class="navbar-nav centralize">
            <p class="nav-link cursor"  onClick={() => navigate('./calculadora')}><BsCalculatorFill /></p>
            <p class="nav-link cursor"  onClick={() => navigate('./apliques')}><GiRolledCloth/> </p>
            <p class="nav-link cursor"  onClick={() => navigate('./infoProdutos')}><FaInfoCircle/> </p>
            <p class="nav-link cursor"  onClick={() => navigate('./apliqueslist')}><GiWhiteBook/> </p>
            <p class="nav-link cursor"  onClick={() => navigate('./tarefas')}><BiTask/> </p>
          </div>
        </div>

      </div>
    </nav>
  );
};
