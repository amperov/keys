import React, { useEffect, useState } from 'react'
import { Card, Col,  Button } from 'antd'
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
                title={<b>Transaction</b>}
                extra={<Button onClick={() => window.history.back()}>Back</Button>}>
                <Card
                    title={`Purchase ID: ${transaction.unique_inv} || Unique Code: ${transaction.unique_code}`}>
                    { transaction ? <Card extra={`Date Check: ${transaction.date_check}`}
                                          style={{ marginBottom: 20 }}
                                          title={`${transaction.category_name} - ${transaction.subcategory_name}`}>

                               <h4 style={{marginBottom: 0}}> Key:</h4> { isChangingKey ? <>
                                    <TextArea onClick={(e) => setNewKey(transaction.content_key)} value={newKey} onChange={e => setNewKey(e.target.value)} style={{ marginBottom: 10, marginLeft:50, width: 400 }} placeholder={transaction.content_key} />
                                    <Col>

                                    </Col>
                                    <Button danger onClick={() => setIsChangingKey(false)} style={{ marginLeft: 50 }} type="primary">
                                        Cancel
                                    </Button></>  : <> { transaction.content_key}</>}

                            <Button onClick={() => isChangingKey ? handleChangeKey() : setIsChangingKey(true)} style={{ marginLeft: 110, marginRight: 10 }} type="primary">
                                Update Key
                            </Button>
                        <p>Category: {transaction.category_name}</p>
                        <p>Subcategory: {transaction.subcategory_name}</p>
                        <p>Email: {transaction.client_email}</p>
                        <p>Sum: {transaction.amount_usd} $ </p>
                    </Card> : <></> }

                </Card>
            </Card>
        </>
    )
}

export default Transaction
