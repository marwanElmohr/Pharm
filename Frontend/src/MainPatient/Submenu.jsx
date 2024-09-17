import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
    display: flex;
    color: #000;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        border-left: 4px solid #0284C7;
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        background: #ced4da;
        border-left: 4px solid #0284C7;
        cursor: pointer;
    }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = (e) => {
        if (item.subNav) {
            e.preventDefault();
            setSubnav((prev) => !prev);
        }
    };

    return (
        <>
            <SidebarLink to={item.path} onClick={showSubnav} aria-expanded={subnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null}
                </div>
            </SidebarLink>
            {subnav &&
                item.subNav.map((subItem, index) => (
                    <DropdownLink to={subItem.path} key={index}>
                        {subItem.icon}
                        <SidebarLabel>{subItem.title}</SidebarLabel>
                    </DropdownLink>
                ))}
        </>
    );
};

export default SubMenu;