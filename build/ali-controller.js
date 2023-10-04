import { connection } from "./connection.js";
async function getSingleArtist(request, response) {
    try {
        const userId = Number(request.params.userId);
        const values = [userId];
        const query = "SELECT * FROM artists WHERE id = ?";
        const [results, fields] = await connection.execute(query, values);
        if (Array.isArray(results) && results.length > 0) {
            const user = results[0];
            response.status(200).json(user);
        }
        else {
            response.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        response.status(500).json({ message: "Internal server error" });
    }
}
export { getSingleArtist };
