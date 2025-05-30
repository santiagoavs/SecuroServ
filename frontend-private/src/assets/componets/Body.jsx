import logo from '../images/logoCar/toyotalogo.png'
import carro from '../images//imgCar/toyotacar.png'
import infoCar from '../pages/infoCar'

const body =()=>{
return(
    

    <div>   
            <div align="right" className='divFiltro'>
        <label className='btnfiltrar'>Filtrar por precio    <input type="checkbox" name="filtro" id="" className='cbfiltrar'/>  </label>
    </div>
        <div align="center"  className="menu"> <div className="divMenu">
        <button className="btnMenu">Destacado</button>
<button className="btnMenu">Coupés</button>
<button className="btnMenu">SUV's</button>
<button className="btnMenu">Picks-Ups</button>
    </div>


<div className="cardsCarros"> 
 <a href={infoCar}> 
    <div className="card" >
    <div className="conten">
        <div >
            <img src={logo} alt=""className="headerCard" />
        </div>
        <div >
            <img  src={carro} alt="" className="imgCar"/>
        </div>
        <div className="footerCard">
            <p >
                Toyota Sequoia 2025
            </p>
        </div>
    </div>
 </div>
 </a> <a href=""> 
    <div className="card" >
    <div className="conten">
        <div >
            <img src={logo} alt=""className="headerCard" />
        </div>
        <div >
            <img  src={carro} alt="" className="imgCar"/>
        </div>
        <div className="footerCard">
            <p >
                Toyota Sequoia 2025
            </p>
        </div>
    </div>
 </div>
 </a> <a href=""> 
    <div className="card" >
    <div className="conten">
        <div >
            <img src={logo} alt=""className="headerCard" />
        </div>
        <div >
            <img  src={carro} alt="" className="imgCar"/>
        </div>
        <div className="footerCard">
            <p >
                Toyota Sequoia 2025
            </p>
        </div>
    </div>
 </div>
 </a>
  <a href=""> 
    <div className="card" >
    <div className="conten">
        <div >
            <img src={logo} alt=""className="headerCard" />
        </div>
        <div >
            <img  src={carro} alt="" className="imgCar"/>
        </div>
        <div className="footerCard">
            <p >
                Toyota Sequoia 2025
            </p>
        </div>
    </div>
 </div>
 </a>
</div>
        <button className="btnMenu">Agregar carro</button>
</div></div>

)
}
export default body

