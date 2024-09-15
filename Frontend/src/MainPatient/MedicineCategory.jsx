import React from "react";
import Sidebar from "./SidebarHome";
import Footer from "../Components/Footer";

export default function Patient() {
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <Footer />
        </div>
    );
}