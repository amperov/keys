import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { Link } from 'react-router-dom'


function History() {
    const [ history, setHistory ] = useState({})

    useEffect(() => {
        Api.get('/seller/history').then(r => setHistory(r.data))
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
                            <Col style={{fontSize: 16}}> Подкатегория: {i.subcategory_name}</Col>
                            <Col style={{fontSize: 16}}> Уникальный код: {i.unique_code}</Col>
                            <Col style={{fontSize: 16}}> Ключ: {i.content_key.split('\n').map(k => <div style={{marginLeft: 25}}>{k}</div>)}</Col>
                            <Col style={{fontSize: 16}}> Цена: {i.amount}₽ </Col>
                            <Col style={{fontSize: 16}}> Ключ был добавлен: {i.created_at.split('.')[0]}</Col>
                            {console.log(i)}

                            <Button danger style={{marginTop: 25}}>
                                <Link to={`/history/transaction/${i.id}`}>
                                    Перейти
                                </Link>
                            </Button>


                        </Card>) : <></> }
                </Card>
            </Card>
        </>
    )
}

export default History
