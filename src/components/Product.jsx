import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Row, Button, Input, Popconfirm } from 'antd'
import { Api } from '../api/api'
import { CheckOutlined } from '@ant-design/icons'



function Product() {
    const [ subtypes, setSubtypes ] = useState([])
    const [ isAdding, setIsAdding ] = useState(false)
    const [ nameRu, setNameRu ] = useState('')
    const [ nameEng, setNameEng ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ digiid, setDigiid ] = useState('')

    const [ isChangingName, setIsChangingName ] = useState([0, false])

    const [ newNameRU, setNewNameRU ] = useState('')
    const [ newSubitemId, setNewSubitemId ] = useState('')
    const [ newNameEn, setNewNameEn ] = useState('')


    const { id } = useParams()
    
    useEffect(() => {
        Api.get('/seller/category/' + id).then(r => {
            setTitle(r.data.title)
            setSubtypes(r.data.subcategories)
        })
    }, [])

    const handleAddSubtype = () => {
        Api.post('/seller/category/' + id, {title_eng: nameEng, title_ru: nameRu, subitem_id: parseInt(digiid)}).then(r => console.log(r.data))
        setNameRu('')
        setNameEng('')

        // window.location.reload()
    }

    const handleStartAdding = () => {
        setIsAdding(true)
    }

    const handleStopAdding = () => {
        setIsAdding(false)
    }

    const confirm = (id1) => {
        Api.delete(`/seller/category/${id}/subcategory/${id1}`)
        window.location.reload()
    }
      
    const cancel = (e) => {};

    return (
        <>
            <Row style={{marginBottom: 20}} gutter={16}>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{ width: '100%' }}
                            title={title}
                        >
                            <p>{`Количество подтипов: ${subtypes ? subtypes.length : 0}`}</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Link to="/"><Button>Назад</Button></Link>
                    </Col> 
                </Row>
                
                { isAdding ? 

                    <>
                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Input style={{ marginBottom: 10 }} value={nameRu} onChange={e => setNameRu(e.target.value)} onPressEnter={handleAddSubtype} placeholder="Введите наименование на русском" />
                                <Input style={{ marginBottom: 10 }} value={nameEng} onChange={e => setNameEng(e.target.value)} onPressEnter={handleAddSubtype} placeholder="Введите наименование на английском" />
                                <Input value={digiid} onChange={e => setDigiid(e.target.value)} onPressEnter={handleAddSubtype} placeholder="Введите DigiId" />
                                <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleAddSubtype} type="primary">Добавить</Button>
                                <Button type="primary" danger onClick={handleStopAdding}>Отмена</Button>
                                
                            </Col>
                            <Col span={8}>
                            </Col> 
                        </Row>
                    </>

                    : 
                    <Row style={{marginBottom: 20}} gutter={16}>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" block onClick={handleStartAdding}>Добавить</Button>
                        </Col>
                        <Col span={8}>
                        </Col> 
                    </Row>
                    }

                { subtypes ? subtypes.map(i => {
                    console.log(i)
                    return (

                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Card
                                    style={{ width: '100%' }}
                                    title={i.title_ru}
                                    extra={
                                        <>
                                            { (isChangingName[1] & (isChangingName[0] === i.id)) ? 
                                                <Button onClick={() => {
                                                    setIsChangingName(false)
                                                }} danger style={{ marginRight: 10 }}>Отмена</Button>
                                            :
                                                <Button onClick={() => {
                                                    setIsChangingName([i.id, true])
                                                }} danger style={{ marginRight: 10 }}>Изменить</Button>
                                            }
                                                <Popconfirm
                                                    title="Удалить"
                                                    onConfirm={() => confirm(i.id)}
                                                    onCancel={cancel}
                                                    okText="Да"
                                                    cancelText="Нет"
                                                ><Button danger style={{ marginRight: 10 }}>Удалить</Button></Popconfirm>
                                                
                                            
                                            <Link to={`/${id}/keys/${i.id}`}>Перейти</Link>

                                        </>
                                    }>
                                    {(isChangingName[1] & (isChangingName[0] === i.id)) ?
                                        <Button onClick={() => {
                                            setTimeout(Api.patch(`seller/category/${id}/subcategory/${i.id}`, { title_ru: newNameRU, subitem_id: parseInt(newSubitemId) }).then(r => console.log(r.data)), 3000)
                                            setIsChangingName([0, false])
                                            window.location.reload()
                                        }} >Обновить </Button> : ``}
                                    <p>Название (RU): {isChangingName[1] & isChangingName[0] === i.id ? <Input placeholder={i.title_ru} onChange={(e) => setNewNameRU(e.target.value)} value={newNameRU} style={{ width: 150 }} />


                                        : i.title_ru}</p>
                                    <p>Название (EN): {isChangingName[1] & isChangingName[0] === i.id ? <Input placeholder={i.title_eng} onChange={(e) => setNewNameEn(e.target.value)} value={newNameEn} style={{ width: 150 }} /> : i.title_eng}</p>
                                    <p>SubItemID: {isChangingName[1] & isChangingName[0] === i.id ? <Input placeholder={i.subitem_id} onChange={(e) => setNewSubitemId(e.target.value)} value={newSubitemId} style={{ width: 150 }} /> : i.subitem_id}</p>
                                    <b>Ключи: {i.count_products}</b>
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

export default Product
