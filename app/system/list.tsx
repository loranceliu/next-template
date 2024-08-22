"use client"

import { Pagination, Space, Table } from "antd"
import type { PaginationProps, TableProps } from 'antd';
import { deleteUser, getUserList, updateUser } from "../lib/service/user"
import { useEffect, useState } from "react";

const List: React.FC = () => {

    const [pagination, setPagination] = useState<Page>({page: 1,pageSzie: 10,total:0,data:[]});

    const queryList = async () => {
       const res = await getUserList(pagination)
        setPagination(prev => ({
            ...prev,
            total: res.total,
            data: res.data
        }))
    }

    useEffect(()=> {
        queryList()
        /* eslint-disable */
    },[pagination.page,pagination.pageSzie])

    const paginationProps :PaginationProps= {
        current: pagination.page,
        pageSize: pagination.pageSzie,
        showTotal: () => (
            <span>总共{pagination?.total}项</span>
        ),
        onChange: page => handlePageChange(page), 
        onShowSizeChange: (_,size) => handlePageSizeChange(size),
        total: pagination?.total,
        hideOnSinglePage: false,
        showSizeChanger: true,
        locale: {
            items_per_page: "页"
        }
    };

    const handlePageChange = (num: number) => {
        setPagination(prev => ({
            ...prev,
            page: num
        }));
    }

    const handlePageSizeChange = (num: number) => {
        setPagination(prev => ({
            ...prev,
            pageSzie: num
        }));
    }

    const handleDelete = async(id: number) => {
        const res = await deleteUser(id) 

        if(res.code) {
            queryList()
        }
    }

    const handleUpdate = async(user: User) => {
        const res = await updateUser(user) 

        if(res.code) {
            queryList()
        }
    }

    const columns: TableProps<User>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record: User,index) => (
            <Space size="middle" key={`s-${index}`}>
                <a onClick={() => handleDelete(record.id)}>删除</a>
                <a onClick={() => handleUpdate(record)}>编辑</a>
            </Space>
            ),
        },
    ];


    return (
        <Table rowKey={(record) => record.id} columns={columns} pagination={paginationProps} dataSource={pagination?.data} />
    )
}

export default List