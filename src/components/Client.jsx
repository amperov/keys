import React, { useEffect, useState } from 'react'
import {Link, useParams, useSearchParams} from 'react-router-dom'
import {Button, Card, Col, Row,} from 'antd'
import { Api } from '../api/api';



function Client() {
    const [ searchParams ] = useSearchParams();
    const [ product, setProduct ] = useState({})

    const { username } = useParams()

    useEffect(() => {
        document.body.style.backgroundColor = '#679ED2'
        Api.get(`/client/${username}?uniquecode=${searchParams.get('uniquecode')}`).then((r) => setProduct({ keys: r.data }))
    }, [])

    setTimeout(console.log(product), 1000)


    const setLinks = () => {
        var m = product.keys[0].content_key.split("\n").join("||")

        var a = m.split("||")

        return a.map((item, index) => {
            console.log(item, index)

            if ("http" === item.slice(0, 4) || ("https" === item.slice(0, 5))) {
                return <a target={"_blank"} style={{marginLeft: 5, fontSize: 16, textDecoration: 'none'}} key={index} href={item}><b>{item}</b></a>
            }

            else if (item === "/"){
                return <p></p>
            }
            return <div style={{display: "inline-block", marginLeft: 5, fontSize: 16, color: "white"}} key={index}>{item}</div>
        })}

    return (
        <div style={{  color: 'darkkhaki' }}>

            <Card
                style={{ width: '100%', backgroundColor: '#1a88ca', color: 'red' }}
                title={<p style={{ color: 'white' }}>Номер заказа: {product.keys ? product.keys[0].unique_inv: 0}</p>}

                extra={ <Button><a href='https://oplata.info/info/'>Оставить отзыв</a></Button> }>

                        <Card style={{ width: '100%', backgroundColor: '#8facb9', boxSizing: "content-box", height: "100%" }}>


                                    <Row>
                                        { product.keys ? product.keys.map(i => <>
                                            <Col span={12} >
                                                <p style={{fontSize:20, color: "white"}}>Уникальный код: {i.unique_code}</p>
                                                <p style={{fontSize:16, color: "white"}}>Продукт: {i.category_name}  </p>
                                                <p style={{fontSize:16, color: "white"}}>Подтип: {i.subcategory_name}</p>
                                                <p style={{fontSize:16, color: "white"}}>Количество: {i.count}</p>
                                                <p style={{fontSize:16, color: "white"}}>Email: {i.client_email}</p>
                                                <p style={{ fontSize: 16, color: "white" }}>{`Дата: ${i.date_check}`} </p>
                                            </Col>

                                            <Col span={12} style={{marginTop:10, border: "2px dashed", display:"block", borderRadius: "12px", padding: 10}}>
                                                <p style={{fontSize: 16, margin: "auto", color: "white"}} > Ключи: <br/>{setLinks()} </p>
                                            </Col>

                                        </>) : <></> }
                                    </Row>
                    </Card>
            </Card>
        </div>)
                    }

export default Client
