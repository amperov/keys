import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Card, Col, Row, Button, Input, Popconfirm, Radio, Checkbox} from 'antd'
import { Api } from '../api/api'
import { CheckOutlined } from '@ant-design/icons'



function Product() {
    const [ subtypes, setSubtypes ] = useState([])
    const [ isAdding, setIsAdding ] = useState(false)
    function SetDefaultNameRU(d){
        return setNameRu(d)

    }
    const [ nameRu, setNameRu ] = useState('')
    const [ nameEng, setNameEng ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ digiid, setDigiid ] = useState('')
    const [ isComposite, setIsComposite ] = useState(false)
    const [ partialValues, setPartialValues ] = useState('')
    const [ subtypeValue, setSubtypeValue ] = useState('')
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
        Api.post('/seller/category/' + id, {
            title_eng: nameEng,
            title_ru: nameRu,
            subitem_id: parseInt(digiid),
            partial_values: partialValues,
            subtype_value: parseInt(subtypeValue),
            is_composite: isComposite}).then(r => console.log(r.data))
        setNameRu('')
        setNameEng('')
        setDigiid('')
        setPartialValues('')
        setSubtypeValue('')
        setIsComposite(false)
        setTimeout(n => window.location.reload(), 1000)
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
                        <Link to="/"><Button>Go back</Button></Link>
                    </Col> 
                </Row>

                {/*Появляется при добавлении*/}
                { isAdding ?
                    <>
                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                {/*<Input style={{ marginBottom: 10 }} value={nameRu} onChange={e => setNameRu(e.target.value)}  placeholder="Введите наименование на русском" />*/}
                                <Input style={{ marginBottom: 10 }} value={nameEng} onChange={e => setNameEng(e.target.value)}  placeholder="Insert Title on english" />
                                <Input style={{marginBottom: 10}} value={digiid} onChange={e => setDigiid(e.target.value)}  placeholder="Insert ID for Precheck" />
                                <Input style={{ marginBottom: 10 }} value={subtypeValue} onChange={e => setSubtypeValue(e.target.value)}  placeholder="Insert Cost of Nominal" />
                                {
                                    isComposite ?
                                        <div>
                                            <Input style={{ marginBottom: 10 }} value={partialValues} onChange={e => setPartialValues(e.target.value)}  placeholder={"Insert partial values"} />

                                            <Radio checked={true} value={isComposite} onClick={() => setIsComposite(false)}>Is Composite</Radio>
                                        </div>
                                            : <Checkbox  value={isComposite} onClick={() => setIsComposite(!isComposite)}>Is Composite</Checkbox>
                                }

                                <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleAddSubtype} type="primary">Add Nominal</Button>
                                <Button type="primary" danger onClick={handleStopAdding}>Cancel</Button>
                                
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
                            <Button type="primary" block onClick={handleStartAdding}>Add</Button>
                        </Col>
                        <Col span={8}>
                        </Col> 
                    </Row>
                    }

                { subtypes ? subtypes.map(i => {
                    console.log(i)
                    return (

                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={4}>
                            </Col>
                            <Col span={16}>
                                <Card
                                    style={{ width: '100%' }}
                                    title={`Subcategory: ${i.title_ru}`}
                                    extra={
                                        <>
                                            {/*Кнопки*/}
                                            { (isChangingName[1] & (isChangingName[0] === i.id)) ? 
                                                <Button onClick={() => {
                                                    setIsChangingName(false)
                                                }} danger style={{ marginRight: 10 }}>Cancel</Button>
                                            :
                                                <Button onClick={() => {
                                                    setIsChangingName([i.id, true])
                                                }} danger style={{ marginRight: 10 }}>Update</Button>
                                            }

                                                <Popconfirm
                                                    title="Delete"
                                                    onConfirm={() => confirm(i.id)}
                                                    onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No">
                                                    <Button danger style={{ marginRight: 10 }}>
                                                        Delete
                                                    </Button>
                                                </Popconfirm>
                                                {!i.is_composite ?<Link to={`/${id}/keys/${i.id}`}>Перейти</Link>:<></>}

                                        </>}>
                                    <Row>
                                        <Col span={12}>
                                            {/*<p style={{marginTop:0}}>Название (RU): {isChangingName[1] & isChangingName[0] === i.id ?
                                                <Input  placeholder={i.title_ru} onClick={(e) => setNewNameRU(i.title_ru)} onChange={(e) => setNewNameRU(e.target.value)} value={newNameRU}
                                                       style={{ width: 150, margin:0, marginLeft: 60  }} /> : i.title_ru}
                                            </p>*/}
                                            <p style={{marginTop:0}}>Title (EN): {isChangingName[1] & isChangingName[0] === i.id ?
                                                <Input onClick={(e) => setNewNameEn(i.title_eng)} placeholder={i.title_eng} onChange={(e) => setNewNameEn(e.target.value)} value={newNameEn} style={{ width: 150, margin: 0, marginLeft: 60 }} /> : i.title_eng}
                                            </p>
                                            <p style={{marginTop:0}}>ID for precheck: {isChangingName[1] & isChangingName[0] === i.id ?
                                                <Input  onClick={(e) => setNewSubitemId(i.subitem_id)} placeholder={i.subitem_id} onChange={(e) => setNewSubitemId(e.target.value)} value={newSubitemId} style={{ width: 150 }} /> : i.subitem_id}
                                            </p>
                                            <div id={"1"}>
                                                <p style={{marginTop:0}}>Partial Nominals: {isChangingName[1] & isChangingName[0] === i.id ?
                                                    <Input onClick={(e) => setPartialValues(i.partial_values)} placeholder={i.subitem_id} onChange={(e) => setPartialValues(e.target.value)} value={partialValues} style={{ width: 150, marginLeft: 15 }} /> :
                                                    `${i.partial_values === "" ? "None" : i.partial_values}`}
                                                </p>
                                                <p style={{marginTop:0}}>Cost of nominal: {isChangingName[1] & isChangingName[0] === i.id ?
                                                    <Input onClick={(e) => setSubtypeValue(i.subtype_value)} onChange={(e) => setSubtypeValue(e.target.value)} value={subtypeValue} style={{ width: 150, marginLeft: 25 }} /> : i.subtype_value}
                                                </p>
                                            </div>
                                            <p style={{marginTop:0}}>Is composite: {isChangingName[1] & isChangingName[0] === i.id ?
                                                <Checkbox onClick={() => {setIsComposite(!isComposite);}} value={isComposite} checked={isComposite} style={{ width: 150, marginLeft: 30 }} /> : `${i.is_composite}`}
                                            </p>




                                        </Col>
                                        <Col span={4}>
                                            {(isChangingName[1] & (isChangingName[0] === i.id)) ?
                                                <Button type={"primary"} onClick={() => {
                                                    Api.patch(`seller/category/${id}/subcategory/${i.id}`, { title_ru: newNameRU,title_eng: newNameEn,
                                                        subitem_id: parseInt(newSubitemId),
                                                        partial_values: partialValues,
                                                        subtype_value: parseInt(subtypeValue),
                                                        is_composite: isComposite}).then(r => console.log(r.data))
                                                    setIsChangingName([0, false])
                                                        //setTimeout(n => window.location.reload(), 5000)
                                                }} >Обновить </Button> : ``}
                                        </Col>
                                        <Col span={4}>
                                            {!i.is_composite ?
                                                <b>Keys: {i.count_products}</b>
                                                : <></>
                                            }
                                            <p>{`Created at: ${i.created_at.split('.')[0]}`}</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={4}>

                            </Col> 
                        </Row>
                    )


                }) : <></> }
        </>)
}

export default Product
