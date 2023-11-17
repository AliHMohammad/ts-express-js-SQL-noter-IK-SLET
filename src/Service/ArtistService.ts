import ArtistRepository from "../Repository/ArtistRepository.js";


interface TQueries {
    sortDir: string
    sortBy: string,
    pageNum?: string,
    pageSize?: string
}

export default class ArtistService {
    constructor() {};
    //

    public async getAllArtistsService({sortBy, sortDir, pageNum, pageSize}: TQueries) {

        const repository = new ArtistRepository();

        if (pageSize && pageNum) {
            const pageSizeInt = parseInt(pageSize);
            const pageNumInt = parseInt(pageNum);
            const offset = this.calculateOffset(pageSizeInt, pageNumInt);
            return repository.getAllArtistsPagination(sortBy, sortDir, pageSizeInt, offset)
        }

        return repository.getAllArtists(sortBy, sortDir)
    }


    private calculateOffset(pageSize: number, pageNum: number): number {
        return (pageNum - 1) * pageSize;
    }
}