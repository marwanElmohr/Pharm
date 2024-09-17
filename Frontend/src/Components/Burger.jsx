import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { getSidebarData } from "../MainPatient/SidebarData"; // Import your function
import SubMenu from "../MainPatient/Submenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #f3f4f6;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 30;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Burger = () => {
    const [sidebar, setSidebar] = useState(false);
    const [sidebarData, setSidebarData] = useState([]);

    useEffect(() => {
        const fetchSidebarData = async () => {
            const data = await getSidebarData();
            setSidebarData(data);
        };

        fetchSidebarData();
    }, []);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: "#0284C7" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                </Nav>
                <SidebarNav sidebar={sidebar ? 1 : 0} className="shadow-lg">
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {sidebarData.map((item, index) => (
                            <SubMenu item={item} key={index} />
                        ))}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Burger;