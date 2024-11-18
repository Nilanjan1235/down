import eventModel from '../models/eventModel.js'
import fs from 'fs'


const addEvent = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const event = new eventModel({

        userId: req.body.userId,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        category: req.body.category,
        image: image_filename,
        contact: req.body.contact,
        time: req.body.time,
        date: req.body.date,
        price: req.body.price,
        status: req.body.status

    })
    try {

        await event.save();
        res.json({ success: true, message: "Waiting for approval" })
    }
    catch (error) {

        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

const listEvent = async (req, res) => {

    try {
        const events = await eventModel.find({});
        res.json({ success: true, data: events })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }


}
const removeEvent = async (req, res) => {

    try {
        const event = await eventModel.findById(req.body.id);
        fs.unlink(`uploads/${event.image}`, () => { })

        await eventModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Event Removed" })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Error" })


    }
}
const showEvents = async (req, res) => {

    const eventId = req.params.id;


    try {

        const eventItem = await eventModel.findById(eventId);
        // MongoDB query to find item by ID

        if (!eventItem) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }

        res.json({ success: true, data: eventItem });
    } catch (err) {
        console.error('Error fetching menu item:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }

}
const approveEvents = async (req, res) => {

    try {
        await eventModel.findByIdAndUpdate({ _id: req.body.id },                   // Find the menu item by its _id
            { $set: { status: "approved" } });
        res.json({ success: true, message: "Approved" })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Error" })


    }
}
const rejectEvents = async (req, res) => {

    try {
        await eventModel.findByIdAndUpdate({ _id: req.body.id },                   // Find the menu item by its _id
            { $set: { status: "rejected" } });
        res.json({ success: true, message: "Rejected" })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "Error" })


    }
}
const markOutdatedEvents = async (req, res) => {
    try {
        // Find events with a date older than today and update their status to "outdated"
        const today = new Date();
        const events = await eventModel.updateMany(
            { date: { $lt: today } }, // Find events where the date is earlier than today
            { $set: { status: "outdated" } } // Set the status to "outdated"
        );

        if (events.modifiedCount > 0) {
            res.json({ success: true, message: `${events.modifiedCount} events marked as outdated` });
        } else {
            res.json({ success: false, message: "No outdated events found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error marking events as outdated" });
    }
};
const getUserEvents = async (req, res) => {
    const { userId } = req; 
     // Assume userId is provided in the request body

    try {
        // Query the database for all menus with the same userId
        const events = await eventModel.find({ userId: userId });

        // Check if menus are found
        if (events.length === 0) {
            return res.status(404).json({ success: false, message: 'No menus found for this user.' });
        }

        // Return the list of menus
        res.json({ success: true, data: events });
    } catch (error) {
        console.error('Error fucking events:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};





export { addEvent, listEvent, removeEvent, approveEvents ,showEvents,rejectEvents,markOutdatedEvents,getUserEvents}