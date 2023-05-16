class ApiResponse {
    data;
    meta;
    constructor(data, meta) {
        this.data = data;
        this.meta = meta;
    }
    send(res) {
        if (this.meta) {
            res.json({
                data: this.data,
                meta: this.meta,
            });
        } else {
            res.json({ data: this.data });
        }
    }
}

class Pagination {
    perPage; //
    currentPage;
    totalPages;
    total;
    constructor(perPage, currentPage, totalPages, total) {
        this.currentPage = currentPage;
        this.perPage = perPage;
        this.totalPages = totalPages;
        this.total = total;
    }
}

module.exports = {
    ApiResponse,
    Pagination,
};