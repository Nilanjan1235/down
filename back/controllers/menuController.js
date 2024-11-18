import menuModel from '../models/menuModel.js'
import fs from 'fs'


const addMenu = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const menu = new menuModel({
        
        userId: req.body.userId,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        category_1: req.body.category_1,
        category_2: req.body.category_2,
        category_3: req.body.category_3,
        image: image_filename,
        contact: req.body.contact,
        status: req.body.status

    })
    try {

        await menu.save();
        res.json({ success: true, message: "Menu Added" })
    }
    catch (error) {

        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

const listMenu = async (req, res) => {

    try {
        const menus = await menuModel.find({});
        res.json({ success: true, data: menus })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }


}
const removeMenu = async (req, res) => {

    try {
        const menu = await menuModel.findById(req.body.id);
        fs.unlink(`uploads/${menu.image}`, () => { })

        await menuModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Menu Removed" })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Error" })


    }
}
const showDetails = async (req, res) => {

    const menuId = req.params.id;


    try {

        const menuItem = await menuModel.findById(menuId);
        // MongoDB query to find item by ID

        if (!menuItem) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }

        res.json({ success: true, data: menuItem });
    } catch (err) {
        console.error('Error fetching menu item:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }

}
const approveItems = async (req, res) => {

    try {
        await menuModel.findByIdAndUpdate({ _id: req.body.id },                   // Find the menu item by its _id
            { $set: { status: "approved" } });
        res.json({ success: true, message: "Approved" })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Error" })


    }
}
const rejectItems = async (req, res) => {

    try {
        await menuModel.findByIdAndUpdate({ _id: req.body.id },                   // Find the menu item by its _id
            { $set: { status: "rejected" } });
        res.json({ success: true, message: "Rejected" })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Error" })


    }
}
const getUserMenus = async (req, res) => {
    const { userId } = req;
      // Assume userId is provided in the request body

    try {
        // Query the database for all menus with the same userId
        const menus = await menuModel.find({ userId: userId });

        // Check if menus are found
        if (menus.length === 0) {
            return res.status(404).json({ success: false, message: 'No menus found for this user.' });
        }
        res.json({ success: true, data: menus });
    } catch (error) {
        console.error('Error fucking menus:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};







export { addMenu, listMenu, removeMenu, approveItems ,showDetails, rejectItems,getUserMenus}