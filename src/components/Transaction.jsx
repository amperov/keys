import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { useParams } from 'react-router-dom'
import TextArea from "antd/es/input/TextArea";


function Transaction() {
    const [ transaction, setTransaction ] = useState({})
    const [ isChangingKey, setIsChangingKey ] = useState(false)
    const [ newKey, setNewKey ] = useState('')

    const { id } = useParams()

    useEffect(() => {
        Api.get('/seller/history/' + id).then(r => setTransaction(r.data.transaction))
    }, [])
    console.log(transaction)
    const handleChangeKey = () => {
        Api.patch('/seller/history/' + id, {content_key: newKey}).then(r => window.location.reload())
    }

    return (
        <>
            <Card
                title={<b>Транзакция</b>}
                extra={<Button onClick={() => window.history.back()}>Назад</Button>}>
                <Card
                    title="Продукты">
                    { transaction ? <Card extra={`Дата: ${transaction.date_check}`}
                                          style={{ marginBottom: 20 }}
                                          title={`${transaction.category_name} - ${transaction.subcategory_name}`}>

                        Ключ: { isChangingKey ? <> Ключ:
                            <TextArea onClick={(e) => setNewKey(transaction.content_key)} value={newKey} onChange={e => setNewKey(e.target.value)} style={{ marginBottom: 10, width: 500 }} placeholder={transaction.content_key} />
                            <Button danger onClick={() => setIsChangingKey(false)} style={{ marginLeft: 10 }} type="primary">Отмена</Button></>  : transaction.content_key}

                            <Button onClick={() => isChangingKey ? handleChangeKey() : setIsChangingKey(true)} style={{ marginLeft: 10, marginRight: 10 }} type="primary">
                                Изменить ключ
                            </Button>
                        <p>Сумма: {transaction.amount} рублей </p>
                    </Card> : <></> }
                </Card>
            </Card>
        </>
    )
}

export default Transaction
