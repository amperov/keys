import React, { useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Api } from '../api/api'


function Signup() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [seller_id, setSeller_id] = useState('')
    const [seller_key, setSeller_key] = useState('')

    const navigate = useNavigate()

    const handleSignup = () => {
        Api.post('/auth/sign-up', { seller_id: parseInt(seller_id), seller_key, username: login, password }).then(r => {
            navigate('/signin')
            window.location.reload();
        }).catch(e => console.error(e))
    }

    return (
        <>
            <Row style={{marginBottom: 20}} gutter={16}>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: '100%' }}
                        title={'Sign up'}
                        extra={<Link to={`/`}>Sign In</Link>}
                    >
                            <Input value={login} onChange={e => setLogin(e.target.value)} style={{ marginBottom: 10 }} placeholder='Login' />
                            <Input.Password value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: 30 }} placeholder='Password' />
                            <Input value={seller_id} onChange={e => setSeller_id(e.target.value)} style={{ marginBottom: 10 }} placeholder='Seller ID' />
                            <Input value={seller_key} onChange={e => setSeller_key(e.target.value)} style={{ marginBottom: 10 }} placeholder='Seller API Key' />

                            <Button onClick={handleSignup} style={{ marginTop: 10, marginLeft: '36%' }} type='primary'>Sign up</Button>
                    </Card>
                </Col>
                <Col span={8}>
                </Col> 
            </Row>
        </>
    )
}

export default Signup
