import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Header from '../components/Headers/Header'
import { sendNotificationUser } from '../apollo/server'
import CustomLoader from '../components/Loader/CustomLoader'
import { validateFunc } from '../constraints/constraints'
// reactstrap components
import {
    Container,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Alert
} from 'reactstrap'

const NOTIFICATION_USER = gql`
  ${sendNotificationUser}
`

const Notifications = props => {
    const [notificationTitle, setNotificationTitle] = useState('')
    const [notificationBody, setNotificationBody] = useState('')
    const [bodyError, setBodyError] = useState(null)
    const [titleError, setTitleError] = useState(null)
    const [mainError, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [mutate, { loading, error }] = useMutation(NOTIFICATION_USER)

    const onBlur = (event, field) => {
        if (field === 'notificationTitle') {
            setTitleError(!validateFunc({ notificationTitle }, 'notificationTitle'))
        }

        if (field === 'notificationBody') {
            setBodyError(!validateFunc({ notificationBody }, 'notificationBody'))
        }
    }

    const onSubmitValidaiton = () => {
        const nTitleError = !validateFunc(
            { notificationTitle },
            'notificationTitle'
        )
        const nBodyError = !validateFunc({ notificationBody }, 'notificationBody')
        setTitleError(nTitleError)
        setBodyError(nBodyError)
        return nTitleError && nBodyError
    }

    const onDismiss = () => {
        setSuccess('')
        setError('')
    }


    if (error) {
        setError(error.message)
    }

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Notifications</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {loading ? <CustomLoader /> :
                                    <Form>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="12">
                                                    <Row>
                                                        <Col lg="6">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-title">
                                                                {'Title'}
                                                            </label>
                                                            <br />
                                                            <FormGroup
                                                                className={
                                                                    titleError === null
                                                                        ? ''
                                                                        : titleError
                                                                            ? 'has-success'
                                                                            : 'has-danger'
                                                                }>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    id="input-title"
                                                                    placeholder="e.g Hello"
                                                                    type="text"
                                                                    value={notificationTitle}
                                                                    onChange={event => {
                                                                        setNotificationTitle(event.target.value)
                                                                    }}
                                                                    onBlur={event => {
                                                                        onBlur(event, 'notificationTitle')
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="6">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-title">
                                                                {'Body'}
                                                            </label>
                                                            <br />
                                                            <FormGroup
                                                                className={
                                                                    bodyError === null
                                                                        ? ''
                                                                        : bodyError
                                                                            ? 'has-success'
                                                                            : 'has-danger'
                                                                }>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    id="input-title"
                                                                    placeholder="e.g Hello"
                                                                    type="text"
                                                                    value={notificationBody}
                                                                    onChange={event => {
                                                                        setNotificationBody(event.target.value)
                                                                    }}
                                                                    onBlur={event => {
                                                                        onBlur(event, 'notificationBody')
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row className="mt-2 justify-content-center">
                                                        <Col xs="4">
                                                            <Button
                                                                color="primary"
                                                                href="#pablo"
                                                                className="btn-block"
                                                                onClick={async e => {
                                                                    e.preventDefault()
                                                                    if (onSubmitValidaiton()) {
                                                                        mutate({
                                                                            variables: {
                                                                                notificationBody: notificationBody,
                                                                                notificationTitle: notificationTitle
                                                                            }
                                                                        })
                                                                    }
                                                                    setSuccess('')
                                                                    setError('')
                                                                }}
                                                                size="lg">
                                                                {'Send'}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg="6">
                                                            <Alert
                                                                color="success"
                                                                isOpen={!!success}
                                                                toggle={onDismiss}>
                                                                <span className="alert-inner--icon">
                                                                    <i className="ni ni-like-2" />
                                                                </span>{' '}
                                                                <span className="alert-inner--text">
                                                                    <strong>{'Success'}!</strong> {success}
                                                                </span>
                                                            </Alert>
                                                            <Alert
                                                                color="danger"
                                                                isOpen={!!mainError}
                                                                toggle={onDismiss}>
                                                                <span className="alert-inner--icon">
                                                                    <i className="ni ni-like-2" />
                                                                </span>{' '}
                                                                <span className="alert-inner--text">
                                                                    <strong>{'Danger'}!</strong>{' '}
                                                                    {mainError}
                                                                </span>
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default (Notifications)