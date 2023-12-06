const sendResponse = (res, status, data, message) => {
    return res.status(status).json({ data, message });
};

module.exports = {
    sendResponse
};
