import ArtistRepository from "../Repository/ArtistRepository.js";
export default class ArtistService {
    constructor() { }
    ;
    async getAllArtistsService({ sortBy, sortDir, pageNum, pageSize }) {
        const repository = new ArtistRepository();
        if (pageSize && pageNum) {
            const pageSizeInt = parseInt(pageSize);
            const pageNumInt = parseInt(pageNum);
            const offset = this.calculateOffset(pageSizeInt, pageNumInt);
            return repository.getAllArtistsPagination(sortBy, sortDir, pageSizeInt, offset);
        }
        return repository.getAllArtists(sortBy, sortDir);
    }
    calculateOffset(pageSize, pageNum) {
        return (pageNum - 1) * pageSize;
    }
}
