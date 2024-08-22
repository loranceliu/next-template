import React from 'react';
import styles from './Navigator.module.scss';
import { headers } from 'next/headers';
import Menu from './menu/Menu';



const getData = async () => {
    return [
        {
            url: "/",
            name: "工作台",
            children: []
        },
        {
            url: "#",
            name: "分类管理",
            children: [
                {
                    url: "/setting",
                    name: "功能1",
                },
                {
                    url: "/setting/se2",
                    name: "功能2",
                },
                {
                    url: "/setting/se3",
                    name: "功能3",
                }
            ]
        },
        {
            url: "#",
            name: "系统管理",
            children: [
                {
                    url: "/system",
                    name: "功能1",
                },
                {
                    url: "/s2",
                    name: "功能2",
                },
                {
                    url: "/s3",
                    name: "功能3",
                }
            ]
        },
    ]
}

const Navigator :React.FC= async () => {

    const menus = await getData();

    const List = (
        <>
            {menus && menus.map((item, index) => (
                <Menu key={index} item={item as MenuItem} />
            ))}
        </>
    );
    
    return (
        <div className={styles.navi}>
            <div>
                <h1>Logo</h1>
            </div>
            <div>
                {List}
            </div>
        </div>
    )
}

export default Navigator