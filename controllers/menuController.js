const MenuItem = require('../models/menuItem');


const createMenuItem = async (req, res) => {
    const { name, description, price } = req.body;
    if (!name || price == null) {
        return res.status(400).json({ message: 'Name and price are required' });
    }
    try {
        const newItem = new MenuItem({ name, description, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem };