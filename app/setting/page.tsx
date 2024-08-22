"use client"

import { useFormState } from "react-dom";
import { createUser } from "../lib/service/user"
import { Button, Form, Input} from "antd"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SettingPage: React.FC = () => {
    const router = useRouter()

    type FieldType = {
        name?: string;
        email?: string;
    };


    const initialState :Msg= {
        code: 0,
        message: "",
    }

    const [state, formAction] =  useFormState(createUser, initialState)

    useEffect(()=> {
        if(state.code) {
            router.push("/system")
        }
    /* eslint-disable */
    },[state])

    return (
        <main>
            <div>
                 <Form
                    onFinish={formAction}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <div>{state?.message}</div>
                    <Form.Item<FieldType>
                    label="姓名"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input name="name" />
                    </Form.Item>

                    <Form.Item<FieldType>
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                    <Input name="email" />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    </Form.Item>
                </Form> 
            </div>
        </main>
    )
}

export default SettingPage