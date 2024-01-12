//in caso di errore generico, ritorna un errore 500

const genericError = (err, req, res, next) => {
    res.status(500).json({ error: err.message });
};

export default genericError;

