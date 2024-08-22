"use client"
import { useCallback, useEffect, useState } from "react";
import SvgIcon from "../../../SvgIcon/SvgIcon";
import styles from './Menu.module.scss';
import { usePathname } from "next/navigation";
import Link from "next/link";

interface MenuProps {
    item: MenuItem
}

const Menu :React.FC<MenuProps>= ({ item }) => {

    const pathname = usePathname();
    
    const [expand, setExpand] = useState(false);

    const findMenuItemByUrl = useCallback((menus :MenuItem[], targetUrl: string) => {
        for (let i = 0; i < menus.length; i++) {
            const menuItem = menus[i];
            if (menuItem.url === targetUrl) {
                return true;
            }
            if (menuItem.children && findMenuItemByUrl(menuItem.children, targetUrl)) {
                return true;
            }
        }
        return false;
    },[])

    useEffect(()=>{
        setExpand(findMenuItemByUrl([item],pathname))
    },[findMenuItemByUrl,item,pathname])


    const handleExpand = () => {
        setExpand(prevExpand => !prevExpand);
    };

    return (
        <>
            {item.children && item.children.length > 0 ? (
                <>
                    <div 
                        className={`${styles.menu} ${expand ? styles.parent : ''}`}
                        onClick={handleExpand}    
                    >
                        <Link href="#" onClick={(e) => {e.preventDefault()}}>{item.name}</Link>
                        <SvgIcon className={styles.arrow} name={expand ? 'icon-arrow-up' : 'icon-arrow-down'} />
                    </div>
                    {expand && (
                        <>
                            {item.children.map((child, childIndex) => (
                                <div key={childIndex} className={`${styles.menu} ${styles.child}`}>
                                    <Link className={`${pathname === child.url ? styles.active : ''}`} href={child.url} >{child.name}</Link>
                                </div>
                            ))}
                        </>
                    )}
                </>
            ) : (
                <div className={styles.menu}>
                    <Link className={`${pathname === item.url ? styles.active : ''}`} href={item.url} >{item.name}</Link>
                </div>
            )}
        </>
    );
};

export default Menu