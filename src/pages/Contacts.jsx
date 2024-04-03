import 'bootstrap';
import '../styles/cont.css';
import Email from '../image/footer-img/email.png'
import Phone from '../image/footer-img/phone.png'
import Vk from '../image/footer-img/f-vk.png'
import Ok from '../image/footer-img/f-ok.png'
import Pint from '../image/footer-img/f-pint.png'

const Contacts = () => {
   return (<>
      <div className="container">
         <div className="cont__block">
            <div className="cont__flex">
               <div className="cont__up">
                  <a href="https://vk.com/tvorch_m_svikt" target="_blank"><img src={Vk} alt="vk" /></a>
                  <a href="https://ok.ru/v.tvorch.m" target="_blank"><img src={Ok} alt="ok" /></a>
                  <a href="https://ru.pinterest.com/tvorch_m_svikt/" target="_blank"><img src={Pint} alt="pinterest" /></a>
               </div>

               <div className="cont__down">
                  <p className='cont__text'>Подписывайтесь на соц.сети, чтобы
                     быстрее узнавать о новинках
                  </p>
                  <div className="phone">
                     <p className='cont__text'>+7(920)388-73-02</p>
                  </div>
                  <div className="email">
                     <p className='cont__text'>tvorch.m.svikt@yandex.ru</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </>);
}

export default Contacts;