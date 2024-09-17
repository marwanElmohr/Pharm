import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTablets } from "@fortawesome/free-solid-svg-icons";
import * as RiIcons from 'react-icons/ri';
import axios from 'axios';

const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3001/getType', {
            params: { Type: 'Category' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

const fetchSubcategories = async (categoryName) => {
    try {
        const response = await axios.get('http://localhost:3001/getName', {
            params: { Name: categoryName },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        throw error;
    }
};

export const getSidebarData = async () => {
    try {
        const categories = await fetchCategories();

        const sidebarData = await Promise.all(categories.map(async (category) => {
            const response = await fetchSubcategories(category.Name);
            const subcategories = response.Subcategories || [];

            const subNav = subcategories.length > 0 ? [
                {
                    title: "All Items",
                    path: `/MedicineCategory?category=${encodeURIComponent(category.Name)}`,
                    icon: <FontAwesomeIcon icon={faTablets} size='2xs' style={{ color: "#0284C7" }} />,
                },
                ...subcategories.map((sub) => ({
                    title: sub,
                    path: `/MedicineCategory?category=${encodeURIComponent(category.Name)}&subcategory=${encodeURIComponent(sub)}`,
                    icon: <FontAwesomeIcon icon={faTablets} size='2xs' style={{ color: "#0284C7" }} />,
                }))
            ] : undefined;

            const iconClosed = subcategories.length > 0 ? <RiIcons.RiArrowDownSFill /> : undefined;
            const iconOpened = subcategories.length > 0 ? <RiIcons.RiArrowUpSFill /> : undefined;

            return {
                title: category.Name,
                path: `/MedicineCategory?category=${encodeURIComponent(category.Name)}`,
                iconClosed,
                iconOpened,
                subNav,
            };
        }));

        return sidebarData;
    } catch (error) {
        console.error('Error getting sidebar data:', error);
        return [];
    }
};