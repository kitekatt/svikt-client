import '../styles/card.css'
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { fetchOneCard } from '../http/catalogApi.js'
import { useNavigate, useParams } from 'react-router-dom'

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const Card = ({ data }) => {
   const form = useRef();

   const sendEmail = (e) => {
      e.preventDefault();

      emailjs
         .sendForm(
            'service_8dmzj6h',
            'template_ja6d3v9',
            form.current, {
            publicKey: 'T7k3gwgwTAqCee-mz',
         })
         .then(
            () => {
               console.log('SUCCESS!');
               alert("Заказ успешно оформлен")
            },
            (error) => {
               console.log('FAILED...', error.text);
               alert("Произошла ошибка :(")
            },
         );
   };

   const { id } = useParams()
   const [card, setCard] = useState(null)

   const navigate = useNavigate()
   useEffect(() => {
      fetchOneCard(id).then(data => setCard(data))
   }, [id])
   if (!card) {
      return <Spinner animation="border" />
   }

   return (
      <div className="body-bg">
         <Container>
            <Row className="mt-3 mb-3">
               <Col lg={4}>
                  {card.image ? (
                     <Image src={process.env.REACT_APP_IMG_URL + card.image} />
                  ) : (
                     <Image width={300} height={300} src="http://via.placeholder.com/300" />
                  )}
               </Col>
               <Col lg={8}>
                  <h1 style={{textAlign: 'center'}}>{card.name}</h1>
                  <h3 style={{textAlign: 'center'}}>{card.price}руб.</h3>
                  <h4 style={{textAlign: 'center'}}>{card.description}</h4>

                  <form ref={form} onSubmit={sendEmail} className="form">
                     <label style={{marginBottom: "5px"}}>Название товара</label>
                     <input type="text" name='CardName' value={card.name} className='form__input' />
                     <label className='form__label'>Имя</label>
                     <input type="text" name="InputUserName" className='form__input' required/>
                     <label className='form__label'>Email для обратной связи с Вами</label>
                     <input type="email" name="InputUserEmail" className='form__input' required/>
                     <label className='form__label'>Комментарий к заказу</label>
                     <textarea name="InputUserMessage" className='form__input' />
                     <input type="submit" value="Оформить заказ" className='form__button' />

                     <p className='form__ps'>В ближайшее время я обязательно с Вами свяжусь для более подробного
                        уточнения Ваших пожеланий
                     </p>
                  </form>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default Card