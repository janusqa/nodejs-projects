import { people } from '../data.js';

export const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
};

export const createPerson = (req, res) => {
    const { name } = req.body;
    if (name.trim()) {
        return res.status(201).json({ success: true, person: name });
    }
    res.status(401).json({ success: false, msg: 'Please provide a name' });
};
