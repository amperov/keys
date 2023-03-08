import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input, Popconfirm } from 'antd'
import { Api } from '../api/api'
import { Link } from 'react-router-dom'
import { SettingOutlined, UserOutlined, CloseOutlined, PlusOutlined, CheckOutlined, HistoryOutlined } from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea";

function Main() {

    const [ products, setProducts ] = useState([])
    const [ isAdding, setIsAdding ] = useState(false)

    useEffect(() => {
        Api.get('/seller/category').then(r => setProducts(r.data))
    }, [])


    const [ nameRU, setNameRU ] = useState('')
    const [ nameENG, setNameENG ] = useState('')
    const [ itemId, setItemId ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ message, setMessage ] = useState('')
    
    const [ isChangingName, setIsChangingName ] = useState([0, false])

    const [ newNameRU, setNewNameRU ] = useState('')
    const [ newNameEN, setNewNameENG ] = useState('')
    const [ newDescription, setNewDescription ] = useState('')
    const [ newMessage, setNewMessage ] = useState('')



    const handleAddProduct = () => {
        Api.post('/seller/category', {message: message, title_ru: nameRU, title_eng: nameENG, itemId: parseInt(itemId), description}, ).then(r => console.log(r.data))
        setNameRU('')
        setNameENG('')
        setItemId('')
        setDescription('')
        setTimeout(n => window.location.reload(), 500)

    }

    const handleStartAdding = () => {
        setIsAdding(true)
    }

    const handleStopAdding = () => {
        setIsAdding(false)
    }



    const confirm = (id) => {
        Api.delete(`/seller/category/${id}`).then(() => {
            window.location.reload()
    })}
      
      const cancel = (e) => {};

    return (
        <>
            <div>
                    <Row style={{marginBottom: 20}} gutter={16}>
                        <Col span={4}>
                        </Col>
                        <Col span={10}>

                            
                            { isAdding ? 
                                <>
                                    Название (RU)<Input value={nameRU} onChange={e => setNameRU(e.target.value)}  style={{ marginBottom: 10 }} placeholder="Введите наименование на русском" />
                                    Название (EN)<Input value={nameENG} onChange={e => setNameENG(e.target.value)}  style={{ marginBottom: 10 }} placeholder="Введите наименование на английском" />
                                    Описание <Input value={description} onChange={e => setDescription(e.target.value)}  style={{ marginBottom: 10 }} placeholder="Введите описание товара" />
                                    Сообщение: <TextArea value={message} onChange={e => setMessage(e.target.value)}  onPressEnter={ message + "\n"} style={{ marginBottom: 10, height: 100 }} placeholder="Введите сообщение" />
                                    {/*<Input value={itemId} onChange={e => setItemId(e.target.value)}  style={{ marginBottom: 10 }} placeholder="Введите id товара" />*/}
                                    <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleAddProduct} type="primary">Добавить</Button>
                                    <Button type="primary" danger onClick={handleStopAdding}>Отмена</Button></> : <Button type="primary" block onClick={handleStartAdding}>Добавить</Button> }

                                

                                    
                                     <></>
                        </Col>
                        <Col span={4}>
                            <Button style={{ marginRight: 10 }}><Link to="/profile"><UserOutlined /></Link></Button>
                            <Button style={{ marginLeft: 10 }}><Link to="/history">История</Link></Button>

                        </Col>


                    </Row>
                { products ? products.map(i => {
                    return (
                    <>
                    
                        <Row style={{marginBottom: 20}} gutter={8}>
                            <Col span={4}>
                            </Col>
                            <Col span={10}>
                                <Card
                                    style={{ width: '100%' }}
                                    title={"Категория"}
                                    extra={
                                        <>
                                            <Link style={{ marginRight: 20 }} to={`/${i.id}`}>Перейти</Link>
                                            { isChangingName[1] & isChangingName[0] === i.id ? <Button onClick={() => setIsChangingName([0, false])} style={{ marginRight: 10 }} danger>Отмена</Button> :
                                                <Button onClick={() => setIsChangingName([i.id, true])} style={{ marginRight: 10 }} danger>Изменить</Button>}
                                            
                                            <Popconfirm
                                                title="Удалить"
                                                onConfirm={() => confirm(i.id)}
                                                onCancel={cancel}
                                                okText="Да"
                                                cancelText="Нет"
                                            ><Button danger>Удалить</Button></Popconfirm>
                                            
                                        </>}>
                                    <p>Название (RU): {isChangingName[1] & isChangingName[0] === i.id ?
                                         <Input onClick={(e) => setNewNameRU(i.title_ru)}  value={newNameRU} onChange={(e) => setNewNameRU(e.target.value)} style={{ width: 250 }} />  : i.title_ru } </p>

                                    <p> Название (EN): {isChangingName[1] & isChangingName[0] === i.id ? <>
                                        <Input onClick={(e) => setNewNameENG(i.title_eng)} onChange={(e) => setNewNameENG(e.target.value)} value={newNameEN} style={{ width: 250  }} />
                                        </> : i.title_eng}</p>

                                    <p> Описание: {isChangingName[1] & isChangingName[0] === i.id ?
                                        <Input onClick={(e) => setNewDescription(i.description)} onChange={(e) => setNewDescription(e.target.value)} value={newDescription} style={{ width: 250 }}/> : i.description}
                                    </p>

                                    <p> Сообщение: {isChangingName[1] & isChangingName[0] === i.id ?
                                        <TextArea onClick={(e) => setNewMessage(i.message)}  onChange={(e) => setNewMessage(e.target.value)} value={newMessage} style={{ width: 250 }} /> : i.message}
                                    </p>
                                    <div>
                                        {isChangingName[1] & isChangingName[0] === i.id ? <Button onClick={() => {
                                            Api.patch(`/seller/category/${i.id}`, { title_ru: newNameRU, title_eng: newNameEN, description: newDescription, message: newMessage })
                                            window.location.reload();}}>
                                            <CheckOutlined /> Обновить
                                        </Button> : ""}

                                    </div>
                                    <p>{`Количество подтипов: ${i.count_subcategories}`}</p>
                                    <p>{`Дата: ${i.created_at.split('.')[0]}`}</p>
                                </Card>
                            </Col>
                            <Col span={8}>


                            </Col> 
                        </Row>
                    
                    </>
                    )

                }) : <></> }
                
            </div>
        </>
    )
}

export default Main
