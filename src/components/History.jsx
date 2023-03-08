import React, { useEffect, useState } from 'react'
import {Card, Col, Row, Button, Input, Dropdown} from 'antd'
import { Api } from '../api/api'
import { Link } from 'react-router-dom'


function History() {
    const [ history, setHistory ] = useState({})

    useEffect(() => {
        Api.get('/seller/history').then(r => setHistory(r.data))
        console.log(history)
    }, [])


    return (
        <>
            <Card
                title={<b>История</b>}
                extra={<Button onClick={() => window.history.back()}>Назад</Button>}
            >
                <Card title="Продукты">


                    { history?.transactions ? history.transactions.map(i =>

                        <Card
                            extra={`Дата покупки: ${i.date_check}`}
                            style={{ marginBottom: 10}}
                            title={`Номер заказа: ${i.unique_inv}`}>

                            <Col style={{fontSize: 16}}> Категория: {i.category_name}</Col>
                            <Row gutter={13}>
                                <Col span={8}>
                                    <p style={{fontSize: 16}}> Подкатегория: {i.subcategory_name}</p>
                                    <p style={{fontSize: 16}}> Уникальный код: {i.unique_code}</p>
                                    <p style={{fontSize: 16}}> Цена: {i.amount}₽ </p>
                                    <p style={{fontSize: 16}}> Ключ был добавлен: {i.created_at.split('.')[0]}</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{fontSize: 16,
                                        display: "inline-block",boxSizing: "content-box",
                                        border: "2px solid",borderColor: "lightgreen",
                                        borderRadius: "15px", padding: "20px 30px", marginLeft: 50}}> Ключ: {i.content_key.split('\n').map(k => <div >{k}</div>)}</p>
                                </Col>
                                <Col span={8} >
                                    <Button type={"dashed"} style={{ marginLeft: 50}}>
                                        <Link to={`/history/transaction/${i.id}`}>
                                            Перейти
                                        </Link>
                                    </Button>
                                </Col>
                            </Row>

                            <Row>

                            </Row>

                        </Card>) : <></> }
                </Card>
            </Card>
        </>
    )
}

export default History
