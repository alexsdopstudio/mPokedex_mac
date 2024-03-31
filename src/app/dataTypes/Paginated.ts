export interface Paginated {
    count: number;
    prev: null | string;
    next: null | string;
    results: Results[]
}

export interface Results {
    name: string;
    url: string;
}