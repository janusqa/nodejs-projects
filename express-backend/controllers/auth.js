export const login = (req, res) => {
    const { name } = req.body;
    if (name.trim()) {
        return res.status(200).send(`Welcome ${name}`);
    }
    res.status(401).send('Please provide a name.');
};
