import footerIco from './../../image/footer-img/f-svikt.png'
import fVk from './../../image/footer-img/f-vk.png'
import fOk from './../../image/footer-img/f-ok.png'
import fPint from './../../image/footer-img/f-pint.png'
import fPhone from './../../image/footer-img/phone.png'
import fEmail from './../../image/footer-img/email.png'

import './../footer/footer.css'

const Footer = () => {
   return (<section className="footer-bg">
      <div className="container">
         <div className="footer-line"></div>
         <div className="footer-content">
            <img className='footer-ico' src={footerIco} alt="img" />

            <div className="footer-link">
               <a className='footer-shop-link' href="/contacts">контакты</a>
               <a className='footer-shop-link' href="/shop">товары</a>
            </div>
            <div className="footer-contacts">
               <div className="footer-cont-up">
                  <div className="footer-social-lincs">
                  <a href="https://vk.com/tvorch_m_svikt" target="_blank"><img src={fVk} alt="vk" /></a>
                  <a href="https://ok.ru/v.tvorch.m" target="_blank"><img src={fOk} alt="ok" /></a>
                  <a href="https://ru.pinterest.com/tvorch_m_svikt/" target="_blank"><img src={fPint} alt="pinterest" /></a>
                  </div>
                  <p>Костромская обл, г.Буй</p>
               </div>
               <div className="phone">
                  <img src={fPhone} alt="img" />
                  <p>+7(920)388-73-02</p>
               </div>
               <div className="email">
                  <img src={fEmail} alt="img" />
                  <p>tvorch.m.svikt@yandex.ru</p>
               </div>
            </div>
         </div>
         <p className="footer-end">© Творческая мастерская “SVikt” 2021</p>
      </div>

   </section>);
}

export default Footer;