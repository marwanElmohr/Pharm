import React from "react";
import Sidebar from "./SidebarHome";
import Footer from "../Components/Footer";
import { useLocation } from 'react-router-dom';

export default function MedicineCategory() {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const category = query.get('category');
    const subcategory = query.get('subcategory');

    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <Footer />
        </div>
    );
}