import logo from '../images/logoCar/toyotalogo.png'
import carro from '../images//imgCar/toyotacar.png'
import infoCar from '../pages/infoCar'
import addCar from './CreateVehicle'

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

</div>
        <button className="btnMenu" ><a href={addCar}>Agregar carro</a></button>
</div>
</div>

)
}
export default body

