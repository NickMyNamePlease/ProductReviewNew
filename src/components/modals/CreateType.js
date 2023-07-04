import React, {useState} from 'react'
import {Button, Form, Modal} from "react-bootstrap"
import {createType} from "../../http/productAPI"

const CreateType = ({show, onHide}) => {
    const [type, setType] = useState('')

    const addType = async () => {
        try {
            await createType({name: type}).then(() => {
                setType('')
                onHide()
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                >
                    Додати нивий тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={type}
                        onChange={e => setType(e.target.value)}
                        placeholder={"Введіть назву типу"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Закрити
                </Button>
                <Button
                    variant="outline-success"
                    onClick={addType}
                >
                    Додати
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;