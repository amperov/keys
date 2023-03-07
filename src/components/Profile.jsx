import {Card, Button, Row, Col, Input} from 'antd'
import React, { useEffect, useState } from 'react'

import { Api } from '../api/api'

function Profile() {
    const [ profile, setProfile ] = useState({})

    const [ sellerid, setSellerid ] = useState('')
    const [ sellerkey, setSellerkey ] = useState('')
    const [ isChangingSettings, setIsChangingSettings ] = useState(false)
    const handleStartChangingSettings = () => {
        setIsChangingSettings(true)
    }

    const handleStopChangingSettings = () => {
        setIsChangingSettings(false)
    }

    const handleAddSeller = () => {
        handleStopChangingSettings()

        Api.patch('/seller/update', { seller_id: parseInt(sellerid), seller_key: sellerkey }).then(r => console.log(r.data))
        setTimeout(n => window.location.reload(), 500)
    }
    useEffect(() => {

        Api.get('/seller/info').then(r => setProfile(r.data))

    }, [])

    return (
        <>
            <Card 
                extra={<Button onClick={() => window.history.back()}>Назад</Button>}
                title="Профиль">
                <p>Имя пользователя: {profile.username}</p>
                <p>Seller ID: {profile.seller_id}</p>
                <p>Seller Key: {profile.seller_key}</p>
                {isChangingSettings != true ?  <Button onClick={handleStartChangingSettings}>Обновить настройки</Button> : <> </>}
            </Card>
            { isChangingSettings ?
                <Card>
                    <Row>
                        <Col span={10}>
                            <p style={{ marginTop: 5}}>SellerID: <Input onChange={(e) => setSellerid(e.target.value)} value={sellerid} style={{ marginTop: 0, width: 200 , marginLeft: 10}} /></p>

                            <p style={{ marginTop: 5 }}>SellerKey: <Input onChange={(e) => setSellerkey(e.target.value)} value={sellerkey} style={{ marginTop: 0, width: 200 }} /></p>

                        </Col>
                        { isChangingSettings ?

                            <Col span={5} style={{marginTop: 5}}>
                                <Row style={{display: "flex", justifyContent: "center"}}>
                                    <Button onClick={handleStopChangingSettings} style={{ marginRight: 10}} type="primary">Отмена</Button>
                                    <Button style={{marginRight: 10}} onClick={handleAddSeller} type="primary">Обновить</Button>
                                </Row>
                            </Col> : <></> }
                    </Row>
                </Card>
                 : ``}

        </>
    )
}

export default Profile
