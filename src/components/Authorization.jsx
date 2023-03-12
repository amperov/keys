import React, { useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Api } from '../api/api'


function Authorization() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = () => {
        Api.post('/auth/sign-in', { username: login, password }).then(r => {
            if (r.data.JWT) {
                console.log(r.data)
                localStorage.setItem('jwt', r.data.JWT)
                navigate('/')
                window.location.reload();
            }
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
                        title={'Вход'}
                        extra={<Link to={`/signup`}>Sign up</Link>}
                    >
                            <Input value={login} onChange={e => setLogin(e.target.value)} style={{ marginBottom: 10 }} placeholder='login' />
                            <Input.Password value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />

                            <Button onClick={() => handleLogin()} style={{ marginTop: 10, marginLeft: '43%' }} type='primary'>Log in</Button>
                    </Card>
                </Col>
                <Col span={8}>
                </Col> 
            </Row>
        </>
    )
}

export default Authorization;
