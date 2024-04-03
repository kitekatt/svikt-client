import '../styles/home.css'

import image1 from './../image/categories-img/card1.jpg'
import image2 from './../image/categories-img/card2.jpg'
import image3 from './../image/categories-img/card3.jpg'
import image4 from './../image/categories-img/card4.jpg'
import svictIco from "./../image/header-img/SVikt.png"
import icon from './../image/aboutMeIco.png'

import { Link, useNavigate } from "react-router-dom"

import { motion } from 'framer-motion'
import { useState } from "react"

//анимации
const headerAnimation = {
   hidden: {
      x: -100,
      opacity: 0,
   },
   visible: custom => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 }
   }),
}
const aboutMeAnimation = {
   hidden: {
      x: -100,
      opacity: 0,
   },
   visible: custom => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.5 }
   }),
}

const Home = () => {

   // для кнопки в категориях
   const navigate = useNavigate()
   const navigateToShop = () => {
      navigate('/shop')
   }

   const [showCard1, setShowCard1] = useState(false)  /*для анимаций карточек с категориями*/
   const [showCard2, setShowCard2] = useState(false)
   const [showCard3, setShowCard3] = useState(false)
   const [showCard4, setShowCard4] = useState(false)

   return (
      <>
         {/* HEADER */}
         <motion.section className='header'
            initial="hidden"
            whileInView="visible"
         >
            <div className="headerBG">
               <div className="container">

                  <div className="header-content">
                     <motion.h2 custom={1} variants={headerAnimation}>Творческая мастерская</motion.h2>
                     <motion.img custom={2} variants={headerAnimation} className="svikt" src={svictIco} alt="" />
                     <motion.p custom={3} variants={headerAnimation} className="headerText1">Всё, что трудно сказать словами, можно написать в открытке. </motion.p>
                     <motion.p custom={4} variants={headerAnimation} className="headerText2">Подарите своим любимым, родным и близким маленький праздник.</motion.p>

                     <motion.div custom={5} variants={headerAnimation} className="header-btn-animation">
                        <Link to="/contacts" className="headerBTN"><p>обратная связь</p></Link>
                     </motion.div>
                  </div>
               </div>
            </div>
         </motion.section>

         {/* ABOUT ME */}
         <motion.section
            initial="hidden"
            whileInView="visible"
            className='body-bg'>
            <div className="container">
               <div className="about-content">

                  <motion.div custom={1} variants={aboutMeAnimation} className="aboutMe-block">
                     <div className="me-head">
                        <img src={icon} alt="ico" />
                        <div className="meHead-title">
                           <p className="title-content">Привет!</p>
                           <p className="who-am-I">Меня зовут Виктория и я помогу Вам
                              красиво оформить поздравление.</p>
                        </div>
                     </div>
                     <p className="about_me_text">В чём секрет хорошего подарка? А в том, как его преподнести.
                        По статистике самый популярный подарок в наше время - это деньги в конверте.
                        Конверт - это скучно. Предлагаю дарить купюры в специальном кармашке в открытке.
                        Индивидуальный дизайн, поздравление, адресованное конкретному человеку не оставят равнодушными никого.
                        Добавьте сюда неожиданность сюрприза. Это полный восторг!</p>
                  </motion.div>

                  <motion.div custom={2} variants={aboutMeAnimation} className="myPrice-block">
                     <p className="price_text">Открытки, приглашения, банкетные карточки, визитки,
                        грамоты, благодарственные письма, расписание уроков, выпускные альбомы, метрика,
                        календари, конверты, шоколадницы, коробки для подарков - всё это и многое другое на заказ.</p>
                     <p className="prise-title">Открытки по поводу и без - это лучший способ выразить свои чувства.</p>
                  </motion.div>
               </div>
            </div>
         </motion.section>

         {/* CATEGORIES PRICE */}
         <motion.section
            className='body-bg categories'>
            <div className="container">
               <div className="categoriesTitle-body">
                  <h3>Основные модели</h3>
               </div>
               <div className="CardsCategories">

                  <div className="top-category-block">
                     {/* first card */}
                     <motion.div className="categoriesCard-priviev"
                        style={{
                           maxWidth: "350px",
                           height: "350px",
                           borderRadius: "20px",
                           background: "#FFF0CA",
                           position: "relative",
                           marginBottom: "28px",
                           cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                           layout: {
                              duration: 1,
                              type: "spring",
                           }
                        }}
                        layout
                        onClick={() => setShowCard1(!showCard1)}>

                        <img src={image1} alt="img" />
                        <p className="title-content">Поздравительная карточка</p>
                     </motion.div>
                     {showCard1 && (
                        <motion.div className="card-content"
                           style={{
                              background: "#FFF0CA",
                              marginTop: "20px",
                              marginBottom: "20px",
                              borderRadius: "20px",
                           }}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                        >
                           <div className="card-text">
                              <p className="title-description">Карточки форматом 10х15см, А5, А4.</p>
                              <p className="title-description">Односторонняя или двусторонняя печать.</p>
                              <p className="title-description">Эта модель подходит для создания открыпок, приглашений, календарей, метрик, визитных карточек, грамот, сертификатов.</p>
                           </div>

                           <div className="cardBTN">
                              <button className="CardBtn" onClick={() => navigateToShop()}>в магазин</button>
                           </div>
                        </motion.div>
                     )}

                     {/* second card */}
                     <motion.div className="categoriesCard-priviev"
                        style={{
                           maxWidth: "350px",
                           height: "350px",
                           marginTop: "30px",
                           borderRadius: "20px",
                           background: "#FFF0CA",
                           position: "relative",
                           marginBottom: "28px",
                           cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                           layout: {
                              duration: 1,
                              type: "spring",
                           }
                        }}
                        layout
                        onClick={() => setShowCard2(!showCard2)}>

                        <img src={image2} alt="img" />
                        <p className="title-content">Простая открытка</p>
                     </motion.div>
                     {showCard2 && (
                        <motion.div className="card-content"
                           style={{
                              maxWidth: "1440px",
                              background: "#FFF0CA",
                              marginLeft: "30px",
                              borderRadius: "20px"
                           }}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                        >
                           <div className="card-text">
                              <p className="title-description">Формат 10х15см, А5, А4 со сгибом.</p>
                              <p className="title-description">Двусторонняя печать</p>
                              <p className="title-description">Для любителей классики. Подходит для создания открыток, приглашений, брошюр, блокнотов.</p>
                           </div>

                           <div className="cardBTN">
                              <button className="CardBtn" onClick={() => navigateToShop()}>в магазин</button>
                           </div>
                        </motion.div>
                     )}
                  </div>


                  <div className="bottom-category-block">
                     {/* third card */}
                     <motion.div className="categoriesCard-priviev"
                        style={{
                           maxWidth: "350px",
                           height: "350px",
                           marginTop: "30px",
                           borderRadius: "20px",
                           background: "#FFF0CA",
                           position: "relative",
                           marginBottom: "28px",
                           cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                           layout: {
                              duration: 1,
                              type: "spring",
                           }
                        }}
                        layout
                        onClick={() => setShowCard3(!showCard3)}>

                        <img src={image3} alt="img" />
                        <p className="title-content">Объёмная открытка</p>
                     </motion.div>
                     {showCard3 && (
                        <motion.div className="card-content"
                           style={{
                              maxWidth: "1440px",
                              background: "#FFF0CA",
                              marginLeft: "10px",
                              marginRight: "20px",
                              borderRadius: "20px"
                           }}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                        >
                           <div className="card-text">
                              <p className="title-description">Различный формат.</p>
                              <p className="title-description">Большое разнообразие макетов. Множество вариантов оформления.</p>
                              <p className="title-description">С такой открыткой Вы не останетесь незамеченным.</p>
                           </div>

                           <div className="cardBTN">
                              <button className="CardBtn" onClick={() => navigateToShop()}>в магазин</button>
                           </div>
                        </motion.div>
                     )}

                     {/* last card */}
                     <motion.div className="categoriesCard-priviev"
                        style={{
                           maxWidth: "350px",
                           height: "350px",
                           marginTop: "30px",
                           borderRadius: "20px",
                           background: "#FFF0CA",
                           position: "relative",
                           marginBottom: "28px",
                           cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                           layout: {
                              duration: 1,
                              type: "spring",
                           }
                        }}
                        layout
                        onClick={() => setShowCard4(!showCard4)}>

                        <img src={image4} alt="img" />
                        <p className="title-content">Подарочная коробка</p>
                     </motion.div>
                     {showCard4 && (
                        <motion.div className="card-content"
                           style={{
                              maxWidth: "1440px",
                              background: "#FFF0CA",
                              marginLeft: "30px",
                              borderRadius: "20px"
                           }}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                        >
                           <div className="card-text">
                              <p className="title-description">Различные размеры.</p>
                              <p className="title-description">Коробочки, шоколадницы, конфетницы, для подарка, для купюр.</p>
                              <p className="title-description">Обычные и раскладывающиеся.Все коробочки имеют текстовые поздравления.</p>
                           </div>

                           <div className="cardBTN">
                              <button className="CardBtn" onClick={() => navigateToShop()}>в магазин</button>
                           </div>
                        </motion.div>
                     )}
                  </div>

               </div>
            </div>
         </motion.section>

      </>
   );
}

export default Home;