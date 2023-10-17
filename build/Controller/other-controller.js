async function searchAll(request, response) {
    const q = request.query.q;
    try {
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(404).json({ error: error.message });
        }
        else {
            response.status(500).json({ error: error.message });
        }
    }
}
export { searchAll };
