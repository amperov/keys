import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Card, Col, Row, Button, Input, Popconfirm} from 'antd'
import { Api } from '../api/api'
import { Radio } from 'antd';
const { TextArea } = Input;


function Keys() {
    const [ keys, setKeys ] = useState([])
    const [ newTitle,  setNewTitle ] = useState('')

    const [ howManyKeys, setHowManyKeys ] = useState('one')

    const [ isChangingKey, setIsChangingKey ] = useState([ 0, false ])

    const [ isAddingKeys, setIsAddingKeys ] = useState(false)

    const [ content, setContent ] = useState('')

    const { id, sid } = useParams()
    const confirm = (id, sid, pid) => {
        Api.delete(`/seller/category/${id}/subcategory/${sid}/products/${pid}`).then(() => {
            window.location.reload()
        })}

    const cancel = () => {};

    const options = [ 'one', 'many' ]
    console.log(content)
    
    useEffect(() => {
        Api.get('/seller/category/' + id + '/subcategory/' + sid).then(r => {
            setKeys(r.data.products)
        })
    }, [])


    return (
        <>
            <Row style={{marginBottom: 20}} gutter={16}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Card style={{ width: '100%' }}>
                            <p>{`Количество ключей: ${keys ? keys.length : 0}`}</p>
                            <Radio.Group options={options} value={howManyKeys} onChange={e => setHowManyKeys(e.target.value) } optionType="button" />
                        </Card>

                        {
                            isAddingKeys ? 
                                <>
                                    <TextArea value={content} onChange={e => setContent(e.target.value)} style={{ marginTop: 10, height:100 }} placeholder="Введите ключи" />
                                    <Button onClick={() => setIsAddingKeys(false)} style={{ marginRight: 10, marginTop: 10 }}>Отмена</Button>
                                    <Button  onClick={() => {
                                        console.log(content)
                                        Api.post(`/seller/category/${id}/subcategory/${sid}/${howManyKeys}`, { content: content } ).then(r => console.log(r.data))
                                        setContent('')
                                        setTimeout(n => window.location.reload(), 500)

                                    }}>Добавить</Button>
                                </>
                                
                            :

                            <Button type="primary" onClick={() => setIsAddingKeys(true)} style={{ width: '100%', marginTop: 10 }}>Добавить</Button>

                        }
                    </Col>
                    <Col span={8}>
                        <Link to={`/${id}`}><Button>Назад</Button></Link>
                    </Col> 
                </Row>

                { keys ? keys.map(i => {
                    return (
                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={10}>
                                <Card
                                    title={"Ключ"}
                                    style={{ width: '100%' }}
                                    extra={<>
                                            <Button onClick={() => setIsChangingKey([ i.id, true ])} style={{ margin: 10 }}>Обновить</Button>

                                        <Popconfirm
                                            title="Удалить"
                                            onConfirm={() => confirm(id, sid, i.id)}
                                            onCancel={cancel}
                                            okText="Да"
                                            cancelText="Нет"
                                        >
                                            <Button> Удалить</Button>
                                        </Popconfirm>

                                        </>
                                    }
                                >
                                    Ключ: { isChangingKey[1] && isChangingKey[0] === i.id ? <>
                                        <TextArea  autoSize onChange={e => setNewTitle(e.target.value) } value={newTitle} style={{ width: 200, height:100 }}  />
                                        <Button onClick={() => setIsChangingKey([0, false])}>x</Button>
                                        <Button onClick={() => {
                                            setIsChangingKey([0, false])
                                            Api.patch(`/seller/category/${id}/subcategory/${sid}/products/${i.id}`, { content: newTitle }).then(r => console.log(r.data))
                                            setNewTitle('')
                                            setTimeout(n => window.location.reload(), 500)

                                        }}>+</Button>
                                    </> : i.content_key.split('\n').map(k => <p>{k}</p>)}


                                    <p>{`Дата: ${i.created_at.split('.')[0]}`}</p>
                                </Card>
                            </Col>
                            <Col span={8}>
                            </Col> 
                        </Row>
                    )


                }) : <></> }
        </>
    )
}

export default Keys
