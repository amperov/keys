import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams} from 'react-router-dom'
import {Button, Card, Col, Row,} from 'antd'
import { Api } from '../api/api';



function ClientDesktop() {
    const [ searchParams ] = useSearchParams();
    const [ product, setProduct ] = useState({})

    const { username } = useParams()

    useEffect(() => {
        document.body.style.backgroundColor = '#679ED2'
        Api.get(`/client/${username}?uniquecode=${searchParams.get('uniquecode')}`).then((r) => setProduct({ keys: r.data }))
    }, [])

    setTimeout(console.log(product), 5000)



    const setLinks = () => {
        var m = product.keys[0].content_key.split("\n")

        return m.map((item, index) => {
            return item.split(' ').map(function (item1, index1) {
                if (index1 === 1) {
                    console.log(`Item ${item1}`)
                    return <div style={{display: "block"}}>

                        {item1}
                        <Button style={{marginLeft: 4}} onClick={() => {
                            navigator.clipboard.writeText(item1)
                            alert(`Код ${item1} скопирован`)
                        }}>Копировать</Button>


                        <br/></div>
                } else {
                    return <p style={{display: "inline"}}> {item1} </p>
                }
            })


        })
    }


    return (
        <div style={{  color: 'darkkhaki' }}>

            <Card
                style={{ width: '100%', backgroundColor: '#1a88ca', color: 'red' }}
                title={<p style={{ color: 'white' }}>Номер заказа: {product.keys ? product.keys[0].unique_inv: 0}</p>}>

                <Card style={{ width: '100%', backgroundColor: '#8facb9', boxSizing: "content-box", height: "100%" }}>



                        { product.keys ? product.keys.map(i => <>
                            <Col>
                            <Row style={{display: "block"}}>
                                <p style={{fontSize:16, color: "white"}}>Уникальный код: {i.unique_code}</p>
                                <p style={{fontSize:14, color: "white"}}>Продукт: {i.category_name}  </p>
                                <p style={{fontSize:14, color: "white"}}>Подтип: {i.subcategory_name}</p>
                                <p style={{fontSize:14, color: "white"}}>Количество: {i.count}</p>
                                <p style={{fontSize:14, color: "white"}}>Email: {i.client_email}</p>
                                <p style={{ fontSize: 14, color: "white" }}>{`Дата: ${i.date_check}`} </p>
                            </Row>

                            <br/>
                            <Row style={{ border: "2px dashed", display:"block", borderRadius: "12px", padding: 10}}>
                                <p style={{fontSize: 16, margin: "auto", color: "white"}} > Ключи: <br/>{setLinks()} </p>

                            </Row>
                                <Button style={{marginTop: 20}}><a href='https://oplata.info/info/'>Оставить отзыв</a></Button>
                            </Col>
                        </>) : <></> }

                </Card>
            </Card>
        </div>)
}

export default ClientDesktop
