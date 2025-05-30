import loginImg from '../icons/login.png'
import Securo from '../images/securoServ.png'

const Header =()=>{
return(
<div>
    <div className="divLogin">   
     <a href=""><img src={loginImg} alt="login"className='login' /></a>
    </div>
    <div className="securo">
        <img src={Securo} alt="" />
    </div>

</div>
)
}
export default Header