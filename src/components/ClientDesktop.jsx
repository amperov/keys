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
                                alert(`${item1} Copied`)
                            }}>Copy</Button>


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
                title={<p style={{ color: 'white' }}>Purchase ID: {product.keys ? product.keys[0].unique_inv: 0}</p>}

                extra={ <Button><a href='https://oplata.info/info/'>Leave a review</a></Button> }>

                        <Card style={{ width: '100%', backgroundColor: '#8facb9', boxSizing: "content-box", height: "100%" }}>


                                    <Row>
                                        { product.keys ? product.keys.map(i => <>
                                            <Col span={12} >
                                                <p style={{fontSize:20, color: "white"}}>Unique Code: {i.unique_code}</p>
                                                <p style={{fontSize:16, color: "white"}}>Category: {i.category_name}  </p>
                                                <p style={{fontSize:16, color: "white"}}>Subcategory: {i.subcategory_name}</p>
                                                <p style={{fontSize:16, color: "white"}}>Count: {i.count}</p>
                                                <p style={{fontSize:16, color: "white"}}>Email: {i.client_email}</p>
                                                <p style={{ fontSize: 16, color: "white" }}>{`Date Check: ${i.date_check}`} </p>
                                            </Col>

                                            <Col span={12} style={{marginTop:10, border: "2px dashed", display:"block", borderRadius: "12px", padding: 10}}>
                                                <p style={{fontSize: 16, margin: "auto", color: "white"}} > Keys: <br/>{setLinks()} </p>
                                            </Col>

                                        </>) : <></> }
                                    </Row>
                    </Card>
            </Card>
        </div>)
                    }

export default ClientDesktop