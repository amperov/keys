import React, { useEffect, useState } from 'react'
import {Link, useParams, useSearchParams} from 'react-router-dom'
import { Button, Card, } from 'antd'
import { Api } from '../api/api';



function Client() {
    const [ searchParams ] = useSearchParams();
    const [ product, setProduct ] = useState({})

    const { username } = useParams()

    useEffect(() => {
        document.body.style.backgroundColor = '#679ED2'
        Api.get(`/client/${username}?uniquecode=${searchParams.get('uniquecode')}`).then((r) => setProduct({ keys: r.data }))
    }, [])
    console.log(product)


    const setLinks = () => {
        var m = product.keys[0].content_key.split("\n").join(" / ")

        var a = m.split(" ")

        return a.map((item, index) => {
            console.log(item, index)

            if ("http" === item.slice(0, 4) || ("https" === item.slice(0, 5))) {
                return <a target={"_blank"} style={{marginLeft: 5, fontSize: 20}} key={index} href={item}>{item}</a>
            }

            else if (item === "/"){
                return <p></p>
            }



            return <div style={{display: "inline-block", marginLeft: 5, fontSize: 20}} key={index}>{item}</div>
        })}

    return (
        <div style={{ backgroundColor: '#679ED2', color: 'white' }}>

            <Card
                style={{ width: '100%', backgroundColor: '#408AD2', color: 'white' }}
                title={<p style={{ color: 'white' }}>Номер заказа: {product.keys ? product.keys[0].unique_inv: 0}</p>}

                extra={ <Button><a href='https://oplata.info/info/'>Оставить отзыв</a></Button> }
                                    
            >
                <Card style={{ width: '100%', backgroundColor: '#04396C', color: 'white' }}>

                    { product.keys ? product.keys.map(i => <>
                        <div >
                            <h2>Уникальный код: {i.unique_code}</h2>

                            <h3>Продукт: {i.category_name}  </h3>
                            <h3>Подтип: {i.subcategory_name}</h3>
                            <p >Ключи: {setLinks()} </p>
                            <h3 style={{ fontSize: 20 }}>{`Дата: ${i.date_check}`} </h3>
                        </div>

                    </>) : <></> }
                
                </Card>
            </Card>
        </div>)
                    }

export default Client
